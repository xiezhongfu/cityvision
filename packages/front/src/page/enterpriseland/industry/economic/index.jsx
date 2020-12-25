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
                text: '201231.56',
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
                    { value: 0.2, name: '第一产业' },
                    { value: 0.3, name: '第二产业' },
                    { value: 0.5, name: '第三产业' }
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
        {/* TODO */}
        {/* 有 icon 未填入，需要跟设计师沟通，重新切图 */}
        <ul className={Style['legend']}>
          {
            [
              { value: 77910.24, icon: [require('./disk.svg'), require('./investment.svg')], title: '投资', subTitle: '(万人民币)' },
              { value: 123321.32, icon: [require('./disk.svg'), require('./assets.svg')], title: '固定资产', subTitle: '(万人民币)' },
              { value: 537643, icon: [require('./disk.svg'), require('./person.svg')], title: '员工人数', subTitle: '(人)' },
            ].map(item => {
              const [afterIcon, beforeIcon] = item.icon;
              return (
                <li key={item.title}>
                  <div className={Style['item-title']}>
                    <div style={{ backgroundImage: `url(${beforeIcon})` }}></div>
                    <div>
                      {item.value}
                    </div>
                    <div style={{ backgroundImage: `url(${afterIcon})` }}></div>
                  </div>
                  <div className={Style['item-sub-title']}>{item.title}<br />{item.subTitle}</div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}