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
  ref = React.createRef()

  componentDidMount() {
    const { current: echarts_react } = this.ref;
    const echarts_instance = echarts_react.getEchartsInstance();
    // 因为要使用高亮不能在配置项开启 silent
    // 使用 css 属性 pointer-events 禁用了 echarts 图层的鼠标事件
    // 使用 api 始终高亮第一个
    echarts_instance.dispatchAction({
      type: 'highlight',
      dataIndex: 0,
    });
  }
  render() {
    const { option: superOption } = this.props;

    return (
      <ReactEcharts
        ref={this.ref}
        style={{ height: `${window.$parseMultiple(163)}px`, pointerEvents: 'none'}}
        option={{
          title: {
            ...superOption.title,
            textStyle: {
              color: '#EADAFF',
              fontSize: window.$parseMultiple(29),
            },
            top: 'middle',
            right: 0
          },
          grid:{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          series: superOption.series.map((current, index, array) => {
            return {
              cursor: 'default',
              type: 'pie',
              radius: ['75%', '95%'],
              clockwise: false,
              hoverOffset: 2,
              label: {
                show: true,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: window.$parseMultiple(50),
                  color: '#fff'
                },
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
                  { value: 4.6, name: '4.6', },
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