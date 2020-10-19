import React from 'react';
import Map from './map/';
import Total from './total/';
import Type from './type/';
import Supply from './supply/';
import Style from './style.module.scss';

export default class Land extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <div className={Style['map']}>
          <Map />
        </div>
        <div className={Style['echarts']}>
          <Total />
          <Type />
          <Supply />
        </div>
      </div>
    );
  }
}
