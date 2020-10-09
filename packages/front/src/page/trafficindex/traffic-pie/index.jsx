/**
 * 早晚高峰
 */
import React from 'react';
import Classnames from 'classnames';
import ReactEcharts from '../../../components/enhance-echarts-for-react/';
import Style from './style.module.scss';

// 环形图
// superOption 的结构和 option 的结构一致，方便透传数据
class Ring extends React.PureComponent {
  render() {
    const { option: superOption } = this.props;

    return (
      <ReactEcharts
        style={{ height: `${window.$parseMultiple(162.5)}` }}
        option={{
          title: {
            ...superOption.title,
            textStyle: {
              color: '#fff',
              fontSize: `${window.$parseMultiple(29)}`
            },
            top: 'middle',
            right: 0
          },
          series: superOption.series.map((current, index, array) => {
            return {
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: `${window.$parseMultiple(50)}`,
                  color: '#fff'
                }
              },
              labelLine: {
                show: false
              },
              data: current.data
            }
          })
        }}
      />
    )
  }
}

export default class TrafficPie extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <h4 className={Style['title']}>早晚高峰</h4>

        <div className={Classnames(Style['today'])}>
          <div>今日</div>
          <Ring
            option={{
              title: { text: '早高峰' },
              series: [{
                data: [
                  { value: 4.8, name: '4.8' },
                  { value: 5.2, name: '5.2' },
                ]
              }],
            }}
          />
          <Ring
            option={{
              title: { text: '晚高峰' },
              series: [{
                data: [
                  { value: 4.6, name: '4.6' },
                  { value: 5.4, name: '5.4' },
                ]
              }],
            }}
          />
        </div>
        
        <div className={Style['lastweek-period']}>
          <div>上周同期</div>
          <Ring
            option={{
              title: { text: '早高峰' },
              series: [{
                data: [
                  { value: 4.8, name: '4.8' },
                  { value: 5.2, name: '5.2' },
                ]
              }],
            }}
          />
          <Ring
            option={{
              title: { text: '晚高峰' },
              series: [{
                data: [
                  { value: 4.6, name: '4.6' },
                  { value: 5.4, name: '5.4' },
                ]
              }],
            }}
          />
        </div>
      </div>
    );
  }
}