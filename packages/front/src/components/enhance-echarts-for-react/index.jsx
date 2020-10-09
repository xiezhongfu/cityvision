import React from 'react';
// import ReactEcharts from 'echarts-for-react';
import { default as BaseReactEcharts } from 'echarts-for-react';
import echarts from 'echarts';
import echartsTheme from './echartsTheme';
echarts.registerTheme('tsingj-echarts-theme', echartsTheme);

/**
 * 挂载自定义的皮肤
 */
export default class ReactEcharts extends React.PureComponent{
  render(){
    return (
      <BaseReactEcharts theme='tsingj-echarts-theme' {...this.props} />
    )
  }
}