import React from 'react';
import styles from './InputTextAtom.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class InputTextAtom extends React.Component{

  componentDidUpdate(){
    this.inputText.focus();
  }
  render() {

    const {placeholder, disabled, onKeyUp, value, id, className} = this.props
    return (
      <input 
        ref={(input) => { this.inputText = input}} 
        className={cx('input-text')+` ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        type='text'
        onKeyUp={onKeyUp}
        />
    );
  }
};

InputTextAtom.defaultProps = {
  placeholder: '',
  disabled: false,
  onKeyUp: ()=>{},
  className: '',
  id: '',
};

export default InputTextAtom;