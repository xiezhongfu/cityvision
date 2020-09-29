import React from 'react';
import { NavLink } from "react-router-dom";
import Style from './style.module.scss';

function WrapNavLink(props) {
  const { children, ...rest } = props;
  return <NavLink activeClassName={Style['selected']} {...rest}>{children}</NavLink>
}

export default class SimpeleNav extends React.PureComponent {
  render() {
    return (
      <ul className={Style['simpele-nav']}>
        <li><WrapNavLink to="/trafficindex">人流交通指数</WrapNavLink></li>
        <li><WrapNavLink to="/datacollect">安全及数据汇聚平台</WrapNavLink></li>
        <li><WrapNavLink to="/enterpriseland">企业和土地大屏</WrapNavLink></li>
      </ul>
    );
  }
}