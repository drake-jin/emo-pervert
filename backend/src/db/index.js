// const mysql = require('promise-mysql')
const mysql = require('koa-mysql')
const mysqlInfo = require('config/mysql')
const Promise = require('bluebird')
const sqlstring = require('sqlstring')
const logger = require('lib/utils/logger')

const crawlersPool = mysql.createPool(mysqlInfo.crawlers)
const moducampusPool = mysql.createPool(mysqlInfo.moducampus)

// crawler
crawlersPool.on('acquire', (connection) => {
  logger.setSourceFunc(__filename, __function)
  logger.debug(__line, `crawlersPool Connection ${connection.threadId} acquired `)
})

crawlersPool.on('connection', (connection) => {
  logger.setSourceFunc(__filename, __function)
  logger.debug(__line, `crawlersPool Connection ${connection.threadId} is success`)
})

crawlersPool.on('enqueue', (connection) => {
  logger.setSourceFunc(__filename, __function)
  logger.debug(__line, `crawlersPool Waiting for available connection(${connection.threadId} ) slot`)
})

crawlersPool.on('release', (connection) => {
  logger.setSourceFunc(__filename, __function)
  logger.debug(__line, `crawlersPool Connection ${connection.threadId} released`)
})

// production
moducampusPool.on('acquire', (connection) => {
  logger.setSourceFunc(__filename, __function)
  logger.debug(__line, `moducampusPool Connection ${connection.threadId} acquired `)
})

moducampusPool.on('connection', (connection) => {
  logger.setSourceFunc(__filename, __function)
  logger.debug(__line, `moducampusPool Connection ${connection.threadId} is success`)
})

moducampusPool.on('enqueue', (connection) => {
  logger.setSourceFunc(__filename, __function)
  logger.debug(__line, `moducampusPool Waiting for available connection(${connection.threadId} ) slot`)
})

moducampusPool.on('release', (connection) => {
  logger.setSourceFunc(__filename, __function)
  logger.debug(__line, `moducampusPool Connection ${connection.threadId} released`)
})

const pool = {
  crawlers: crawlersPool,
  moducampus: moducampusPool,
}

module.exports = {
  query(which, sql, params) {
    logger.setSourceFunc(__filename, __function)

    return new Promise((resolve, reject) => {
      pool[which].getConnection((e, c) => {
        if (e) reject(e)
        const conn = c
        conn.config.queryFormat = (q, values) => {
          if (!values) return q
          let query = q

          query = query.replace(/\:(\w+)/g, (k) => {
            const key = k.replace(':', '')
            if (values.hasOwnProperty(key)) {
              return sqlstring.escape(values[key])
            }
            return ''
          })
          return query
        }
        logger.debug(__line, { sql, params })
        conn.query(sql, params, (e, r) => {
          if (e) reject(e)
          logger.debug(__line, e || r)
          resolve(r)
        })
        conn.release()
      })
    })
  },
  pool,
}
