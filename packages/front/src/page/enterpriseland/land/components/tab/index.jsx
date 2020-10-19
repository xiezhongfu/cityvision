import React from 'react';
import Style from './style.module.scss';

export default class Total extends React.PureComponent {
  render() {
    return (
      <ul className={Style['container']}>
        {
          ['一', '二', '三', '四'].map(item => (
            <li key={item}>{item}季度</li>
          ))
        }
      </ul>
    );
  }
}