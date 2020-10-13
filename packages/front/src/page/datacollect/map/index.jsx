import React from 'react';
import { ReactComponent as BaseMap } from './map.svg';
import Style from './style.module.scss';

export default class Map extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <BaseMap />
      </div>
    )
  }
}