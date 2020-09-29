import React from 'react';
import Style from './style.module.scss';

export default class Logo extends React.PureComponent {
  render() {
    return (
      <div className={Style['logo']}>
        <div className={Style['avatar']}></div>
        <h2 className={Style['user']}>南大未来智慧城</h2>
        <p className={Style['desc']}>多方安全大数据看板</p>
      </div>
    );
  }
}