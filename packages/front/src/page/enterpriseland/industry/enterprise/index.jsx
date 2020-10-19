import React from 'react';
import ReactEcharts from '../../../../components/enhance-echarts-for-react/'
import Style from './style.module.scss';

export default class Economic extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <div className={Style['title']}>园区企业情况</div>
        <div className={Style['echarts-pie']}>
          <ReactEcharts
            style={{ height: '100%' }}
            option={{
              grid: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
              series: [
                {
                  type: 'pie',
                  radius: ['65%', '85%'],
                  // radius: ['5%', '10%'],// 为了小屏测试方便
                  label: {
                    formatter: '{c|{c}亿元}\n{hr|}\n{b|{b}}  {per|{d}%}  ',
                    // backgroundColor: '#eee',
                    // borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                      c: {
                        fontSize: window.$parseMultiple(21),
                        color: '#fff',
                      },
                      hr: {
                        borderColor: '#aaa',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                      },
                      b: {
                        fontSize: window.$parseMultiple(21),
                        color: '#70779B',
                        padding: [2, 4],
                      },
                      per: {
                        fontSize: window.$parseMultiple(21),
                        color: '#70779B',
                        padding: [2, 4],
                      },
                      d: {
                        fontSize: window.$parseMultiple(21),
                        color: '#70779B',
                        padding: [2, 4],
                      },
                    },
                  },
                  data: [
                    { value: 4113.2, name: 'A 类' },
                    { value: 4113.2, name: 'B 类' },
                    { value: 4113.2, name: 'C 类' }
                  ],
                  clockwise: false,
                  itemStyle: {
                    shadowColor: '#fff',
                    shadowBlur: 2,
                  },
                }
              ]
            }}
          />
        </div>
        <div className={Style['echarts-bar']}>
          <ReactEcharts
            style={{ height: '100%' }}
            option={{
              grid: {
                top: window.$parseMultiple(34) * 2,
                right: 0,
                bottom: 0,
                left: 0,
              },
              xAxis: {
                type: 'category',
                data: ['50亿以下', '50-100亿以上', '100-200亿以上', '500亿以上'],
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                },
                axisLabel: {
                  color: '#fff',
                },
              },
              yAxis: {
                type: 'value',
                splitLine: {
                  show: false,
                },
              },
              // color: ['#3AFFEF'],
              label: {
                formatter: '{c} 家'
              },
              series: [{
                type: 'bar',
                data: [400, 300, 400, 400].map(value => {
                  return {
                    value,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          { offset: 0, color: '#3AFFEF' },
                          { offset: 1, color: '#161A38' }
                        ],
                      },
                    }
                  }
                }),
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    color: '#fff',
                    fontSize: window.$parseMultiple(34)
                  }
                },
              }]
            }}
          />
        </div>
      </div>
    );
  }
}