import React from 'react';
import ReactEcharts from '../../../../components/enhance-echarts-for-react/'
import Style from './style.module.scss';

export default class Economic extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <div className={Style['title']}>园区项目情况</div>
        <div className={Style['echarts-bar']}>
          <ReactEcharts
            style={{ height: '100%' }}
            option={{
              title: {
                text: '完成情况',
                textStyle: {
                  color: '#fff',
                  fontSize: window.$parseMultiple(24)
                },
                top: window.$parseMultiple(24) * 2,
                left: 0,
              },
              grid: {
                top: window.$parseMultiple(24) * (2 * 2 + 1),
                right: 0,
                bottom: 0,
                left: 0,
              },
              xAxis: {
                type: 'category',
                data: ['招商项目', '重大项目', ' PPP项目', '技改项目'],
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
              label: {
                formatter: '{c}'
              },
              series: [{
                data: [59, 21, 34, 73].map(value => {
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
                          { offset: 0, color: '#22E49D' },
                          { offset: 1, color: '#161A38' }
                        ],
                      },
                    }
                  }
                }),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                  color: '#151A36',
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowBlur: 5
                },
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