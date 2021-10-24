const fs = require('fs')
const { exec } = require('child_process');   // child_process负责执行shell
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const { dir, oraStart, oraSuccess, oraFail } = require('../helper');
const { WEB_CLI_NAME, GIT_TEMPLATE_URL, PACKAGE_MANAGER_COMMAND } = require('../constants/create');
const { CREATE_INQUIRER_ACTION } = require('../configs/create');

// 检查并处理待创建的目标项目文件夹, 返回isContinue， true 继续
exports.checkTargetDir = async (targetDir) => {
    let isContinue = true
    if (fs.existsSync(targetDir)) {
        // 询问用户是否确定要覆盖
        let { action } = await inquirer.prompt([CREATE_INQUIRER_ACTION])
        if (!action) {
          isContinue = false
        } else {
          // 移除已存在的目录
          const loading = oraStart('正在移除目标文件夹...')
          await fs.rmSync(targetDir, { recursive: true, force: true });
          oraSuccess(loading, '已移除目标文件夹')
          isContinue = true
        }
      }
      return isContinue
}

// 修改package.json 文件
const alterPackageJson = (answer) => {
    const { name } = answer
    const filename = `${name}/package.json`;
    const filePath = dir(filename)
  
    if (fs.existsSync(filePath)) {
      let newPagJson = fs.readFileSync(filePath).toString();
  
      newPagJson = JSON.parse(newPagJson);
      newPagJson = {...newPagJson, name: answer.name};
      newPagJson = JSON.stringify(newPagJson, null, '\t');
  
      fs.writeFileSync(filePath, newPagJson);
  }
  }

  // 执行shell脚本，运行 npm install 等命令
  const processShell = async (answer) => {
    const { name, package } = answer

    const loading = oraStart(`${PACKAGE_MANAGER_COMMAND[package].install} ...`)
   
    const shellCommand = `cd ${dir(name)} && ${PACKAGE_MANAGER_COMMAND[package].install}`
  
    await exec(shellCommand, (error, stdout, stderr)=> {
      if(error) {
        console.log(`\r\n${stderr}`)
        oraFail(loading, '项目初始化失败')
        consoleTips(answer, 'fail')
        return
      }
      // console.log(stdout)
      oraSuccess(loading, '已完成项目初始化')
      consoleTips(answer, 'success')
    })
  }
  
  // 执行完毕后的显示
  const consoleTips = (answer, result) => {
    const { name, package } = answer
    const npmCommand = result === 'success' ? 
    `${PACKAGE_MANAGER_COMMAND[package].run} start` 
    : `${PACKAGE_MANAGER_COMMAND[package].install}`

    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync(WEB_CLI_NAME, {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));

    // 新增说明信息
    console.log(`\r\nWe suggest that begin by typing:\r\n \r\n 
      ${chalk.cyan('cd')} ${name}\r\n 
      ${chalk.cyan(npmCommand)}\r\n 
      \r\nHappy hacking!`)
  }

  // 从git上下载项目资源成功后执行的回调
  exports.downloadCallback = async (answer, loading) => {
    oraSuccess(loading, '已获取项目模板')
    alterPackageJson(answer)
    await processShell(answer)
  }

  // 可通过 #来动态查找分支
  exports.downloadAddress = (targetBranch = 'main') => `${GIT_TEMPLATE_URL}${targetBranch}`;

// 根据 answer 获取 target 以匹配 git branch
exports.getTargetBranch = (answer) => {
    const { page, css} = answer
    return `${page}-${css}`
}
