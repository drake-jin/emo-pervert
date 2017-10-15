import React from 'react';
import styles from './MainBlockAtom.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MainBlockAtom = ({color, background, children, center, shadow}) => {
  const style = {
    color,
    background
  };

  return (
    <div style={style} className={cx('main-block', {
      center,
      shadow
    })}>
      {children}
    </div>
  );
};

export default MainBlockAtom;