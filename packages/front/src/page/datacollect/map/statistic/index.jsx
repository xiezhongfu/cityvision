import React from 'react';
import Classnames from 'classnames';
import Style from './style.module.scss';

export default class Statistic extends React.PureComponent {
  isSelected = (selectedValue, index) => {
    return selectedValue === index
  }
  selectedBackgroundImage = (selectedValue, index, iconSource) => {
    const selected = this.isSelected(selectedValue, index);
    if (selected) {
      return Array.isArray(iconSource) ? iconSource[1] || iconSource[0] : iconSource;
    }
    return Array.isArray(iconSource) ? iconSource[0] : iconSource;
  }

  render() {
    const { dataSource, tipSource, value: selectedValue, onChange } = this.props;

    return (
      <ul className={Style['legend']}>
        <li className={Style['tip']}>
          <div className={Style['icon']} style={{ backgroundImage: `url(${tipSource.icon})` }}></div>
          <div className={Style['name']}>{tipSource.name}</div>
        </li>

        {
          dataSource.map((item, index) => {
            const { name, value, unit, icon, } = item;
            return (
              <li
                key={index}
                onClick={() => {
                  onChange(index);
                }}
                className={Classnames({ [Style['selected']]: this.isSelected(selectedValue, index) })}
              >
                <div className={Style['icon']}
                  style={{ backgroundImage: `url(${this.selectedBackgroundImage(selectedValue, index, icon)})` }}
                ></div>
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