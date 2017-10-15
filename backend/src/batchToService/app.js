process.env.TZ = 'Asia/Seoul'

Object.defineProperty(global, '__stack', {
  get() {
    const orig = Error.prepareStackTrace
    Error.prepareStackTrace = (_, stack) => {
      return stack
    }
    const err = new Error()
    Error.captureStackTrace(err, arguments.callee)
    const stack = err.stack
    Error.prepareStackTrace = orig
    return stack
  },
})

Object.defineProperty(global, '__line', {
  get() {
    return __stack[1].getLineNumber()
  },
})

Object.defineProperty(global, '__function', {
  get() {
    return __stack[1].getFunctionName()
  },
})

const schduleBatch = require('./index')
const schedule = require('node-schedule')

const options = {
}

schedule.scheduleJob('* * * * *', () => {
  schduleBatch.batch(options)
})

// schduleBatch.batch(options)
