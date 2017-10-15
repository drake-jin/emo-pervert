import React, { Component } from 'react';
import styles from './DragDropUpload.scss';
import classNames from 'classnames/bind';
import Dropzone from 'react-dropzone'

import axios from 'axios'
import storage from 'lib/storage'

const $ = window.$
const cx = classNames.bind(styles);


var axiosConfig = {
  onUploadProgress: function(progressEvent) {
    var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
    console.log(percentCompleted)
  },
};

class DragDropUpload extends Component{

  constructor(props) {
    super(props)
    this.state = {
      accepted: [],
      rejected: [],
      key: storage.get('key'),
    }

    this.submitToServer = this.submitToServer.bind(this)
  }

  submitToServer(){
    
    let defaultParams = new FormData()
    defaultParams.append('key', this.state.key)
    defaultParams.append('files', this.state.accepted)
    
/*
    const defaultParams = {}
    defaultParams['key'] = this.state.key
    defaultParams['files'] = this.state.files
    */
    console.log(defaultParams)
    console.log(defaultParams)
    console.log(defaultParams)
    console.log(defaultParams)
    console.log(defaultParams)
    console.log(defaultParams)
    axios.post('http://localhost:4000/api/multipart', defaultParams, axiosConfig).then((res)=>{
      console.log(res)
    }).catch((e)=>{
      console.log(e)
    })
  }

  render() {
    return (
      <section>
        <div className={cx('dropzone')}>
          <Dropzone
            className={cx('dropzone-box')}
            accept='text/csv, application/xml, application/msword, application/excel, application/vnd.ms-excel, application/x-excel, application/x-msexcel'
            onDrop={(accepted, rejected) =>  this.setState({ accepted, rejected })}
            >
          <aside>
            <div className='row'>
              <div className='col-xs-12'>
                <h1>
                  Drop tha bits! (아직 이 기능은 만들어 지지 않았습니다.)
                </h1>
                <p>*.엑셀, *.csv, *.xml 파일만 업로드 할 수 있습니다.</p>
                <ul>
                  {
                  //  this.state.files.map(item => item.map(f => <li key={f.name}>{f.name} - {f.size/1024} KB</li>)) 
                  }
                </ul>
                <h4>해당파일은 업로드가 거절됩니다.</h4>
                <ul>
                  {
                    this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size / 1024 } KB</li>)
                  }
                </ul>
              </div>
            </div>
          </aside>
          </Dropzone>
          <button onClick={this.submitToServer} className='btn btn-primary col-xs-12 btn-lg'>스케쥴 등록</button>
        </div>
      </section>
    );
  }
};

export default DragDropUpload;