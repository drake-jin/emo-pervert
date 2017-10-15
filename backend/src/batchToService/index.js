const dbConnect = require('../db')
const sqlstring = require('sqlstring')
const moment = require('moment')

module.exports = {
  async batch() {
    const nowDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let boards = await dbConnect.query('crawlers', 'SELECT * FROM schedule_boards WHERE  state="대기" AND reg_date <= :date ORDER BY id DESC', { date: nowDate })
    let insertBoardSQL = ''
    let processingBoardSQL = ''
    const boardReg_date = {}
    boards.filter(async (v, i) => {
      insertBoardSQL += sqlstring.format(`
        INSERT INTO
          univ_board(campus_id, cat_id, post_type, user_id, status, reg_ip, reg_date, title, attachment, hits_cnt, comments_cnt, likes_cnt, accuse_cnt, content, fbpost_id, file_date, file_name, file_name_orig)
        SELECT 
          C.cam_id, ?, 'post', '127071', 'public', '211.236.127.89',
          :reg_date_${i}, ?, 0, 0, 0, 0, 0, ?, '', '0000-00-00 00:00:00', '', ''
        FROM
          univ_campus C
        WHERE
          C.status = 'opened';`
//          C.cam_id = 266;`
        , [v.target_category, v.title, v.content])
      boardReg_date[`reg_date_${i}`] = v.reg_date
      processingBoardSQL += sqlstring.format('UPDATE schedule_boards SET state="진행중" WHERE id=?;', [v.id])
      return true
    })

    if (insertBoardSQL === '') {
      insertBoardSQL = 'SELECT 1+1 FROM DUAL;'
    }
    if (processingBoardSQL === '') {
      processingBoardSQL = 'SELECT 1+1 FROM DUAL;'
    }

    await dbConnect.query('moducampus', insertBoardSQL, boardReg_date)
    await dbConnect.query('crawlers', processingBoardSQL, {})

    boards = await dbConnect.query('crawlers', 'SELECT * FROM schedule_boards WHERE state="진행중" AND reg_date <= :date ORDER BY id DESC', { date: nowDate })
    const comments = await dbConnect.query('crawlers', `SELECT C.* FROM schedule_comments C, schedule_boards B 
      WHERE B.board_id = C.board_id AND B.state='진행중' AND C.reg_date <= :date`, { date: nowDate })

    boardCommentsMapping = {}

    boards.filter((v) => {
      boardCommentsMapping[v.board_id] = v
      boardCommentsMapping[v.board_id].comments = []
      boardCommentsMapping[v.board_id].queueComments = []
      return true
    })
    comments.filter((v) => {
      boardCommentsMapping[v.board_id].comments.push(v)
      if (v.state === '대기') boardCommentsMapping[v.board_id].queueComments.push(v)
      return true
    })

    const commentReg_date = {}
    let insertCommentsSQL = ''
    let updateBoard = ''
    let completeBoard = ''
    boards.filter((board) => {
      const ratio = boardCommentsMapping[board.board_id].queueComments.length / boardCommentsMapping[board.board_id].comment_count
      const hits = Math.round(boardCommentsMapping[board.board_id].hits * ratio)
      const likes = Math.round(boardCommentsMapping[board.board_id].queueComments.length / 3) // 덧글의 1/3 개수 만큼 좋아요 생성

      updateBoard += sqlstring.format('UPDATE univ_board SET comments_cnt = comments_cnt + ?, hits_cnt = hits_cnt + ?, likes_cnt = likes_cnt + ? WHERE content like ?;',
        [boardCommentsMapping[board.board_id].queueComments.length, hits, likes, `%${board.content}%`])
      
      boardCommentsMapping[board.board_id].queueComments.filter((comment) => {
        insertCommentsSQL += sqlstring.format(`
          INSERT INTO
            univ_comment(board_id, b_author_id, parent, depth, user_id, status, reg_ip, reg_date, reply_cnt, accuse_cnt, content)
          SELECT 
            B.board_id, B.user_id, 0, 0, 127071, 'public', '211.236.127.89',
            :reg_date_${board.board_id}_${comment.comment_id},
            0,
            0,
            ?
          FROM
            univ_campus C, univ_board B
          WHERE
            B.campus_id = C.cam_id
              AND
            C.status = 'opened'
              AND
            B.content like ?;`
          , [comment.content, `%${board.content}%`])
        commentReg_date[`reg_date_${board.board_id}_${comment.comment_id}`] = comment.reg_date

        completeBoard += sqlstring.format('UPDATE schedule_comments SET state="완료" WHERE id = ? ;', [comment.id])

        return true
      })
      if (boardCommentsMapping[board.board_id].comments.length === boardCommentsMapping[board.board_id].comment_count) {
        completeBoard += sqlstring.format('UPDATE schedule_boards SET state="완료" WHERE board_id = ? ;', [board.board_id])
      }
      return true
    })
    if (insertCommentsSQL === '') {
      insertCommentsSQL = 'SELECT 1+1 FROM DUAL;'
    }

    if (updateBoard === '') {
      updateBoard = 'SELECT 1+1 FROM DUAL;'
    }

    if (completeBoard === '') {
      completeBoard = 'SELECT 1+1 FROM DUAL;'
    }
    await dbConnect.query('moducampus', insertCommentsSQL + updateBoard, commentReg_date)
    await dbConnect.query('crawlers', completeBoard, {})

    console.log(' =================================1======================================= ')
    console.log('insertBoardSQL')
    console.log(insertBoardSQL)
    console.log(' =================================2======================================= ')
    console.log('processingBoardSQL')
    console.log(processingBoardSQL)
    console.log(' =================================3======================================= ')
    console.log('insertCommentsSQL')
    console.log(insertCommentsSQL)
    console.log(' =================================4======================================= ')
    console.log('updateBoard')
    console.log(updateBoard)
    console.log(' =================================5======================================= ')
    console.log('completeBoard')
    console.log(completeBoard)
    return true
  },
}
