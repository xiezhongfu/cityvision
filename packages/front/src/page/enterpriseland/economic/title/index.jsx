import React from 'react';
import Style from './style.module.scss';

export default class Title extends React.PureComponent {
  render() {
    return (
      <h4 className={Style['title']}>{this.props.children}</h4>
    );
  }
}