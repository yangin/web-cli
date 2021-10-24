const path = require('path')
const { execSync } = require('child_process') // child_process负责执行shell
const ora = require('ora')

let _hasYarn

// dev环境下
// exports.dir = (targetPath) => path.join(process.cwd(), `../${targetPath}`)
// prod 环境下
exports.dir = (targetPath) => path.join(process.cwd(), `/${targetPath}`)
exports.oraStart = (value) => {
  const loading = ora('Loading unicorns')
  loading.text = value
  loading.color = 'green'
  loading.start()
  return loading
}

exports.oraSuccess = (loading, value) => {
  loading.succeed(value)
}

exports.oraFail = (loading, value) => {
  loading.fail(value)
}

exports.checkHasYarn = () => {
  if (_hasYarn != null) {
    return _hasYarn
  }
  try {
    execSync('yarn --version', { stdio: 'ignore' })
    return (_hasYarn = true)
  } catch (e) {
    return (_hasYarn = false)
  }
}
