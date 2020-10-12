import React from 'react';
import Classnames from 'classnames';

import TrafficPie from './traffic-pie/';
import TrafficLine from './traffic-line/';
import Map from './map/';
import Road from './road/';

import Style from './style.module.scss';

export default class TrafficIndex extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <div className={Classnames(Style['item'], Style['left'])}>
          <TrafficPie />
          <TrafficLine />
        </div>
        <div className={Classnames(Style['item'], Style['middle'])}>
          <Map />
        </div>
        <div className={Classnames(Style['item'], Style['right'])}>
          <Road />
        </div>
      </div>
    )
  }
}