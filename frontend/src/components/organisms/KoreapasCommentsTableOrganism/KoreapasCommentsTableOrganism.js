import React, {Component} from 'react'

import styles from './KoreapasCommentsTableOrganism.scss'
import classNames from 'classnames/bind'
import { BSTableAtom } from 'components'

const $ = window.$

const cx = classNames.bind(styles)


class KoreapasCommentsTableOrganism extends Component{
  constructor(props){
    super(props)
    this.state = {
      comments : this.props.commentsData,
      selections : [],
    }

  }

  componentDidUpdate(props){
    console.log(this.props.commentsData)
    const $table = $(`#${this.props.id}`)
    $table.bootstrapTable({
      exportDataType: 'selected',
      columns: [
        {
          field: 'state',
          checkbox: true,
        },
        {
          title: '번호',
          field: 'id',
          align: 'center',
          valign: 'middle',
          sortable: true
        },{
          title: '내용',
          field: 'content',
          align: 'left',
          valign: 'middle',
        },{
          title: '날짜',
          field: 'reg_date',
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
        }
      ]
    }).bootstrapTable('load', this.props.commentsData || []).bootstrapTable('checkAll')
  }

/*

*/
  render(){
    return(
      <BSTableAtom
        id={this.props.id}
        detailView={this.props.detailView}
        detailFormatter={this.props.detailFormatter}
        clickToSelect={this.props.clickToSelect}
        black
        >
        {this.props.children}
      </BSTableAtom>
    )
  }
}


export default KoreapasCommentsTableOrganism;
