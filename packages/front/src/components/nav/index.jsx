import React from 'react';
import { withRouter } from "react-router";
// import { Route, Link } from "react-router-dom";
/* eslint-disable import/first */
import Style from './index.module.scss';
/* eslint-disable import/first */

class Nav extends React.PureComponent {
  render() {
    return (
      <div>左侧导航</div>
    );
  }
}

export default withRouter(Nav);