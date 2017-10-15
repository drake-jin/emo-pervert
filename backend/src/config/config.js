const moment = require('moment-timezone')

module.exports = {
  logger: {
    timestamp: () => { return moment.tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss:SSS') },
    dirname: `${__dirname}/../../logs`,
    filename: 'log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: 'silly',
    silent: false,
    colorize: true,
    formatter(options) {
      // Return string will be passed to logger.
      return `${options.timestamp()} ${options.level.toUpperCase()} ${options.message ? options.message : ''
      }${options.meta && Object.keys(options.meta).length ? `\n\t${JSON.stringify(options.meta)}` : ''}`
    },
  },
}
