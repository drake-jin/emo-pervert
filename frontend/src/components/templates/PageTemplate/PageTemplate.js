import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PageTemplate.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const PageTemplate = ({header, children}) => {

  return (
    <div className={cx('page')}>
      {
        header ?
        (
          <nav className={cx('nav')}>
            <a href="#!" className={cx('brand-logo')}>모캠 사이드 프로젝트 - 크롤러</a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/schedule">스케줄링</Link></li>
              <li><Link to="/koreapas">고파스데이터</Link></li>
              <li><Link to="/completion">완료목록</Link></li>
            </ul>
          </nav>
        )
        :
        ''
      }
      <main className={cx('content')}>
        {children}
      </main>
    </div>
  )
}

export default PageTemplate