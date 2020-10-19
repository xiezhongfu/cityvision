import React from 'react';
import { ReactComponent as BaseMap } from './map.svg';
import Style from './style.module.scss';

export default class Map extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <div className={Style['map']}>
          <BaseMap />
        </div>
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