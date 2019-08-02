const log4js = require('log4js')
const path = require('path')

var date = new Date()

var year = date.getFullYear()
var month = date.getMonth() + 1
month = (month < 10 ? '0' : '') + month
var day = date.getDate()
day = (day < 10 ? '0' : '') + day
var LogDateTime = year + '-' + month + '-' + day

var loggerFunction = function (apiPath) {
  var filename = path.join(__dirname, apiPath, 'logs/log-' + LogDateTime + '.log')

  log4js.configure({
    appenders: {
      file: { type: 'file', filename: filename },
      console: { type: 'console' }
    },
    categories: {
      default: { appenders: ['file', 'console'], level: 'ALL' }
    }
  })

  const logger = log4js.getLogger('logs')
  return logger
}

module.exports = loggerFunction
