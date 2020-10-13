import React from 'react';
import Video from './video/'
import Style from './style.module.scss';

export default class DataCollect extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        {/* <div className={Style['map']}></div> */}
        <Video />
      </div>
    )
  }
}