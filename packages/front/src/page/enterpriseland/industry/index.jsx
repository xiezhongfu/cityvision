import React from 'react';
import Map from './map/';
import Style from './style.module.scss';

export default class Industry extends React.PureComponent {
  render() {
    return (
      <div>
        {/* 地图 */}
        <div><Map /></div>
        {/* echarts */}
        <div></div>
      </div>
    );
  }
}