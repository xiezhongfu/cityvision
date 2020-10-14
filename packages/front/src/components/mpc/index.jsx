import React from 'react';
import Classnames from 'classnames';
import Style  from './style.module.scss';

export default class MPC extends React.PureComponent {
  render() {
    return (
      <ul className={Classnames(Style['tip'], this.props.className)}>
        <li>MPC</li>
        <li>交委<br />数据</li>
        <li>网约车</li>
        <li>手机<br />信令</li>
        {
          new Array(3).fill(0).map((current, index) =>  <li key={index}>+</li>)
        }
      </ul>
    );
  }
}