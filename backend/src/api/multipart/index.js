const Router = require('koa-router')
const logger = require('lib/utils/logger')

const multer = require('koa-router-multer')

const upload = multer({ dest: 'uploads/' })

const multipartRouter = new Router()
/*
multipartRouter.post('/', async (ctx, next) => {
  logger.setSourceFunc(__filename, __function)
  // ignore non-POSTs
  if (ctx.method !== 'POST') return await next()
  logger.info(__line, ctx.request)
  logger.info(__line, ctx.request.body)
  const file = ctx.request.body.files.file
  logger.info(__line, file)
  const reader = fs.createReadStream(file.path)
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))
  reader.pipe(stream)
  logger.info(__line, `uploading ${file.name} -> ${stream.path}`)
  ctx.body = 'asdasdadas'
})
*/


multipartRouter.post('/', upload.single('files'), async (ctx, next) => {
  logger.setSourceFunc(__filename, __function)
  logger.info(__line, ctx.req)
  logger.info(__line, ctx.req.body)
  // ignore non-POSTs
  if (ctx.method !== 'POST') return await next()
  const file = ctx.request.body.files.file
  logger.info(__line, file)
  const reader = fs.createReadStream(file.path)
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))
  reader.pipe(stream)
  logger.info(__line, `uploading ${file.name} -> ${stream.path}`)
  ctx.body = 'asdasdadas'
  await next()
})


module.exports = multipartRouter
