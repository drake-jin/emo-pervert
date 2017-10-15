import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PageTemplate, MainBlockAtom, KoreapasBoardsTableOrganism, KoreapasCommentsTableOrganism, BoardDetailModalMolecule} from 'components'

import styles from './KoreapasPage.scss'

import storage from 'lib/storage'
import jsonToExcel from 'lib/jsonToExcel'
import config from 'config'

import classNames from 'classnames/bind'
import axios from 'axios'
import moment from 'moment'
import empty from 'is-empty'
import update from 'react-addons-update'
const $ = window.$
// import jquery from 'jquery'
// const $ = window.$ = window.jQuery = jquery

// 출처: http://yamea-guide.tistory.com/185 [기타치는 개발자의 야매 가이드]

const DOM_ELEMENT_ID_BS_TABLE_BOARDS = 'koreapasBoardsTable'
const DOM_ELEMENT_ID_BS_TABLE_COMMENTS = 'koreapasCommentsTable'
const DOM_ELEMENT_ID_BS_LG_MODAL = 'koreapasBoardsInfoModal'

const cx = classNames.bind(styles)


const defaultParams = {
  sql: 'SELECT 1+1 FROM dual',
  which: 'crawlers',
  params: JSON.stringify({a:1}),
}

class KoreapasPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      ajaxRunning: false,
      boards: [],
      board: {},
      key: storage.get('key'),
      comments: [],
      exportComments: [],
    }
    defaultParams.key = this.state.key

    axios.post(`${config[process.env.NODE_ENV].host}/api/pool`, defaultParams).catch((e)=>{
      storage.set('key', undefined)
      window.location.href = '/';
    })

    this.setBSTableBoardClick = this.setBSTableBoardClick.bind(this)
    this.getExcelFile = this.getExcelFile.bind(this)
    this.setBoardDate = this.setBoardDate.bind(this)
  }

  setBoardDate(e){
    const newDate = moment(e.date).format('YYYY-MM-DD HH:mm:ss')
    const oldDate = moment(this.state.board.reg_date).format('YYYY-MM-DD HH:mm:ss')
    const diffboardDate = moment(newDate).diff(oldDate)
    let comments = JSON.parse(JSON.stringify(this.state.comments))

    comments = comments.map((v) => {
      const diffCommentDate = moment(v.reg_date).diff(this.state.board.reg_date)
      v.reg_date = moment(v.reg_date).add((diffCommentDate) + (diffboardDate),'ms').format('YYYY-MM-DD HH:mm:ss')
      return v
    })
    console.log(this.state.comments)
    this.setState({
      board: update(this.state.board, {
        export_reg_date: {$set : newDate },
      }),
      exportComments: comments
    })
  }

  setBSTableBoardClick(row, comments){
    this.setState({board: row, comments, exportComments: comments})
  }
  getExcelFile(board){
    board.reg_date = board.export_reg_date
    console.log([board])
    jsonToExcel.getBoardAndComments({
      board: [board],
      comments: $('#'+DOM_ELEMENT_ID_BS_TABLE_COMMENTS).bootstrapTable('getSelections'),
      fileName: `koreapas-greenlight-${this.state.board.id}`
    })
  }

  render() {
    return (
      <PageTemplate header>
        <MainBlockAtom shadow>
          <h1>고파스데이터</h1>
          <KoreapasBoardsTableOrganism 
            id={DOM_ELEMENT_ID_BS_TABLE_BOARDS}
            detailView='true'
            clickToSelect='true'
            detailFormatter={DOM_ELEMENT_ID_BS_TABLE_BOARDS+'Formatter'}
            openDetailModalId={DOM_ELEMENT_ID_BS_LG_MODAL}
            parentStateHandler={this.setBSTableBoardClick}
          />
        </MainBlockAtom>
        <BoardDetailModalMolecule
          id={DOM_ELEMENT_ID_BS_LG_MODAL}
          boardData={ this.state.board }
          getExcelFile = {this.getExcelFile}
          onChange={this.setBoardDate}
          >
          <KoreapasCommentsTableOrganism
            id={DOM_ELEMENT_ID_BS_TABLE_COMMENTS}
            detailView='false'
            clickToSelect='true'
            detailFormatter={DOM_ELEMENT_ID_BS_TABLE_COMMENTS+'Formatter'}
            commentsData={this.state.exportComments}
            />
        </BoardDetailModalMolecule>
      </PageTemplate>
    )
  }
}

export default KoreapasPage