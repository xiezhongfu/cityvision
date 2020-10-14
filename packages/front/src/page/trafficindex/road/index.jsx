import React from 'react';
import ReactEcharts from '../../../components/enhance-echarts-for-react/';
import getLevel, { getSafeRandom, getSafeGaussianRandom } from './random';

import GovernmentSrc from './img/government.svg';
import SchoolSrc from './img/school.svg';
import HispitalSrc from './img/hispital.svg';
import StationSrc from './img/station.svg';
import MarketSrc from './img/market.svg';
import ScenicSrc from './img/scenic.svg';

import Style from './style.module.scss';

/**
 * 实现思路
 * 1: 正常堆叠图
 * 2: 双 Y 轴
 *    第一个 Y 轴表示"路段名称"
 *    第二个 Y 轴表示"附近路段"
 * 
 * 交通指数 eg:
 * 1: 昨天 17 点 ----> 今天 17 点 ----> 明天 17 点
 * 2: 最小刻度是 4 个小时(为了简化，假设在业务上，每4个小时为最小单位计算一次交通指数)，整数刻度范围是: [0, 48/4)
 * 3: 根据交通指数的等级，自定义每一个柱条的颜色(不从全局色盘获取)
 * 
 */
const STACK_INTO_GROUP = '_stack-into-group_';
const ROADS_MOCK = ['淮海路（洪山路口）', '惠黎路（建安路口）', '高山中（人民中路口）', '淮海中路（房星巷口）', '惠黎路（XX路口）', '高山中（XX路口）', '淮海中路（XX巷口）'];
const MIN_INTERRVAL = 4;
const MAX_VALUE = 48;
const RANGE_LENGTH = MAX_VALUE / MIN_INTERRVAL;
const TIME_RANGE = {
  0: '昨日 15 时',
  [RANGE_LENGTH]: '明日 15 时',
  [RANGE_LENGTH >> 1]: '今日 15 时',
};
/**
 * 颜色库
 */
// Y 方向需要 ROADS_MOCK.length 组;
const  COLORS_STORE =  ROADS_MOCK.map(()  => {
  // X 方向产生 RANGE_LENGTH 个颜色
  return getSafeRandom(RANGE_LENGTH).map(i => getLevel(i * 10));
});
console.log('COLORS_STORE:', COLORS_STORE);

export default class TrafficIndex extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <div className={Style['progress']}>
          <div className={Style['echarts-for-react-wrap']}>
            <ReactEcharts
              style={{ height: `70vh` }}
              option={{
                title: {
                  text: "指数变化",
                  left: "center",
                  top: "top",
                  textStyle: {
                    color: '#fff',
                    fontSize: 18
                  },
                },
                grid: {
                  top: 75,
                  right: 41,
                  bottom: 0,
                },
                xAxis: [
                  {
                    type: 'value',
                    position: 'top',
                    splitLine: {
                      show: false
                    },
                    nameTextStyle: {
                      color: '#F7F1FF',
                      align: 'right',
                    },
                    axisLine: {
                      show: false,
                    },
                    axisLabel: {
                      show: true,
                      color: '#fff',
                      showMinLabel: true,
                      showMaxLabel: true,
                      formatter: function (value, index) {
                        return TIME_RANGE[index];
                      }
                    },
                    max: MAX_VALUE,
                    interval: MIN_INTERRVAL,
                    offset: 10
                  }
                ],
                yAxis: [
                  {
                    type: 'category',
                    data: ROADS_MOCK,
                    axisTick: {
                      show: false
                    },
                    axisLabel: {
                      color: '#fff',
                      rotate: 0
                    },
                    axisLine: {
                      lineStyle: {
                        color: {
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [
                            { offset: 0, color: 'rgba(22, 14, 35, 1)' },
                            { offset: 0.5, color: 'rgba(208, 194, 229, 1)' },
                            { offset: 1, color: 'rgba(22, 14, 35, 1)' }
                          ],
                        }
                      }
                    },
                    name: '路段名称',
                    nameGap: 50,
                    nameTextStyle: {
                      color: '#fff',
                      align: 'right',
                      fontSize: 18
                    },
                  },
                  {
                    type: 'category',
                    data: ROADS_MOCK,
                    axisTick: {
                      show: false
                    },
                    name: '附近',
                    nameGap: 50,
                    nameTextStyle: {
                      color: '#fff',
                      align: 'left',
                      fontSize: 18
                    },
                    axisLabel: {
                      color: '#fff',
                      rotate: 0,
                      // formatter: [
                      //   '{government|}',
                      //   '{school|}',
                      //   '{hospital|}',
                      //   '{station|}',
                      //   '{market|}',
                      //   '{scenic|}',
                      // ].join(' '),
                      // 根据 index 定制 icon
                      formatter: function (value, index) {
                        const data = [
                          ['{government|}', '{market|}',],// 第 1 条路
                          ['{government|}', '{market|}', '{scenic|}'],
                          ['{government|}', '{station|}', '{school|}'],
                          ['{government|}', '{market|}', '{school|}'],
                          ['{government|}', '{station|}', '{hospital|}'],
                          ['{government|}', '{market|}', '{school|}'],
                          ['{government|}', '{station|}', '{hospital|}'],// 第 7 条路
                        ]
                        return data[index].join(' ');
                      },

                      rich: {
                        // 政府
                        government: {
                          backgroundColor: {
                            image: GovernmentSrc,
                            width: 41,
                            height: 41
                          },
                        },
                        // 学校
                        school: {
                          backgroundColor: {
                            image: SchoolSrc,
                            width: 41,
                            height: 41
                          },
                        },
                        // 医院
                        hospital: {
                          backgroundColor: {
                            image: HispitalSrc,
                            width: 41,
                            height: 41
                          },
                        },
                        // 车站
                        station: {
                          backgroundColor: {
                            image: StationSrc,
                            width: 41,
                            height: 41
                          },
                        },
                        // 商场
                        market: {
                          backgroundColor: {
                            image: MarketSrc,
                            width: 41,
                            height: 41
                          },
                        },
                        // 景区
                        scenic: {
                          backgroundColor: {
                            image: ScenicSrc,
                            width: 41,
                            height: 41
                          },
                        },
                      }
                    },
                    axisLine: {
                      lineStyle: {
                        color: {
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [
                            { offset: 0, color: 'rgba(22, 14, 35, 1)' },
                            { offset: 0.5, color: 'rgba(208, 194, 229, 1)' },
                            { offset: 1, color: 'rgba(22, 14, 35, 1)' }
                          ],
                        }
                      }
                    },
                  }
                ],
                series: (new Array(RANGE_LENGTH)).fill(0).map((currentTime, indexTime, arrayTime) => {
                  return {
                    name: '某个时刻',
                    type: 'bar',
                    stack: STACK_INTO_GROUP,
                    // 当前时间下，各个路口的交通指数
                    data: (new Array(ROADS_MOCK.length)).fill(0).map((currentRoad, indexRoad/* , arrayRoad */) => {
                      let preIndexTime;
                      let nextIndexTime;
                      let barBorderRadius;

                      // 第一个时间
                      if (indexTime === 0) {
                        preIndexTime = indexTime;
                        nextIndexTime = indexTime + 1;
                        barBorderRadius = [7, 0, 0, 7];//（顺时针左上，右上，右下，左下）
                      }
                      // 最后一个时间
                      else if (indexTime === arrayTime.length - 1) {
                        preIndexTime = indexTime;
                        nextIndexTime = indexTime;
                        barBorderRadius = [0, 7, 7, 0];
                      } else {
                        preIndexTime = indexTime;
                        nextIndexTime = indexTime + 1;
                        barBorderRadius = 0;
                      }

                      return {
                        value: MIN_INTERRVAL,// value 可以设置成任何数值。这里使用的4代表了：假设每4个小时为最小单位计算一次交通指数
                        itemStyle: {
                          // 如果不需要过度效果，直接使用  getLevel() 简单化用随机的颜色表达了交通指数
                          color: {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            x2: 1,
                            y2: 1,
                            colorStops: [
                              { offset: 0, color: COLORS_STORE[indexRoad][preIndexTime] },                   // 前一个位置的颜色
                              { offset: getSafeGaussianRandom(), color: COLORS_STORE[indexRoad][indexTime] },// 当前位置的颜色
                              { offset: 1, color: COLORS_STORE[indexRoad][nextIndexTime] }                   // 后一个位置的颜色
                            ],
                          },
                          barBorderRadius,
                        }
                      };
                    })
                  };
                })
              }}
            />
            <div className={Style['legend']}>
              <ul className={Style['degree']}>
                <li>通畅</li>
                <li>基本通畅</li>
                <li>缓行</li>
                <li>较拥堵</li>
                <li>拥堵</li>
              </ul>
              <ul className={Style['tip']}>
                <li>拥堵高发路段</li>
                <li>政府</li>
                <li>学校</li>
                <li>医院</li>
                <li>车站</li>
                <li>商场</li>
                <li>景区</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}