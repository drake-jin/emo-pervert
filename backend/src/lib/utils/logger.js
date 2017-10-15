const winston = require('winston')
require('winston-daily-rotate-file')

const path = require('path')
const config = require('config/config')

const dailyRotateFile = new winston.transports.DailyRotateFile(config.logger)
const winstonConsole = new winston.transports.Console(config.logger)

const logger = new (winston.Logger)({
  transports: [
    dailyRotateFile,
    winstonConsole,
  ],
})

module.exports = (() => {
  let source
  let func

  return {
    setSourceFunc: (s, f) => {
      source = path.basename(s)
      func = f
    },
    // request and response information
    info: (l, msg, meta) => {
      logger.info({ which: 'crawler-web-backend', source, func, line: l, message: msg, meta })
    },
    // system operation 
    debug: (l, msg, meta) => {
      logger.debug({ which: 'crawler-web-backend', source, func, line: l, message: msg, meta })
    },
    // critical message in harmful event 
    error: (l, msg, meta) => {
      logger.error({ which: 'crawler-web-backend', source, func, line: l, message: msg, meta })
    },
    // logical error on REST url
    warn: (l, msg, meta) => {
      logger.warn({ which: 'crawler-web-backend', source, func, line: l, message: msg, meta })
    },
    // just using local
    silly: (l, msg, meta) => {
      logger.silly({ which: 'crawler-web-backend', source, func, line: l, message: msg, meta })
    },
  }
})()
