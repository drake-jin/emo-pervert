import React, { Component } from 'react'
import styles from './LoginPage.scss'
import classNames from 'classnames/bind'
import { PageTemplate, InputTextAtom } from 'components'
import storage from 'lib/storage'
import axios from 'axios'
import config from 'config'

const cx = classNames.bind(styles)


const defaultParams = {
  sql: 'SELECT 1+1 FROM dual',
  which: 'crawlers',
  params: JSON.stringify({a:1}),
}
class LoginPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      inputText:{
        disabled: false
      },
      ajaxRunning: false,
      boards: [],
      board: {},
      key: storage.get('key'),
    }
    defaultParams.key = this.state.key
    
    if(this.state.key !== 'undefined' && this.state.key !== undefined){
      console.log('로그인이 되어있지 않았습니다.')
      axios.post(`${config[process.env.NODE_ENV].host}/api/pool`, defaultParams).then((e)=>{
        window.location.href = '/schedule';
      })
    }

    this.onKeyUp = this.onKeyUp.bind(this)
  }

  onKeyUp(e) {
    console.log(e.target.value)
    if(e.key==='Enter'){
      const defaultParams = {
        sql: 'SELECT 1+1 FROM dual',
        which: 'crawlers',
        params: '{a:1}',
      }
      
      console.log(e.target.value)
      defaultParams.key = e.target.value
      const result = axios.post(`${config[process.env.NODE_ENV].host}/api/pool`, defaultParams).then((res)=>{
        if (res.data.result === true) {
          storage.set('key', defaultParams.key)
          window.location.href = '/schedule';
        }
      })
      this.setState({inputText: {disabled: true}})
    }
    setTimeout(()=>{
      this.setState({inputText: {disabled: false}})
    }, 1000)
  }

  render(){
    return (
      <PageTemplate header={false}>
        <div className={cx('panel-wrap')}>
          <div className={cx('panel', {
            center: true
          })}>
            <InputTextAtom disabled={this.state.inputText.disabled} placeholder='drakejin한태 키값을 발급받으세요.' onKeyUp={this.onKeyUp}/>
          </div>
        </div>
      </PageTemplate>
    )
  }
}

export default LoginPage