import React from 'react';
import ReactEcharts from '../../../../components/enhance-echarts-for-react/'
import Style from './style.module.scss';

export default class Economic extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <div className={Style['title']}>园区经济运行情况</div>
        <div className={Style['react-echarts']}>
          <ReactEcharts
            style={{ height: '100%' }}
            option={{
              title: {
                text: '123456.7',
                subtext: 'GDP营收/万元',
                textStyle: {
                  color: '#22E49D',
                  fontSize: window.$parseMultiple(60)
                },
                subtextStyle: {
                  color: '#fff',
                  fontSize: window.$parseMultiple(24)
                },
                left: 0,
                top: 'middle',
              },
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
                  data: [
                    { value: 0.50, name: '第一产业' },
                    { value: 0.25, name: '第二产业' },
                    { value: 0.25, name: '第三产业' }
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
        {/* 有 icon 为填入，需要跟设计师沟通，重新切图 */}
        <ul className={Style['legend']}>
          {
            [
              { value: 653.2, title: '投资', subTitle: '(亿人民币)' },
              { value: 374.9, title: '固定资产', subTitle: '(亿人民币)' },
              { value: 82760, title: '员工人数', subTitle: '(人)' },
            ].map(item => {
              return (
                <li key={item.title}>
                  <div className={Style['item-title']}>{item.value}</div>
                  <div className={Style['item-sub-title']}>{item.subTitle}</div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}