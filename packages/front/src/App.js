import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect, /* useRouteMatch, useHistory, useLocation */ } from "react-router-dom";

/* eslint-disable import/first */
import Layout from './components/layout/';
const { Sider, Content } = Layout;
import Logo from './components/logo/';
import SimpeleNav from './components/nav/';

import TrafficIndex from './page/trafficindex/';
import DataCollect from './page/datacollect/';
import EnterpriseLand from './page/enterpriseland/';
import './App.module.scss';
/* eslint-disable import/first */

function App() {
  return (
    <Layout>
      <Router>
        {/*
          说明:
          页面比较少，直接使用 Switch 模式, path 使用固定的地址
        */}

        {/* 左侧导航 */}
        <Sider>
          <Logo />
          <SimpeleNav />
        </Sider>

        <Content>
          <Switch>
            <Route exact path="/">
              <Redirect to={{ pathname: "/trafficindex" }} />
            </Route>


            {/* 人流交通指数 */}
            <Route path="/trafficindex" render={() => <TrafficIndex />}></Route>

            {/* 安全及数据汇聚平台 */}
            <Route path="/datacollect" render={() => <DataCollect />}></Route>

            {/* 企业和土地大屏 */}
            <Route path="/enterpriseland" render={() => <EnterpriseLand />}></Route>

            <Route path="*">
              <Redirect to={{ pathname: "/trafficindex" }} />
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
