import React from 'react';
import uuid from 'uuid';
import { ReactLocation as Location } from '../../../components/location/';
import { addListener as addFrameListener } from '../../../components/frame-messagechannel/';
import Map from './map/';
import Economic from './economic/';
import Enterprise from './enterprise/';
import Project from './project/';
import Style from './style.module.scss';

function PopupRender({ enterprise, employees, project }) {
  return (
    <ul>
      <li>企业数量: {enterprise} 家</li>
      <li>员工人数: {employees} 人</li>
      <li>项目数量: {project} 人</li>
    </ul>
  );
}

const DATA_SOURCE = [
  { name: '园区综合服务区', children: <Location key={uuid()} positionId="page-3-leftMap-pop-a" value={<PopupRender enterprise={27} employees={'2,100'} project={34} />} /> },
  { name: '园区综合服务区', children: <Location key={uuid()} positionId="page-3-leftMap-pop-b" value={<PopupRender enterprise={32} employees={'15,134'} project={58} />} /> },
  { name: '消费生活区', children: <Location key={uuid()} positionId="page-3-leftMap-pop-c" value={<PopupRender enterprise={12} employees={'2,271'} project={76} />} /> },
  { name: '化工产业区', children: <Location key={uuid()} positionId="page-3-leftMap-pop-d" value={<PopupRender enterprise={5} employees={'5,309'} project={21} />} /> },
  { name: '装备制造业产区', children: <Location key={uuid()} positionId="page-3-leftMap-pop-e" value={<PopupRender enterprise={12} employees={'70,210'} project={34} />} /> },
  { name: '仓储物流区', children: <Location key={uuid()} positionId="page-3-leftMap-pop-f" value={<PopupRender enterprise={8} employees={468} project={'1,281'} />} /> },
  { name: '高科技产业区', children: <Location key={uuid()} positionId="page-3-leftMap-pop-g" value={<PopupRender enterprise={52} employees={'75,602'} project={'7,892'} />} /> },
];

export default class Industry extends React.PureComponent {
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
        {/* 地图 */}
        <div className={Style['map']}>
          <Map
            legendSource={this.legendDataSource}
            legendOnChange={(item, selected) => {
              this.setState({ selected });
            }}
          />
          {/* 地图上的 pop */}
          {MapPopup}

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