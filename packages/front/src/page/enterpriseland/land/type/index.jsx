import React from 'react';
import Tab from '../components/tab';
import ReactEcharts from '../../../../components/enhance-echarts-for-react/';
import Style from './style.module.scss';

const TYPES = [
  "一类物流仓储用地", "二类工业用地", "一类工业用地", "N 用地", "教育科研",
  "医疗卫生用地", "娱乐重体用地", "商业用地", "行政办公用地", "二类居住用地"
];
const VALUES = [
  150, 150, 200, 150, 150, 300,
  237, 530, 420, 347, 230, 150,
];
const MAX = 1000;

export default class Total extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <Tab />
        <ReactEcharts
          option={{
            grid: {
              left: 0,
              right: 0,
              bottom: 0,
            },
            xAxis: {
              type: 'value',
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
            },
            yAxis: [{
              type: 'category',
              data: TYPES,
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#fff',
                rotate: 0,
                fontSize: window.$parseMultiple(24)
              },
              axisLine: {
                show: false
              }
            },
            {
              type: 'category',
              position: 'right',
              data: VALUES,
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#fff',
                rotate: 0,
                fontSize: window.$parseMultiple(24)
              },
              axisLine: {
                show: false
              }
            }],
            series: [
              {
                type: 'bar',
                itemStyle: {
                  color: '#000000'
                },
                data: new Array(TYPES.length).fill(MAX),
                animation: false
              },
              {
                type: 'bar',
                barGap: '-100%',
                data: VALUES
              }
            ]
          }}
        />
      </div>
    );
  }
}