import React from 'react';
import { ReactComponent as BaseMap } from './map.svg';
import { ReactComponent as TitleBackground } from './title.svg';
import Style from './style.module.scss';

export default class Map extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <div className={Style['map']}>
          <BaseMap />
          <TitleBackground className={Style['title']} />
        </div>
        <ul className={Style['legend']}>
          {
            [
              '园区综合服务区',
              '园区综合服务区',
              '消费生活区',
              '化工产业区',
              '装备制造业产区',
              '仓储物流区',
              '高科技产业区'
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}