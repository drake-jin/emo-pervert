import React, { Component } from 'react'
import styles from './LoginPage.scss'
import classNames from 'classnames/bind'
import { PageTemplate, InputTextAtom } from 'components'
import storage from 'lib/storage'
import axios from 'axios'
import config from 'config'

const cx = classNames.bind(styles)

class LoginPage extends Component {
  constructor(props){
    super(props)
  }

  onKeyUp(e) {

  }

  render(){
    return (
      <PageTemplate header={false}>
        <div className={cx('container')}>
          <h1 className={cx('black-5','center')}> 
            감성변태
          </h1>
        </div>
        <div className={cx('panel-wrap')}>
          <div className={cx('panel', {
            center: true
          })}>
            변태변태변태
          </div>
        </div>
        
      </PageTemplate>
    )
  }
}

export default LoginPage