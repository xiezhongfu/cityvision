import React from 'react';
import Title from './title/';
import { addListener as addFrameListener } from '../../../components/frame-messagechannel/';
import { Statistic, StatisticList } from './statistic/';
import { ReactComponent as Icon } from './annual-total-icon.svg';
import Radarsvg from './radar-svg/';
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
            { title: '纳税总量', value: 60369.468, unit: '万元', per: '7.6%', status: 1 },// 1 表示上升; 0 表示下降
            { title: '银行贷款', value: 100615.78, unit: '万元', per: '5.6%', status: 0 },
            { title: '亩均 GDP', value: 21.32819926, unit: '万元', per: '4.7%', status: 1 },
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

    statisticListDataSources: [
      [
        { title: '工业总产值', value: 20123.156, unit: '万元', diffTitle: '增长率', diff: '3%', status: 0 },
        { title: '工业销售值', value: 24147.7872, unit: '万元', diffTitle: '增长率', diff: '1.6%', status: 0 },
      ],
      [
        { title: '工业总产值', value: 60369.468, unit: '万元', diffTitle: '增长率', diff: '5%', status: 1 },
        { title: '工业销售值', value: 72443.3616, unit: '万元', diffTitle: '增长率', diff: '3.4%', status: 1 },
      ],
      [
        { title: '工业总产值', value: 80492.624, unit: '万元', diffTitle: '增长率', diff: '3%', status: 1 },
        { title: '工业销售值', value: 96591.1488, unit: '万元', diffTitle: '增长率', diff: '2.8%', status: 1 },
      ],
      [
        { title: '工业总产值', value: 40246.312, unit: '万元', diffTitle: '增长率', diff: '2%', status: 1 },
        { title: '工业销售值', value: 48295.5744, unit: '万元', diffTitle: '增长率', diff: '2.6%', status: 1 },
      ]
    ]
  }

  removeInterval = null
  componentDidMount() {
    this.removeInterval = addFrameListener(() => {
      const { value } = this.state;
      const newValue = value === (this.state.statisticListDataSources.length - 1) ? 0 : value + 1;
      this.setState({ value: newValue });
    }, 4000);
  }
  componentWillUnmount() {
    this.removeInterval && this.removeInterval();
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
              dataSource={
                this.state.statisticListDataSources[this.state.value]
                // [
                //   { title: '工业总产值', value: 1014.3, unit: '亿元', diffTitle: '增长量', diff: 210.3, status: 1 },
                //   { title: '工业销售值', value: 1014.3, unit: '亿元', diffTitle: '增长量', diff: 210.3, status: 0 },
                // ]
              }
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
          {/* 怎么配置 echarts formater??? 跟设计稿一样 */}
          {/* echarts 的雷达图不能调整到和设计稿一致，换做 svg 实现 */}

          {/* TODO 因为 svg 元素位置不好调整的问题，并没有完全找产品提供的数据展示，status 功能也并没有实现，继续沿用 svg demo 的展示 */}
          <Radarsvg
            dataSource={[
              { title: '销售费用', value: 12073/* .8936 */, unit: '万元', diff: '2.3%', status: 0 },
              { title: '营收成本', value: 19318/* .22976 */, unit: '万元', diff: '3.4%', status: 0 },
              { title: '管理费用', value: 16903/* .45104 */, unit: '万元', diff: '4.0%', status: 1 },
              { title: '财务费用', value: 14488/* .67232 */, unit: '万元', diff: '13.0%', status: 1 },
              { title: '其他费用', value: 9659/* .11488 */, unit: '万元', diff: '3.5%', status: 1 },
            ]}
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