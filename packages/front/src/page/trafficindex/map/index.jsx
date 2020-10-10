import React from 'react';
// import { ReactComponent as Map } from './map.svg';// 以组件的方式引入会导致 svg 的部分属性转义错误或丢失，!!!待查!!!
import MapSrc from './map.svg';
import Style from './style.module.scss';

export default class Map extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <img className={Style['map']} alt="map" src={MapSrc} />
        <h4 className={Style['title']}>最新车辆分布</h4>
        <ol className={Style['legend']}>
          <li>拥堵点</li>
          <li>公交车</li>
          <li>货运车</li>
          <li>出租车</li>
        </ol>
      </div>
    );
  }
}