import React from 'react';
import Classnames from 'classnames';
import Style from './style.module.scss';

export default class SimpleTab extends React.PureComponent {
  render() {
    const { value, dataSource, onItemClick = () => { } } = this.props;
    
    return (
      <ul className={Style['list']}>
        {
          dataSource.map((item, index) => (
            <li
              key={item}
              className={Classnames({
                [Style['current']]: value === index
              })}
              onClick={() => {
                onItemClick(item, index);
              }}
            >{item}</li>
          ))
        }
      </ul>
    );
  }
}

export class SimpleVerticalTab extends React.PureComponent {
  render() {
    const { value, dataSource, onItemClick = () => { } } = this.props;
    
    return (
      <ul className={Style['list-vertical']}>
        {
          dataSource.map((item, index) => (
            <li
              key={item}
              className={Classnames({
                [Style['current']]: value === index
              })}
              onClick={() => {
                onItemClick(item, index);
              }}
            >{item}</li>
          ))
        }
      </ul>
    );
  }
}