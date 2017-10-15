import React, {Component} from 'react'

import styles from './BSTableAtom.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class BSTableAtom extends Component{

  render(){
    return (
      <div className={cx('table-responsive',{
        black: this.props.black
      })}>
        <table id={this.props.id}
          data-search="true"
          data-show-toggle="true"
          data-show-columns="true"
          data-show-export="true"
          data-export-data-type="select"
          data-show-pagination-switch="true"
          data-show-footer="false"
          data-show-refresh="false"

          data-detail-view={this.props.detailView}
          data-detail-formatter={this.props.detailFormatter}

          data-click-to-select={this.props.clickToSelect}
          
          data-page-list="[200,400]"
          data-page-size="100"

          data-minimum-count-columns="2"
          data-pagination="true"
          data-id-field="id"
          data-select-item-name="id"
          >
          <thead></thead>
          <tbody></tbody>
          {this.props.children}
        </table>
      </div>
    )
  }
}

export default BSTableAtom