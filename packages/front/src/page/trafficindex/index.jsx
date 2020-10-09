import React from 'react';
import TrafficPie from './traffic-pie/';
import TrafficLine from './traffic-line/';

export default class TrafficIndex extends React.PureComponent {
  render() {
    return (
      <div>
        <TrafficPie />
        <TrafficLine />
      </div>)
  }
}