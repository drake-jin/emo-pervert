const fs = require('fs')
const dbConnect = require('../db')
const sqlstring = require('sqlstring')
const detectCharacterEncoding = require('detect-character-encoding')
const Iconv = require('iconv').Iconv

const convertNewline = require('convert-newline')

const converter = convertNewline('lf').buffer()

const iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE')

const __read = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      const charsetMatch = detectCharacterEncoding(data)
      if (charsetMatch.encoding === 'UTF-8') {
        resolve(converter(data).toString())
      } else {
        resolve(iconv.convert(data).toString('UTF-8'))
      }
    })
  })
}

const __removeFile = (path) => {
  return fs.unlinkSync(path)
}

const __makePureArray = (str) => {
  const split = str.split('\t')
  return split.filter(v => v !== '')
}

const __getBoardComments = async (path) => {
  const content = await __read(path)

  let split = content.split('\r\n')
  if (split.length <= 4) {
    split = content.split('\n')
  }

  const boardAttr = __makePureArray(split.shift())
  const boardValue = __makePureArray(split.shift())
  const commentsAttr = __makePureArray(split.shift())
  const commentsValue = split.map((v) => __makePureArray(v))
  commentsValue.pop() // EOF 마지막 열 제거

  const board = {}
  const comments = []
  boardAttr.filter((item, index) => {
    board[item.trim()] = boardValue[index]
    return item
  })
  commentsValue.filter((item) => {
    const row = {}
    item.filter((...argsChild) => {
      const index = argsChild[1]
      row[commentsAttr[index]] = item[index]
      return true
    })
    comments.push(row)
    return true
  })
  return {
    board,
    comments,
  }
}

const __getCSVFiles = (p) => {
  return fs.readdirSync(p).filter((v) => {
    const item = v.split('.')
    if (item[item.length - 1] === 'csv') {
      return true
    }
    return false
  }).map((v) => {
    return `${p}/${v}`
  })
}


module.exports = {
  setSchedule(options) {
    __getCSVFiles(options.dirPath).filter((csvFiles, csvIndex) => {
      setTimeout(async () => {
        try {
          const { board, comments } = await new Promise(
            (resolve) => resolve(__getBoardComments(csvFiles)),
          )
          board.targetCategory = options.targetFilter(board.category)
          board.comment_count = comments.length
          board.content = board.content.replace(/{newline}/gi, '\n')
          await dbConnect.query('crawlers', `INSERT INTO schedule_boards(source, board_id, target_category, category, type, title, reg_date, content, hits, likes, hates, comment_count)
          values('koreapas', :id, :targetCategory, :category, :type, :title, :reg_date, :content, :hit, :likes, :hates, :comment_count )`, board)

          let sqlComment = 'INSERT INTO schedule_comments(source, comment_id, board_id, target_category, category, reg_date, content, hates, likes) VALUES '
          const params = {}
          comments.filter((item, index) => {
            if (comments.length - 1 === index) {
              sqlComment = `${sqlComment} ${sqlstring.format(`('koreapas', ?,?,?,?,:reg_date_${item.id},?,?,?)`,
                [item.id, item.board_id, board.targetCategory, item.category, item.content.replace(/{newline}/gi, '\n'), item.hates, item.likes])}`
            } else {
              sqlComment = `${sqlComment} ${sqlstring.format(`('koreapas', ?,?,?,?,:reg_date_${item.id},?,?,?)`,
                [item.id, item.board_id, board.targetCategory, item.category, item.content.replace(/{newline}/gi, '\n'), item.hates, item.likes])}, `
            }
            params[`reg_date_${item.id}`] = item.reg_date
            return false
          })

          await dbConnect.query('crawlers', sqlComment, params)
          await dbConnect.query('crawlers', 'UPDATE koreapas_boards SET state=\'사용\' WHERE id = :id', board)
          __removeFile(csvFiles)
        } catch (e) {
          console.log(e)
        }
      }, options.queryInterval * csvIndex)
      return true
    })
  },
  getBoardComments: __getBoardComments,
  getCSVFiles: __getCSVFiles,
}
