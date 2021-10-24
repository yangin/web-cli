#!/usr/bin/env node
// 上面一句表示在node环境中执行

const program = require('commander')
const inquirer = require('inquirer')
const download = require('download-git-repo') // https://www.npmjs.com/package/download-git-repo
const packageJson = require('../package.json')
const { dir, oraStart, checkHasYarn } = require('../lib/helper')
const { checkTargetDir, downloadAddress, getTargetBranch, downloadCallback } = require('../lib/helper/create')
const { CREATE_INQUIRER_LIST, CREATE_INQUIRER_PACKAGE } = require('../lib/configs/create')
const { DEFAULT_PACKAGE } = require('../lib/constants/create')
// 主流程
program
  .version(packageJson.version)
  .description('初始化项目')
  .action(async () => {
    const hasYarn = checkHasYarn()
    hasYarn && CREATE_INQUIRER_LIST.push(CREATE_INQUIRER_PACKAGE)

    const answer = await inquirer.prompt(CREATE_INQUIRER_LIST)

    !hasYarn && (answer.package = DEFAULT_PACKAGE)

    // 目标创建目录
    const targetDir = dir(answer.name)

    const isContinue = await checkTargetDir(targetDir)
    if (!isContinue) return

    const loading = oraStart('疯狂加载中...')

    download(
      downloadAddress(getTargetBranch(answer)),
      targetDir,
      downloadCallback.bind(null, answer, loading) // callback
    )
  })

// program必须以parse为启动点
program.parse(process.argv)
