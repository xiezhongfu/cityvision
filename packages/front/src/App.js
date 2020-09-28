import React from 'react';
import { HashRouter as Router, Switch, Route, /* useRouteMatch, useHistory, useLocation */ } from "react-router-dom";
import Nav from './components/nav/';
import TrafficIndex from './page/trafficindex/';
import DataCollect from './page/datacollect/';
import EnterpriseLand from './page/enterpriseland/';
import './App.scss';

function App() {
  return (
    <Router>
      {/*
        说明:
        页面比较少，直接使用 Switch 模式, path 使用固定的地址
      */}
      
      {/* 左侧导航 */}
      <Nav />
      <Switch>
        {/* 人流交通指数 */}
        <Route path="/trafficindex" render={() => <TrafficIndex />}></Route>

        {/* 安全及数据汇聚平台 */}
        <Route path="/datacollect" render={() => <DataCollect />}></Route>

        {/* 企业和土地大屏 */}
        <Route path="/enterpriseland" render={() => <EnterpriseLand />}></Route>
      </Switch>
    </Router>
  );
}

export default App;
