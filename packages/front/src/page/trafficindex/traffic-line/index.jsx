/**
 * 交通指数变化
 */
import React from 'react';
import ReactEcharts from '../../../components/enhance-echarts-for-react/';
import { getSafeRandom } from '../../../components/random/';
import Style from './style.module.scss';

const TIMES = ['18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14: 00', '16:00'];
const VALUES = getSafeRandom(TIMES.length).map(i => i * 10);
const FONT_SIZE = window.$parseMultiple(27);

export default class TrafficLine extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <ReactEcharts
          style={{ height: '100%' }}
          option={{
            title: {
              text: '交通指数变化',
              textStyle: {
                color: '#fff',
                fontSize: window.$parseMultiple(38)
              },
              padding: [
                window.$parseMultiple(54),
                0,
                0,
                0,
              ]
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
              }
            },
            grid: {
              show: false,
              top: window.$parseMultiple(54 + 38 * 2),// 恰好流出标题字体大小的空间，和1倍字体大小的间距
              right: window.$parseMultiple(91),
              bottom: window.$parseMultiple(54),
              left: window.$parseMultiple(91),
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: TIMES,
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: true,
                  color: '#fff',
                  fontSize: FONT_SIZE
                },
                splitLine: {
                  show: true,
                  lineStyle:{
                    color: '#C8B4E7',
                    shadowColor: '#1B2143',
                    shadowBlur: 10
                  }
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                offset: 10,
                show: true,
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#fff',
                  fontSize: FONT_SIZE
                },
                splitLine: {
                  show: true,
                  lineStyle:{
                    color: '#C8B4E7',
                    shadowColor: '#1B2143',
                    shadowBlur: 10
                  }
                }
              }
            ],
            series: [
              {
                name: '交通指数变化',
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
                data: VALUES
              },
            ]
          }}
        />
      </div>
    )
  }
}