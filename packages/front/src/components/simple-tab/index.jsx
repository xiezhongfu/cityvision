import React from 'react';
import Classnames from 'classnames';
import Style from './style.module.scss';

export default class SimpleTab extends React.PureComponent {
  render() {
    const { value, dataSource, onItemClick = () => { } } = this.props;
    console.log(value);
    return (
      <ul className={Style['list']}>
        {
          dataSource.map((item, index) => (
            <li
              key={item}
              className={Classnames({
                [Style['current']]: value == index
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