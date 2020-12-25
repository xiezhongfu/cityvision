import React from 'react';
import uuid from 'uuid';
import { ReactLocation as Location } from '../../../../components/location/';
import { addListener as addFrameListener } from '../../../../components/frame-messagechannel/';
import { ReactComponent as BaseMap } from './map.svg';
import { ReactComponent as TitleBackground } from './title.svg';
import Style from './style.module.scss';

const DATA_SOURCE = [
  { name: '二类居住用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-a" value="二类居住用地" /> },
  { name: '行政办公用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-b" value="行政办公用地" /> },
  { name: '商业用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-c" value="商业用地" /> },
  { name: '娱乐康体用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-d" value="娱乐康体用地" /> },
  { name: '医疗卫生用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-e" value="医疗卫生用地" /> },
  { name: '教育科研用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-f" value="教育科研用地" /> },
  { name: '一类工业用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-g" value="一类工业用地" /> },
  { name: '二类工业用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-h" value="二类工业用地" /> },
  { name: '一类物流仓储用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-i" value="一类物流仓储用地" /> },
  { name: '交通枢纽用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-j" value="交通枢纽用地" /> },
  { name: '社会停车场用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-k" value="社会停车场用地" /> },
  { name: '市政公用设施用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-l" value="市政公用设施用地" /> },
  { name: '防护绿地用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-m" value="防护绿地用地" /> },
  { name: '广场用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-n" value="广场用地" /> },
  { name: '特殊用地', children: <Location key={uuid()} positionId="page-3-rightMap-pop-o" value="特殊用地" /> },
];

export default class Map extends React.PureComponent {
  state = {
    selected: 0
  }
  legendDataSource = DATA_SOURCE.map(item => item.name)

  removeInterval = null
  componentDidMount() {
    this.removeInterval = addFrameListener(() => {
      const { selected } = this.state;
      const newSelected = selected === (this.legendDataSource.length - 1) ? 0 : selected + 1;
      this.setState({ selected: newSelected });
    }, 4000);
  }
  componentWillUnmount() {
    this.removeInterval && this.removeInterval();
  }

  render() {
    const { selected } = this.state;
    const { children: MapPopup } = DATA_SOURCE[selected];

    return (
      <div className={Style['container']}>
        <div className={Style['map']}>
          <BaseMap />
          <TitleBackground className={Style['title']} />
          {/* 地图上的 pop */}
          {MapPopup}
        </div>
        <ul className={Style['legend']}>
          {
            this.legendDataSource.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  this.setState({ selected: index });
                }}
              >{item}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}