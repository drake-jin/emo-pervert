import React, {Component} from 'react'

import styles from './ScheduleTableOrganism.scss'
import classNames from 'classnames/bind'
import axios from 'axios'
import storage from 'lib/storage'
import { BSTableAtom } from 'components'
import moment from 'moment'
import config from 'config'
const $ = window.$

const cx = classNames.bind(styles)

const defaultParams = {
  sql: 'SELECT 1+1 FROM dual',
  which: 'crawlers',
  params: JSON.stringify({a:1}),
}
class ScheduleTableOrganism extends Component{

  constructor(props){
    super(props)
    this.state = {
      boards : [],
      ajaxRunning : false
    }
    defaultParams.key = storage.get('key')


  }
  componentWillMount(){
    const defaultParams = {
      sql: `SELECT * FROM schedule_boards A ORDER BY A.reg_date;`,
      which: 'crawlers',
      params: '{a:1}',
      key: storage.get('key')
    }
    axios.post(`${config[process.env.NODE_ENV].host}/api/pool`, defaultParams).then((response)=>{
      console.log(response.data.data)
      for(let item of response.data.data){
        item.reg_date = moment(item.reg_date).format('YYYY-MM-DD HH:mm:ss')
      } 
      const $table = $(`#${this.props.id}`)
      this.setState({boards: response.data.data})
      $table.bootstrapTable('load', this.state.boards);
    })
  }

  componentDidMount(props){
    const that = this
    const $table = $(`#${this.props.id}`)
    $table.bootstrapTable({
      columns: [
        {
          title: '번호',
          field: 'id',
          align: 'center',
          valign: 'middle',
          sortable: true
        },{
          title: '글 등록 시기',
          field: 'reg_date',
          align: 'center',
          valign: 'middle',
        },{
          title: '게시글 번호',
          field: 'board_id',
          align: 'center',
          valign: 'middle',
          sortable: true
        },{
          title: '상태',
          field: 'state',
          align: 'center',
          valign: 'middle',
          sortable: true
        },{
          title: '타겟 게시판',
          field: 'target_category',
          align: 'center',
          valign: 'middle',
          sortable: true
        },{
          title: '제목',
          field: 'title',
          align: 'left',
          valign: 'middle',
        },{
          title: '조회수',
          field: 'hits',
          sortable: true,
          align: 'center',
          valign: 'middle',
        },{
          title: '덧글수',
          field: 'comment_count',
          sortable: true,
          align: 'center',
          valign: 'middle',
        },{
          title: '좋아요',
          field: 'likes',
          sortable: true,
          align: 'center',
          valign: 'middle',
        },{
          title: '싫어요',
          field: 'hates',
          sortable: true,
          align: 'center',
          valign: 'middle',
        },{
          title: '출처',
          field: 'source',
          align: 'center',
          valign: 'middle',
          sortable: true,
        },{
          title: '소스 게시판',
          field: 'category',
          align: 'center',
          valign: 'middle',
          sortable: true
        },{
          title: '사연 종류',
          field: 'type',
          align: 'center',
          valign: 'middle',
          sortable: true
        }
      ]
    }).on('click-row.bs.table',function(e, row, $element) {
      defaultParams.sql = 'SELECT * FROM schedule_comments C WHERE C.board_id='+row.id
      defaultParams.params = JSON.stringify({id:row.id})
      axios.post(`${config[process.env.NODE_ENV].host}/api/pool`, defaultParams).then((response)=>{
        $(`#${that.props.openDetailModalId}`).modal('show')
        for(let item of response.data.data){
          item.reg_date = moment(item.reg_date).format('YYYY-MM-DD hh:mm:ss')
        } 
        that.props.parentStateHandler(row, response.data.data)
      })
    });
  }

  render(){
    return(
      <BSTableAtom
        id={this.props.id}
        detailView={this.props.detailView}
        detailFormatter={this.props.detailFormatter}
        clickToSelect={this.props.clickToSelect}
        >
        {this.props.children}
      </BSTableAtom>
    )
  }
}


export default ScheduleTableOrganism;
