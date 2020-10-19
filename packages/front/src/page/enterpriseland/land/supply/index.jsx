import React from 'react';
import Tab from '../components/tab';
import ReactEcharts from '../../../../components/enhance-echarts-for-react';
import Style from './style.module.scss';

export default class Supply extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <Tab />
        <div className={Style['react-echarts']}>
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
                  // radius: ['5%', '15%'],// 小屏开发测试
                  label: {
                    formatter: '{c} {per|{d}%} \n\n{hr|}\n\n {b|{b}\n(平方公里)}',
                    rich: {
                      c: {
                        fontSize: window.$parseMultiple(21),
                      },
                      hr: {
                        borderWidth: 0.5,
                        borderColor: '#aaa',
                        height: 0,
                        width: '100%',
                      },
                      b: {
                        fontSize: window.$parseMultiple(21),
                        color: '#70779B'
                      },
                      per: {
                        fontSize: window.$parseMultiple(31),
                      }
                    }
                  },
                  data: [
                    { value: 50, name: '待收储' },
                    { value: 25, name: '已收储' },
                    { value: 25, name: '已使用' }
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
      </div>
    );
  }
}