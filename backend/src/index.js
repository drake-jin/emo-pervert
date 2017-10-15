process.env.TZ = 'Asia/Seoul'

console.log(process.env.NODE_PATH)
console.log(process.env.NODE_PATH)
console.log(process.env.NODE_PATH)
console.log(process.env.NODE_PATH)
console.log(process.env.NODE_PATH)
console.log(process.env.NODE_PATH)
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

const logger = require('lib/utils/logger')

logger.setSourceFunc(__filename, __function)
logger.silly(__line, '-----------------------------------------------')
logger.silly(__line, '---------- Connection pool for lambda -----------')
logger.silly(__line, '-----------------------------------------------')
logger.silly(__line, '-----------------   Startup   -----------------')
logger.silly(__line, '-----------------------------------------------')


// 
const sqlstring = require('sqlstring')

// koa require
const Koa = require('koa')
const Router = require('koa-router')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const onerror = require('koa-onerror')
const error = require('koa-json-error')
const cors = require('kcors')

const api = require('api')

const multer = require('koa-multer')
const upload = multer({ dest: 'uploads/' })

const app = new Koa()

const router = new Router()
router.use('/api', api.routes())

const db = require('db')

app.use(cors())


app.use(koaLogger())
app.use(koaBody({
  extendTypes: {
    json: ['application/x-javascript'],
  },
  multipart: true,
  onerror: async (ctx) => {
    ctx.throw(422, 'this server only use json ["application/x-javascript"]')
  },
}))


onerror(app, {
  accepts() {
    if (this.path.endsWith('.json')) return 'json'
    return 'html'
  },
})

app.use(error((err) => {
  const response = {
    // Copy some attributes from
    // the original error
    status: err.status,
    message: err.message,
    // custom
    result: false,
    data: {},
  }
  // ctx.throw 를 통한 에러 반환.
  logger.warn(__line, response)
  return response
}))


app.use(async (ctx, next) => {
  logger.setSourceFunc(__filename, __function)
  const keyCheck = [
    '/api/pool',
//    '/api/multipart',
  ]
  if (keyCheck.filter((v) => ctx.path === v).length > 0) {
    const result = await db.query('crawlers', `SELECT count(*) as count FROM web_auth WHERE ${sqlstring.escapeId('key')} = :key`, { key: ctx.request.body.key })
    if (result[0].count > 0) {
      await next()
    } else {
      ctx.throw(403, '로그인 후 이용해 주세요')
    }
  } else {
    await next()
  }
})

router.post('/profile', upload.single('files'))
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx, next) => {
  ctx.body = {
    data: ctx.body,
    result: true,
  }
  ctx.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  }
  logger.info(__line, ctx.body)
  await next()
})


app.listen(4000, (err) => {
  if (err) logger.debug(__line, `error ${err.toString()}`)
  logger.debug(__line, 'this is koa server that\'s port is 4000')
})

process.on('exit', (code) => {
  logger.setSourceFunc(__filename, __function)
  logger.error(__line, `About to exit with code: ${code}`)
})
process.on('beforeExit', (code) => {
  logger.setSourceFunc(__filename, __function)
  logger.error(__line, `About to exit with code: ${code}`)
})
process.on('disconnect', (code) => {
  logger.setSourceFunc(__filename, __function)
  logger.error(__line, `About to exit with code: ${code}`)
})
process.on('uncaughtException', (err) => {
  logger.setSourceFunc(__filename, __function)
  logger.error(__line, `About to exit with code: ${err}`)
})
