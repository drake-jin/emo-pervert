const Router = require('koa-router')

const pool = require('api/pool')
const multipart = require('api/multipart')


const api = new Router()
api.use('/pool', pool.routes())
api.use('/multipart', multipart.routes())

module.exports = api
