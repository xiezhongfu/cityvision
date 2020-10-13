/**
 * 交通指数变化
 */
import React from 'react';
import ReactEcharts from '../../../components/enhance-echarts-for-react/';
import Style from './style.module.scss';

export default class TrafficLine extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <ReactEcharts
          style={{ height: '100%' }}
          option={{
            title: {
              text: '交通指数变化指数',
              textStyle: {
                color: '#fff',
                fontSize: `${window.$parseMultiple(29)}`
              },
              top: 0,
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
              }
            },
            grid: {
              show: true,
              backgroundColor: 'rgba(17, 21, 47, 0.25)'
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14: 00', '16:00'],
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#fff'
                },
                splitLine:{
                  show: true
                }
              },
            ],
            yAxis: [
              {
                type: 'value',
                offset: 10,
                show: true,
                axisLine: {
                  show: true
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#fff'
                }
              }
            ],
            series: [
              {
                name: '交通指数变化指数',
                type: 'line',
                areaStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#47ECC0' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#160E23' // 100% 处的颜色
                    }],
                  }
                },
                data: [120, 132, 101, 134, 90, 230, 210, 210, 210, 210, 210, 210]
              },
            ]
          }}
        />
      </div>
    )
  }
}