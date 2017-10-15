import React, { Component } from 'react';
import styles from './ScheduleDetailModalMolecule.scss';
import { LargeModalAtom } from 'components';
import classNames from 'classnames/bind';
import empty from 'is-empty'

const $ = window.$
const cx = classNames.bind(styles);

class ScheduleDetailModalMolecule extends Component{

  render(){
    return (
      <LargeModalAtom 
        id={this.props.id}
        title='꺄'
        >
        <div className={cx('panel')}>
          <h1> asdasd </h1>
        </div>
      </LargeModalAtom>
    );
  }
};

export default ScheduleDetailModalMolecule;
