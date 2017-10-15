import React from 'react';
import styles from './TextAreaAtom.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TextAreaAtom extends React.Component{

  componentDidUpdate(){
    this.TextAreaAtom.focus();
  }
  render() {
    const {placeholder, disabled, onKeyUp, value, rows, id, className} = this.props
    return (
      <textarea 
        ref={(input) => { this.TextAreaAtom = input}}
        id= {id}
        className={cx('input-text') + ` ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        type='text'
        onKeyUp={onKeyUp}
        value={value}
        />
    );
  }
};

TextAreaAtom.defaultProps = {
  placeholder: '',
  disabled: false,
  className: '',
  onKeyUp: ()=>{},
  value: ''
};

export default TextAreaAtom;