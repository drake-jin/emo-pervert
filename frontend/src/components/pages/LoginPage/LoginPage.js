import React, { Component } from 'react'
import styles from './LoginPage.scss'
import classNames from 'classnames/bind'
import { PageTemplate } from 'components'
import domCtrl from 'lib/domCtrl'
import Quill from 'quill'

const cx = classNames.bind(styles)

class LoginPage extends Component {
  constructor(props){
    super(props)
    this.state= {
      nickname: ''
    }

    this.nicknameKeyUp = this.nicknameKeyUp.bind(this)
  }

  nicknameKeyUp(e){
    console.log(e.target.value)
    this.setState({nickname: ` - ${e.target.value} - `})
  }

  componentDidMount(){
    var BackgroundClass = Quill.import('attributors/class/background');
    var ColorClass = Quill.import('attributors/class/color');
    var SizeStyle = Quill.import('attributors/style/size');
    var Font = Quill.import('formats/font');
    Font.whitelist = ['MiSaeng'];
    Quill.register(Font, true);
    Quill.register(BackgroundClass, true);
    Quill.register(ColorClass, true);
    Quill.register(SizeStyle, true);
    
    var editor = new Quill('#note-content', {
      modules: {
        toolbar: '#note-toolbar',
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true
        }
      },
      placeholder: '헛소리를 짓거려보아요.',
//      theme: 'snow',
      theme: 'bubble',
    })
  }

  render(){
    return (
      <PageTemplate header={false}>
        <div className={cx('container')}>
          <h3 className={cx('center-align')} style={{color:"#333", fontSize: '3.56rem', marginTop:'35px',marginBottom:'10px'}}> 
            감성변태
          </h3>
          <div className={cx('search-wrap')}>
            <div className={cx('search-panel')}>
              <input type='text' placeholder={`우리의 친구 '감성변태'를 찾아보세요`} />
            </div>
          </div>
          <div className={cx('row','edit-toolbar')}>
            <div className={cx('col', 's6')}>
              <button style={{width:'100%', paddingLeft: '-15px', paddingRight: '-15px'}}>이미지 이전</button>
            </div>
            <div className={cx('col','s6')}>
              <button style={{width:'100%', paddingLeft: '-15px', paddingRight: '-15px'}}>이미지 다음</button>
            </div>
            <div className={cx('col', 's12')}>
              <input type="text" onKeyUp={this.nicknameKeyUp} placeholder="혼모노의 '감성변태' 이름을 입력해주세요." style={{width:'100%', textAlign:'center', paddingLeft: '-15px', paddingRight: '-15px'}}/>
            </div>
          </div>
          <div className={cx('edit-wrap')}>
            <div className={cx('panel-bg')} style={{
              backgroundImage: `url('http://cfile22.uf.tistory.com/image/267B3C3E56677077120D05')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
              }}></div>
            <div className={cx('filter','filter-black-50')}></div>
            <div className={cx('panel')}>
              <div className={cx('row','content')}>
                <div id="note-toolbar">
                  <span className="ql-formats">
                    <button className="ql-image"></button>
                  </span>
                </div>
                <div id="note-content">
                  <h2 className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>청산별곡</span></h2>
                  <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><br/></p>
                  <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>얄리얄리 얄라셩 얄라리 얄라</span></p>
                  <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>머루와 다래먹고 청산에서 하고싶다.</span></p>
                </div>
              </div>
            </div>
            <p className={cx('ql-color-white', 'nickname')}>{this.state.nickname}</p>
          </div>
          <div className={cx('panel-list')}>
            <div className={cx('panel-wrap')}>
              <div className={cx('panel-bg')} style={{
                backgroundImage: `url('https://thumbs.gfycat.com/GorgeousElatedDinosaur-small.gif')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
                }}></div>
              <div className={cx('filter','filter-black-50')}></div>
              <div className={cx('panel')}>
                <div className={cx('content')}>
                  <div className="ql-container ql-board" style={{
                    height:'100%',
                    fontSize:'18px',
                    }}>
                    <div className='ql-editor' style={{
                      display:'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      }}>
                      <h2 className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>홍콩</span></h2>
                      <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><br/></p>
                      <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>님은 갔습니다. 아아</span></p>
                      <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>사랑하는 나의 님은 갔습니다.</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <p className={cx('ql-color-white', 'nickname')}> - 진짜변태 - </p>
            </div>
            <div className={cx('panel-wrap')}>
              <div className={cx('panel-bg')} style={{
                backgroundImage: `url('http://file2.instiz.net/data/cached_img/upload/2017/01/07/0/2031523f5fe9a08d4def9f85463cfa21.gif')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
                }}></div>
              <div className={cx('filter','filter-black-50')}></div>
              <div className={cx('panel')}>
                <div className={cx('content')}>
                  <div className="ql-container ql-board" style={{
                    height:'100%',
                    fontSize:'18px',
                    }}>
                    <div className='ql-editor' style={{
                      display:'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      }}>
                      <h2 className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>인생</span></h2>
                      <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><br/></p>
                      <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>굵고 짧은것 보다</span></p>
                      <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>기왕이면 굵고 긴 것</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <p className={cx('ql-color-white', 'nickname')}> - 김본좌 - </p>
            </div>
            <div className={cx('panel-wrap')}>
              <div className={cx('panel-bg')} style={{
                backgroundImage: `url('http://pds.joins.com/news/component/htmlphoto_mmdata/201706/09/0326ccab-a0c9-4ce5-b9c1-e0ac25c64999.jpg')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
                }}></div>
              <div className={cx('filter','filter-black-50')}></div>
              <div className={cx('panel')}>
                <div className={cx('content')}>
                  <div className="ql-container ql-board" style={{
                    height:'100%',
                    fontSize:'18px',
                    }}>
                    <div className='ql-editor' style={{
                      display:'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      }}>
                      <h2 className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>청산별곡</span></h2>
                      <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><br/></p>
                      <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>얄리얄리 얄라셩 얄라리 얄라</span></p>
                      <p className={cx('ql-align-center', 'ql-font-MiSaeng')}><span className={cx('ql-color-white', 'ql-bg-pink-lighten-2')}>머루와 다래먹고 청산에서 하고싶다.</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <p className={cx('ql-color-white', 'nickname')}> - ㅇㄱㄹㅇ선비 - </p>
            </div>

          </div>

        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </PageTemplate>
       
    )
  }
}

export default LoginPage