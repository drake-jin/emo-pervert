import React, { Component } from 'react';
import styles from './InputDateTimePickerAtom.scss';
import classNames from 'classnames/bind';
import empty from 'is-empty'
import moment from 'moment'

const $ = window.$
const cx = classNames.bind(styles);

class InputDateTimePickerAtom extends React.Component{

  componentDidMount(){
    const dp = $(`#${this.props.id}`)
    dp.datetimepicker({
      viewMode: 'days',
      format: 'YYYY-MM-DD HH:mm:ss',
    }).on('dp.change',(e)=>{
      this.props.onChange(e)
    })
  }

  render(){
    return (
      <div className={`input-group date ${cx(this.props.className)}` } id={this.props.id}>
        <input type='text' className="form-control"/>
        <span className="input-group-addon">
          <span className="glyphicon glyphicon-calendar"></span>
        </span>
      </div>
    );
  }
};

InputDateTimePickerAtom.defaultProps = {
  className: '',
  onChange: () => {},
};

export default InputDateTimePickerAtom;