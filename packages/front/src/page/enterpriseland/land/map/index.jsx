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
              '二类居住',
              '行政办公',
              '商业',
              '娱乐康体',
              '医疗卫生',
              '教育科研',
              '一类工业',
              '二类工业',
              '一类物流仓储',
              '交通枢纽',
              '社会停车场',
              '市政公用设施',
              '防护绿地',
              '广场',
              '特殊',
            ].map((item, index) => (
              <li key={index}>{item}用地</li>
            ))
          }
        </ul>
      </div>
    );
  }
}