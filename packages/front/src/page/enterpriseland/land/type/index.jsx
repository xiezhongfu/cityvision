import React from 'react';
import Title from '../components/title/';
import { addListener as addFrameListener } from '../../../../components/frame-messagechannel/';
import SimpleTab from '../../../../components/simple-tab/';
import ReactEcharts from '../../../../components/enhance-echarts-for-react/';
import Style from './style.module.scss';

const TYPES = [
  "一类物流仓储用地", "二类工业用地", "一类工业用地", "N 用地", "教育科研",
  "医疗卫生用地", "娱乐重体用地", "商业用地", "行政办公用地", "二类居住用地"
];

const MAX = 1000;

export default class Total extends React.PureComponent {
  state = {
    value: 0,

    statisticListDataSources: [
      [
        800, 530, 797, 350, 350,
        370, 205, 423, 275, 750,
      ],
      [
        500, 150, 420, 150, 347,
        300, 237, 530, 200, 347,
      ],
      [
        300, 150, 150, 150, 150,
        300, 237, 250, 420, 147,
      ],
      [
        150, 150, 200, 150, 150,
        300, 237, 530, 420, 347,
      ],
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
    const VALUES = this.state.statisticListDataSources[this.state.value];

    return (
      <div className={Style['container']}>
        <Title>土地类型</Title>
        <SimpleTab
          value={this.state.value}
          dataSource={['一', '二', '三', '四'].map(i => `${i}季度`)}
          onItemClick={(item, value) => {
            this.setState({ value });
          }}
        />
        <div className={Style['echarts']}>
          <ReactEcharts
            style={{ height: '100%' }}
            option={{
              grid: {
                left: 0,
                right: 0,
                bottom: 0,
              },
              xAxis: {
                type: 'value',
                splitLine: {
                  show: false,
                },
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
              },
              yAxis: [{
                type: 'category',
                data: TYPES,
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#fff',
                  rotate: 0,
                  fontSize: window.$parseMultiple(24)
                },
                axisLine: {
                  show: false
                }
              },
              {
                type: 'category',
                position: 'right',
                data: VALUES,
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#fff',
                  rotate: 0,
                  fontSize: window.$parseMultiple(24)
                },
                axisLine: {
                  show: false
                }
              }],
              series: [
                {
                  type: 'bar',
                  itemStyle: {
                    color: '#151A36',
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 5
                  },
                  data: new Array(TYPES.length).fill(MAX),
                  animation: false
                },
                {
                  type: 'bar',
                  barGap: '-100%',
                  data: VALUES
                }
              ]
            }}
          />
        </div>
      </div>
    );
  }
}