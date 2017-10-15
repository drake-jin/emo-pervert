import React, {Component} from 'react'

import styles from './KoreapasBoardsTableOrganism.scss'
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
class KoreapasBoardsTableOrganism extends Component{

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
      sql: `SELECT * FROM (SELECT * FROM koreapas_boards A WHERE A.category="greenlight" AND state ='미사용' ORDER BY A.hit DESC, A.likes DESC limit 0, ${config[process.env.NODE_ENV].board_limit}) A ORDER BY A.reg_date;`,
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
        [
          {
            title: '번호',
            field: 'id',
            rowspan: 2,
            align: 'center',
            valign: 'middle',
            sortable: true
          },{
            title: '제목',
            field: 'title',
            rowspan: 2,
            align: 'left',
            valign: 'middle',
          },{
            title: '등록일',
            field: 'reg_date',
            rowspan: 2,
            align: 'center',
            valign: 'middle',
            sortable: true
          },{
            title: '조회수',
            field: 'hit',
            sortable: true,
            rowspan: 2,
            align: 'center',
            valign: 'middle',
          },{
            title: '덧글수',
            field: 'comment_count',
            sortable: true,
            rowspan: 2,
            align: 'center',
            valign: 'middle',
          },{
            title: '좋아요',
            field: 'likes',
            sortable: true,
            rowspan: 2,
            align: 'center',
            valign: 'middle',
          },{
            title: '싫어요',
            field: 'hates',
            sortable: true,
            rowspan: 2,
            align: 'center',
            valign: 'middle',
          },{
            title: '좋아요 남녀 비율',
            colspan: 4,
            align: 'center'
          }
        ],
        [
          {
            title: '남자 좋아요',
            field: 'like_men',
            sortable: true,
            align: 'center',
            valign: 'middle'
          },{
            title: '남자 비율',
            field: 'like_men_rate',
            sortable: true,
            align: 'center',
            valign: 'middle'
          },{
            title: '여자 좋아요',
            field: 'like_women',
            sortable: true,
            align: 'center',
            valign: 'middle'
          },{
            title: '여자 비율',
            field: 'like_women_rate',
            sortable: true,
            align: 'center',
            valign: 'middle'
          }
        ]
      ]
    }).on('click-row.bs.table',function(e, row, $element) {
      defaultParams.sql = 'SELECT * FROM koreapas_comments C WHERE C.board_id='+row.id
      defaultParams.params = JSON.stringify({id:row.id})
      axios.post(`${config[process.env.NODE_ENV].host}/api/pool`, defaultParams).then((response)=>{
        $(`#${that.props.openDetailModalId}`).modal('show')
        for(let item of response.data.data){
          item.reg_date = moment(item.reg_date).format('YYYY-MM-DD HH:mm:ss')
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


export default KoreapasBoardsTableOrganism;
