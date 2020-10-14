import React from 'react';
import Map from './map/';
import Video from './video/';
import Style from './style.module.scss';

export default class DataCollect extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <Map />
        <Video />
      </div>
    )
  }
}