import React, { Component } from 'react'
import { PageTemplate, MainBlockAtom, ScheduleTableOrganism, ScheduleDetailModalMolecule } from 'components'

import axios from 'axios'
import storage from 'lib/storage'
import styles from './SchedulePage.scss'
import classNames from 'classnames/bind'
import config from 'config'

const DOM_ELEMENT_ID_BS_TABLE_SCHEDULE = 'scheduleBoardsTable'

const cx = classNames.bind(styles)

const $ = window.$

const defaultParams = {
  sql: 'SELECT 1+1 FROM dual',
  which: 'crawlers',
  params: JSON.stringify({a:1}),
}

class SchedulePage extends Component {
  constructor(props){
    super(props)

    this.state = {
      key: storage.get('key'),
      schedule: {},
    }
    defaultParams.key = this.state.key

    axios.post(`${config[process.env.NODE_ENV].host}/api/pool`, defaultParams).catch((e)=>{
      storage.set('key', undefined)
      window.location.href = '/';
    })
    this.setBSTableBoardClick = this.setBSTableBoardClick.bind(this)
  }

  setBSTableBoardClick(row){
    this.setState({schedule: row})
  }
  componentDidMount(props){

  }
  render() {
    return (
      <PageTemplate header>
        <MainBlockAtom shadow>
          {/* <DragDropUpload /> */}
          <h1>스케줄링</h1>
          <div className='row'>
            <div className='col-sm-2'>
              <h2>* 글 등록 시기</h2>
              <p> 여기에서 날짜를 수정하면 '글 등록 시기'를 기준으로 덧글 등록 시간도 함께 변경됩니다.</p>
              <p>(덧글 등록 시간) = 덧글 등록된 시간 - 등록된 글 시간 + 수정한 글 등록 시간 </p>
            </div>
            <div className='col-sm-2'>
              <h2>* 타겟 게시판</h2>
              <ul>
                <li>1 = 그남자 그여자</li>
                <li>2 = 자유게시판</li>
                <li>3 = 연애상담</li>
              </ul>
            </div>

          </div>
          <ScheduleTableOrganism 
            id={DOM_ELEMENT_ID_BS_TABLE_SCHEDULE}
            detailView='true'
            clickToSelect='true'
            detailFormatter={DOM_ELEMENT_ID_BS_TABLE_SCHEDULE + 'Formatter'}
            openDetailModalId={'lg_modal' + DOM_ELEMENT_ID_BS_TABLE_SCHEDULE}
            parentStateHandler={this.setBSTableBoardClick}
            />
        </MainBlockAtom>
        <ScheduleDetailModalMolecule
          id={'lg_modal' + DOM_ELEMENT_ID_BS_TABLE_SCHEDULE}
          boardData={ this.state.board }
          getExcelFile = {this.getExcelFile}
          >
          <h1> 안녕! 내 이름은 삼척갑사!</h1>
        </ScheduleDetailModalMolecule>
      </PageTemplate>
    )
  }
}

export default SchedulePage