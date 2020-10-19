import React from 'react';
import Map from './map/';
import Economic from './economic/';
import Enterprise from './enterprise/';
import Project from './project/';
import Style from './style.module.scss';

export default class Industry extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        {/* 地图 */}
        <div className={Style['map']}>
          <Map />
        </div>
        {/* echarts */}
        <div className={Style['echarts']}>
          <Economic />
          <Enterprise />
          <Project />
        </div>
      </div>
    );
  }
}