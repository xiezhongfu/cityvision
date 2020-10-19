import React from 'react';
import Title from './title/';
import { Statistic, StatisticList } from './statistic/';
import { ReactComponent as Icon } from './annual-total-icon.svg';
import ReactEcharts from '../../../components/enhance-echarts-for-react/';
import SimpleTab from '../../../components/simple-tab/';
import Style from './style.module.scss';

// 园区经济运行情况
class Economic extends React.PureComponent {
  render() {
    return (
      <div className={Style['economic-container']}>
        <Title>园区经济运行情况</Title>
        <Statistic
          dataSource={[
            { title: '纳税总量', value: 1014.3, unit: '亿元', per: '10.3%', status: 1 },// 1 表示上升; 0 表示下降
            { title: '银行贷款', value: 1014.3, unit: '亿元', per: '10.3%', status: 1 },
            { title: '亩均 GDP', value: 1014.3, unit: '亿元', per: '10.3%', status: 0 },
          ]}
        />
      </div>
    );
  }
}
// 年度工业产销总量
class AnnualTotal extends React.PureComponent {
  state = {
    value: 0,
  }

  render() {
    return (
      <div className={Style['annual-total-container']}>
        <Title>年度工业产销总量</Title>

        <div className={Style['data-container']}>
          <Icon className={Style['data-icon']} />
          <div className={Style['data-list']}>
            <SimpleTab
              value={this.state.value}
              dataSource={['一', '二', '三', '四'].map(i => `${i}季度`)}
              onItemClick={(item, value) => {
                this.setState({ value });
              }}
            />
            <StatisticList
              dataSource={[
                { title: '工业总产值', value: 1014.3, unit: '亿元', diffTitle: '增长量', diff: 210.3, status: 1 },
                { title: '工业销售值', value: 1014.3, unit: '亿元', diffTitle: '增长量', diff: 210.3, status: 0 },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}
// 年度成本
class AnnualCost extends React.PureComponent {
  render() {
    return (
      <div className={Style['annual-container']}>
        <Title>年度成本</Title>
        <div className={Style['echarts']}>
          {/* 怎么配置 formater??? 跟设计稿一样 */}
          <ReactEcharts
            style={{height: '100%' }}
            option={{
              grid: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
              radar: {
                radius: ['50%', '70%'],
                name: {
                  formatter: '{value}',
                  textStyle: {
                    color: '#fff',
                    fontSize: window.$parseMultiple(22)
                  },
                },
                axisLine: {
                  show: false,
                },
                splitLine: {
                  show: false,
                },
                splitArea: {
                  areaStyle: {
                    // color: ['#22E49E','#22E49E'],
                    // color: ['#151a37'],
                  },
                },
                indicator: [
                  { name: '销售费用', max: 50000 },
                  { name: '营收成本', max: 50000 },
                  { name: '管理费用', max: 50000 },
                  { name: '其他费用', max: 50000 },
                  { name: '财务费用', max: 50000 },
                ]
              },
              series: [{
                type: 'radar',
                label: {
                  show: true,
                  // position: 'insideBottomRight',
                  formatter: '{c} 亿元',
                  fontSize: window.$parseMultiple(54),
                  fontWeight: 'bold',
                },
                data: [
                  { value: [4300, 10000, 28000, 35000, 50000], },
                ],
              }]
            }}
          />
        </div>
      </div>
    );
  }
}

export default class EnterpriseLand extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <Economic />
        <AnnualTotal />
        <AnnualCost />
      </div>
    )
  }
}