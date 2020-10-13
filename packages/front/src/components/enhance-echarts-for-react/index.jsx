import React from 'react';
// import ReactEcharts from 'echarts-for-react';
import { default as BaseReactEcharts } from 'echarts-for-react';
import echarts from 'echarts';
import echartsTheme from './echartsTheme';
echarts.registerTheme('tsingj-echarts-theme', echartsTheme);

/**
 * 挂载自定义的皮肤
 */
const ReactEcharts = React.forwardRef((props, ref) => (
  <BaseReactEcharts ref={ref} theme='tsingj-echarts-theme' {...props} />
));

export default ReactEcharts;