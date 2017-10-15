import React, { Component } from 'react';
import styles from './BoardDetailModalMolecule.scss';
import { LargeModalAtom, InputDateTimePickerAtom } from 'components';
import classNames from 'classnames/bind';
import empty from 'is-empty'

const $ = window.$
const cx = classNames.bind(styles);

const DOM_ELELMENT_ID_MODAL_REG_DATE = 'modal-reg_Date'

class BoardDetailModalMolecule extends Component{
  constructor(props){
    super(props)
    this.getExcelFile = this.getExcelFile.bind(this)
    console.log(this.props.boardData)
  }
  
  getExcelFile(){
    this.props.getExcelFile(this.props.boardData)
  }
  render(){
    console.log(this.props.boardData)
    return (
      <LargeModalAtom 
        id={this.props.id}
        header={(
          <div>
            <button type='button' className={cx('close')} data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button> 
            <div className='col-xs-12'>
              <div className="form-group">
                <label htmlFor="modal-title">제목</label>
                <input 
                  type="text"
                    className="form-control"
                  id="modal-title"
                  value={this.props.boardData.title}
                  disabled
                  />
              </div>
            </div>
          </div>
        )}
        >
        <div className={cx('panel')}>
          <h3>글 내용</h3>
          <div className='row'>
            <div className='col-xs-4'>
              <div className="form-group">
                <label htmlFor="modal-reg_date">등록일 {this.props.boardData.reg_date}</label>
                <InputDateTimePickerAtom 
                  type="text" 
                  className="form-control" 
                  id={DOM_ELELMENT_ID_MODAL_REG_DATE}
                  name={DOM_ELELMENT_ID_MODAL_REG_DATE}
                  onChange={this.props.onChange}
                  />
              </div>
            </div>
            <div className='col-xs-4'>
              <div className="form-group">
                <label htmlFor="modal-hits">조회수</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="modal-hits"
                  value={this.props.boardData.hit}
                  disabled
                  />
              </div>
            </div>
            <div className='col-xs-4'>
              <div className="form-group">
                <label htmlFor="modal-likes">좋아요</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="modal-likes"
                  value={this.props.boardData.likes}
                  disabled
                  />
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor="modal-content">내용</label>
            <textarea 
              className={cx('font-sizeup')+' form-control'} 
              id="modal-content"
              value={this.props.boardData.content}
              rows='10'
              disabled
              />
          </div>
        </div>
        <div>
          <div className={cx('panel')}>
            <h3> 덧글 리스트</h3>
            {this.props.children}
          </div>
        </div>
        <div className={cx('panel','board-setting')}>
          <div className="row">
            <button onClick={this.getExcelFile} className="col-xs-12 btn btn-primary btn-lg">
              엑셀 출력
            </button> 
          </div>
        </div>
      </LargeModalAtom>
    );
  }
};

export default BoardDetailModalMolecule;
