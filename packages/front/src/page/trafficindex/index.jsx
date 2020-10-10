import React from 'react';
import TrafficPie from './traffic-pie/';
import TrafficLine from './traffic-line/';
import Map from './map/';
import Style from './style.module.scss';

export default class TrafficIndex extends React.PureComponent {
  render() {
    return (
      <div>
        <div className={Style['left-container']}>
          <TrafficPie />
          <TrafficLine />
        </div>
        <div className={Style['middle-container']}>
          <Map />
        </div>
        <div></div>
      </div>
    )
  }
}