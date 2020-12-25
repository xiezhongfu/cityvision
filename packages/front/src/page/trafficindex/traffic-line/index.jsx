/**
 * 交通指数变化
 */
import React from 'react';
import ReactEcharts from '../../../components/enhance-echarts-for-react/';
import { addListener as addFrameListener } from '../../../components/frame-messagechannel/';
import { getSafeRandom, getRandomValuesLimitedRange } from '../../../components/random/';
import Style from './style.module.scss';

/**
 * 交通指数的范围是[0, 10)，子分区范围如下
 * 等级1    通畅:     [0, 2)
 * 等级2    基本通畅: [2, 4)
 * 等级3    缓行:    [4, 6)
 * 等级4    较拥堵:    [6, 8)
 * 等级5    拥堵:    [8, 10)
 * 
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 产品要求：大多数情况是都是通畅的，近乎是直线，偶尔有拥堵的情况
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 
 * getSafeRandom，安全的返回 [0, 1) 的随机数数据。为了简单模拟"真实"情况，让随机产生的数据，大概率(95%)会落在到 [0, 0.2），小概率(5%)会落在[0.4, 0.8)
 * 为什么是 大概率(95%)，小概率(5%)。这些个比例完全是"拍脑袋"决定的。但在数理统计中，5% 属于误差范围内，！！！以误差的概率来体现“交通不怎么堵，只是偶尔拥堵那么一下下，完全可以忽略不计，来满足产品经理的要求”！！！
 * 
 * 调用 getSafeRandom 返回的数值在 0 -> 0.65 就再次调用 getRandomValuesLimitedRange(1, 0, 0.2) 返回 [0, 0.2）
 * 调用 getSafeRandom 返回的数值在 0.65 -> 1 就再次调用 getRandomValuesLimitedRange(1, 0.4, 8) 返回 [0.7, 1)
 * 
 * 然后把 [0, 0.2）区间当成是 2(通畅) 的随机偏移量区间，让折线近乎是直线的效果
 *       [0.4, 0.8) 区间就直接乘以 10(最大值)，让这个点比较突出的显示
 */


const MAX_VALUE = 10;
// 横坐标，本来需要横坐标也需要随时间变化，产品要求把横坐标隐藏，简化后这样就可以不用更新时间了
// 并禁止了 tooltip 防止出现假的横坐标
// !!!在给客户解释的时候，强行解释为24小时!!!
const TIMES = ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22: 00', '24:00'];
function generate(length = TIMES.length, max = MAX_VALUE, base = 2) {
  return (new Array(length)).fill(0).map(() => {
    const [type] = getSafeRandom(1);

    if (type < 0.65) {
      return base - getRandomValuesLimitedRange(1, 0, 0.2).shift() * 1;
    } else {
      return getRandomValuesLimitedRange(1, 0.4, 0.8).shift() * max;
    }
  });
}

const FONT_SIZE = window.$parseMultiple(27);

export default class TrafficLine extends React.PureComponent {
  state = {
    values: generate()
  }
  removeInterval = null

  componentDidMount() {
    this.removeInterval = addFrameListener(() => {
      const { values: pre } = this.state;
      const values = [...pre.slice(1), ...generate(1)];
      this.setState({ values });
    }, 4000);
  }

  componentWillUnmount() {
    this.removeInterval && this.removeInterval();
  }
  render() {
    const { values: VALUES } = this.state;
    return (
      <div className={Style['container']}>
        <ReactEcharts
          style={{ height: '100%' }}
          option={{
            title: {
              text: '交通指数变化',
              textStyle: {
                color: '#fff',
                fontSize: window.$parseMultiple(38)
              },
              padding: [
                window.$parseMultiple(54),
                0,
                0,
                0,
              ]
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
              },
              show: false// 禁止 tooltip 防止出现假的横坐标的提示
            },
            grid: {
              show: false,
              top: window.$parseMultiple(54 + 38 * 2),// 恰好流出标题字体大小的空间，和1倍字体大小的间距
              right: window.$parseMultiple(91),
              bottom: window.$parseMultiple(54) * 2 + FONT_SIZE,
              left: window.$parseMultiple(91),
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: TIMES,
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: false,
                  color: '#fff',
                  fontSize: FONT_SIZE
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: '#C8B4E7',
                    shadowColor: '#1B2143',
                    shadowBlur: 10
                  }
                },
                name: '实时',
                nameLocation: 'center'
              },
            ],
            yAxis: [
              {
                type: 'value',
                offset: 10,
                max: MAX_VALUE,
                show: true,
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#fff',
                  fontSize: FONT_SIZE
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: '#C8B4E7',
                    shadowColor: '#1B2143',
                    shadowBlur: 10
                  }
                }
              }
            ],
            series: [
              {
                name: '交通指数变化',
                type: 'line',
                areaStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#47ECC0' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#160E23' // 100% 处的颜色
                    }],
                  }
                },
                data: VALUES,
                animation: false
              },
            ]
          }}
        />
      </div>
    )
  }
}