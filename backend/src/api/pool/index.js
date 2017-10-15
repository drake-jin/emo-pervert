const Router = require('koa-router')
const db = require('db')
const logger = require('lib/utils/logger')
const empty = require('is-empty')

const poolRouter = new Router()

poolRouter.post('/', async (ctx, next) => {
  logger.setSourceFunc(__filename, __function)
  logger.info(__line, ctx.request.ip)
  logger.info(__line, ctx.request.body)
  logger.info(__line, ctx.request.headers)

  const which = empty(ctx.request.body.which) ? false : ctx.request.body.which
  const sql = empty(ctx.request.body.sql) ? false : ctx.request.body.sql
  const params = empty(ctx.request.body.params) ? false : ctx.request.body.params
  logger.debug(__line, { which, sql, params })
  if (!params || !sql || !which) {
    ctx.throw(400, 'check you parameter values in which, sql, params ')
  }
  try {
    const result = await db.query(which, sql, params)
    ctx.body = result
  } catch (e) {
    ctx.throw(500, e)
  }
  await next()
})

module.exports = poolRouter
