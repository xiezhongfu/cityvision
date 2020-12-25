import React from 'react';
import Title from '../components/title/'
import SimpleTab from '../../../../components/simple-tab/';
import ReactEcharts from '../../../../components/enhance-echarts-for-react';
import { addListener as addFrameListener } from '../../../../components/frame-messagechannel/';
import Style from './style.module.scss';

export default class Supply extends React.PureComponent {
  state = {
    value: 0,

    statisticListDataSources: [
      [
        { value: 205, name: '待收储' },
        { value: 370, name: '已收储' },// 规划中
        { value: 350, name: '已使用' }// 建设中
      ],
      [
        { value: 350, name: '待收储' },
        { value: 797, name: '已收储' },
        { value: 530, name: '已使用' }
      ],
      [
        { value: 750, name: '待收储' },
        { value: 275, name: '已收储' },
        { value: 423, name: '已使用' }
      ],
      [
        { value: 797, name: '待收储' },
        { value: 530, name: '已收储' },
        { value: 800, name: '已使用' }
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
    const dataSource = this.state.statisticListDataSources[this.state.value];

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
                  data: dataSource /* [
                    { value: 50, name: '待收储' },
                    { value: 25, name: '已收储' },
                    { value: 25, name: '已使用' }
                  ] */,
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