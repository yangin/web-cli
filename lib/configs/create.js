exports.CREATE_INQUIRER_LIST = [
  {
    type: 'input',
    message: '请输入项目名称',
    name: 'name'
  },
  {
    name: 'page',
    type: 'list',
    message: '请选择应用类型',
    choices: [
      {
        name: '单页面应用',
        value: 'single'
      }, {
        name: '多页面应用',
        value: 'multiple'
      }
    ]
  },
  {
    type: 'list',
    message: '请选择使用的css方案',
    name: 'css',
    choices: [
      {
        name: 'styled-components',
        value: 'styled'
      }, {
        name: 'less',
        value: 'less'
      }
    ]
  }
]

exports.CREATE_INQUIRER_PACKAGE = {
  name: 'package',
  type: 'list',
  message: '请选择包管理工具',
  choices: [
    {
      name: 'npm',
      value: 'npm'
    },
    {
      name: 'yarn',
      value: 'yarn'
    }
  ]
}

exports.CREATE_INQUIRER_ACTION = {
  name: 'action',
  type: 'list',
  message: '目标文件夹已经存在，是否覆盖并继续',
  choices: [
    {
      name: '覆盖并继续',
      value: true
    }, {
      name: '取消',
      value: false
    }
  ]
}
