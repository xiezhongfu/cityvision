import React from 'react';
import Industry from './industry/';
import Style from './style.module.scss';

export default class EnterpriseLand extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        {/* 产业 */}
        <div>
          <Industry  />
        </div>
        {/* 经济 */}
        {/* <div className={Style['economic']}></div> */}
        {/* 土地 */}
      </div>
    )
  }
}