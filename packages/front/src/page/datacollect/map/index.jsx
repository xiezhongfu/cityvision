import React from 'react';
import { ReactComponent as BaseMap } from './map.svg';
import Statistic from './statistic/';
import Style from './style.module.scss';

export default class Map extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <div className={Style['map']}>
          <div className={Style['svg-map']}>
            <BaseMap className={Style['svg']} />
            <ul className={Style['tip']}>
              {
                ['预警企业', '产业园', '区域', '区域', '区域'].map((i, index) => (
                  <li key={index}>{i}</li>
                ))
              }
            </ul>
          </div>
          <Statistic />
        </div>
        
        <ul className={Style['right-legend']}>
          {
            [
              { name: '高警处置率', value: '80.9%', icon: require('./alarm-handl-rate.svg') },
              { name: '重大隐患（次）', value: '16', icon: require('./major-hidden-danger.svg') },
              { name: '一般隐患（次）', value: '361', icon: require('./general-hidde-danger.svg') },
              { name: '巡检次数（次）', value: '165', icon: require('./inspection-times.svg') },
              { name: '联网单位（次）', value: '365', icon: require('./networking-unit.svg') },
              { name: '监控设备（次）', value: '836', icon: require('./monitoring-equipment.svg') },
              { name: '监管设备（次）', value: '8000', icon: require('./regulatory-equipment.svg') },
              { name: '设备完好度', value: '99.6%', icon: require('./equipment-integrity-rate.svg') },
            ].map((current, index) => {
              const { name, value, icon } = current;
              return (
                <li key={name}>
                  <div className={Style['item']}>
                    <div className={Style['icon']}><img alt={name} src={icon} /></div>
                    <div className={Style['desc']}>
                      <h4>{value}</h4>
                      <p>{name}</p>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    )
  }
}