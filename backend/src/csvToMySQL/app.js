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


const csvToMysql = require('./index')
const options = {
  queryInterval: 2 * 1000,
  dirPath: `${__dirname}/csvs`,
  targetFilter: (category) => {
    switch (category) {
    case 'greenlight':
      return '3'
    default:
      return '1'
    }
  },
}

csvToMysql.setSchedule(options)

/*
csvToMysql.getCSVFiles(options.dirPath).filter((csvFiles, csvIndex) => {
  console.log(csvFiles)
  setTimeout(async () => {
    try {
      const { board, comments } = await new Promise(
        (resolve) => resolve(csvToMysql.getBoardComments(csvFiles)),
      )
      board.targetCategory = options.targetFilter(board.category)
      board.comment_count = comments.length
      board.content = board.content.replace(/{newline}/gi, '\n')
      console.log(board)
      console.log(comments)
    } catch (e) {
      console.log(e)
    }
  }, csvIndex * 1000)
})
*/