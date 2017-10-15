import React, { Component } from 'react';
import styles from './LargeModalAtom.scss';
import classNames from 'classnames/bind';
import empty from 'is-empty'

const $ = window.$
const cx = classNames.bind(styles);

class LargeModalAtom extends React.Component{

  render(){
    return (
      <div id={this.props.id} className={cx('modal', 'fade', 'text-black')} role='dialog' tabIndex='-1' aria-labelledby='myLargeModalLabel'>
        <div className={cx('modal-dialog', 'modal-lg')} role='document'> 
          <div className={cx('modal-content')}> 
            <div className={cx('modal-header', 'text-black')}> 
              { this.props.header === undefined ?
                (
                  <div>
                    <button type='button' className={cx('close')} data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>&times;</span>
                    </button> 
                    <div className='col-xs-12'>
                      <div className="form-group">
                        {this.props.title}
                      </div>
                    </div>
                  </div>
                )
                :
                this.props.header
              }
            </div>
            <div className={cx('modal-body','panel-wrap')} >
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

LargeModalAtom.defaultProps = {
  title: '{title}제목없음',  //
  header: undefined,
  className: '',
  id: '',
};

export default LargeModalAtom;