exports.WEB_CLI_NAME = 'web cli'

exports.GIT_TEMPLATE_URL = 'direct:https://codeload.github.com/yangin/web-cli-template/zip/'

exports.DEFAULT_PACKAGE = 'npm'

exports.PACKAGE_MANAGER_COMMAND = {
  npm: {
    install: 'npm install',
    run: 'npm run'
  },
  yarn: {
    install: 'yarn',
    run: 'yarn'
  }
}
