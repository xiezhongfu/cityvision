import React from 'react';
import Industry from './industry/';
import Economic from './economic/';
import Style from './style.module.scss';

export default class EnterpriseLand extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        {/* 产业 */}
        <div className={Style['industry']}>
          <Industry />
        </div>
        {/* 经济 */}
        <div className={Style['economic']}>
          <Economic />
        </div>
        {/* 土地 */}
        <div className={Style['land']} style={{ backgroundColor: 'red' }}></div>
      </div>
    )
  }
}