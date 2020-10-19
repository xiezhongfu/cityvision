import React from 'react';
import Style from './style.module.scss';

export default class BottomLegend extends React.PureComponent {
  render() {
    return (
      <ul className={Style['legend']}>
        {/* TODO: 重大隐患等提示 */}
        {
          [
            { name: '核心商务', value: 10, unit: '个', icon: require('./business.svg') },
            { name: '综合消费', value: 10, unit: '个', icon: require('./consumption.svg') },
            { name: '化工产业', value: 10, unit: '个', icon: require('./chemical.svg') },
            { name: '装备制造', value: 10, unit: '个', icon: require('./equipment.svg') },
            { name: '仓储物流', value: 10, unit: '个', icon: require('./express.svg') },
          ].map((item, index) => {
            const { name, value, unit, icon, } = item;
            return (
              <li key={index}>
                <div className={Style['icon']} style={{ backgroundImage: `url(${icon})`}}></div>
                <div className={Style['name']}>{name}</div>
                <div className={Style['value']}>
                  <span>{value}</span>
                  <span>{unit}</span>
                </div>
              </li>
            );
          })
        }
      </ul>
    );
  }
}