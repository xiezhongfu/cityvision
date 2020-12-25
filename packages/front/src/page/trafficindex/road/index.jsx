import React from 'react';
import ReactEcharts from '../../../components/enhance-echarts-for-react/';
import getLevel, { getSafeRandom, getRandomValuesLimitedRange, colors, /* getSafeGaussianRandom */ } from '../../../components/random/';

import GovernmentSrc from './img/government.svg';
import SchoolSrc from './img/school.svg';
import HispitalSrc from './img/hispital.svg';
import StationSrc from './img/station.svg';
import MarketSrc from './img/market.svg';
import ScenicSrc from './img/scenic.svg';

import Style from './style.module.scss';

const uniqueColors = [...new Set(colors)];

/**
 * 实现思路
 * 1: 正常堆叠图
 * 2: 双 Y 轴
 *    第一个 Y 轴表示"路段名称"
 *    第二个 Y 轴表示"附近路段"
 * 
 * 交通指数 eg:
 * 1: 昨天 17 点 ----> 今天 17 点 ----> 明天 17 点
 * 2: 最小刻度是 MIN_INTERRVAL 个小时(为了简化，假设在业务上，每 MIN_INTERRVAL 个小时为最小单位计算一次交通指数)，整数刻度范围是: [0, 48/MIN_INTERRVAL)
 * 3: 根据交通指数的等级，自定义每一个柱条的颜色(不从全局色盘获取)
 * 
 */
const STACK_INTO_GROUP = '_stack-into-group_';
// const ROADS_MOCK = [
//   '淮海路(洪山路口)', '惠黎路(建安路口)', '高山中(人民中路口)', '淮海中路(房星巷口)',
//   '海四路(宝昌路路口)', '牡丹江路(宝山路口)', '海滨八村路(三宝路口)', '三营房路(儒林里路口)',
//   '永清新村路(公兴路口)', '永清二村路(宝通路口)', '海江二村路(陆丰路口)', '海江新村路(象山里路口)',
//   '吴淞新城路(班溪路口)', '吴淞三村路(吴淞路口)', '和丰路(淞滨路口)', '淞西路(同济路口)',
//   '长征路(长征路口)', '一纺路(长征新路口)'
// ];
// const ROADS_MOCK = [
//   '淮海路', '惠黎路', '高山中', '淮海中路',
//   '海四路', '牡丹江路', '海滨八村路', '三营房路',
//   '永清新村路', '永清二村路', '海江二村路', '海江新村路',
//   '吴淞新城路', '吴淞三村路', '和丰路', '淞西路',
//   '长征路', '一纺路'
// ];
const ROADS_MOCK = [
  '祁连山路', '南大路', '环镇北路', '化工路', '制革路', '兆南路', '南陈路', '丰皓路', '丰翔路', '祁骆路', '古浪路'
]

const MIN_INTERRVAL = 8;
const MAX_VALUE = 48;
const RANGE_LENGTH = MAX_VALUE / MIN_INTERRVAL;

const _HOURS = new Date().getHours();

const TIME_RANGE = {
  0: `昨日 ${_HOURS} 时`,
  [RANGE_LENGTH >> 1]: `今日 ${_HOURS} 时`,
  [RANGE_LENGTH]: `明日 ${_HOURS} 时`,
};
/**
 * 颜色库
 */
// Y 方向需要 ROADS_MOCK.length 组;
const COLORS_STORE = ROADS_MOCK.map(() => {
  // X 方向产生 RANGE_LENGTH 个颜色
  return getSafeRandom(RANGE_LENGTH).map(i => getLevel(i * 10));
});
// 随机产生的颜色，也许不符合实际需要。需要产品定制数据，在用 getLevel 产生定制的颜色
console.log('COLORS_STORE:', COLORS_STORE);
// ++++++++++++++++++++++++++++++++++++++++++++++

const TITLE_FONT_SIZE = window.$parseMultiple(37);
const SUB_TITLE_FONT_SIZE = window.$parseMultiple(27);
const ICON_SIZE = window.$parseMultiple(41)

export default class TrafficIndex extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        <ul className={Style['title']}>
          <li>路段名称</li>
          <li>指数变化</li>
          <li>附近</li>
        </ul>
        <div className={Style['echarts-for-react-wrap']}>
          <ReactEcharts
            style={{ height: '100%' }}
            option={{
              // title: {
              //   text: "指数变化",
              //   left: "center",
              //   top: "top",
              //   textStyle: {
              //     color: '#fff',
              //     fontSize: TITLE_FONT_SIZE
              //   },
              // },
              grid: {
                show: false,
                top: (TITLE_FONT_SIZE * 2 + SUB_TITLE_FONT_SIZE) * 1,// 恰好流出标题字体大小的空间，和字体大小的间距
                right: window.$parseMultiple(91) + ICON_SIZE * 3,
                bottom: window.$parseMultiple(0),
                left: window.$parseMultiple(91),
              },
              xAxis: [
                {
                  type: 'value',
                  position: 'top',
                  nameTextStyle: {
                    color: '#F7F1FF',
                    align: 'right',
                  },
                  splitLine: {
                    show: false,
                  },
                  axisLine: {
                    show: false,
                  },
                  axisTick: {
                    show: false,
                  },
                  axisLabel: {
                    show: true,
                    color: '#fff',
                    showMinLabel: true,
                    showMaxLabel: true,
                    formatter: function (value, index) {
                      return TIME_RANGE[index];
                    },
                    fontSize: SUB_TITLE_FONT_SIZE
                  },
                  max: MAX_VALUE,
                  interval: MIN_INTERRVAL,
                  offset: TITLE_FONT_SIZE
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
                    rotate: 0,
                    fontSize: SUB_TITLE_FONT_SIZE
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
                  // name: '路段名称',
                  nameGap: window.$parseMultiple(TITLE_FONT_SIZE * 3),
                  nameTextStyle: {
                    color: '#fff',
                    align: 'right',
                    fontSize: TITLE_FONT_SIZE
                  },
                  splitLine: {
                    show: false,
                  }
                },
                {
                  type: 'category',
                  data: ROADS_MOCK,
                  axisTick: {
                    show: false
                  },
                  // name: '附近',
                  nameGap: window.$parseMultiple(TITLE_FONT_SIZE * 3),
                  nameTextStyle: {
                    color: '#fff',
                    align: 'left',
                    fontSize: TITLE_FONT_SIZE
                  },
                  axisLabel: {
                    color: '#fff',
                    rotate: 0,
                    // 根据 index 定制 icon
                    formatter: function (value, index) {
                      // 图标仓库
                      const data = [
                        ['{government|}', '{market|}',],// 第 1 条路
                        ['{government|}', '{market|}', '{scenic|}'],
                        ['{government|}', '{station|}', '{school|}'],
                        ['{government|}', '{market|}', '{school|}'],
                        ['{government|}', '{station|}', '{hospital|}'],
                        ['{government|}', '{market|}', '{school|}'],
                        ['{government|}', '{station|}', '{hospital|}'],// 第 7 条路
                        // ......等等
                      ]
                      const fallbackIndex = getRandomValuesLimitedRange(1, 0, 7).shift() >>> 0;
                      return (data[index] || data[fallbackIndex]).join(' ');
                    },

                    rich: {
                      // 政府
                      government: {
                        backgroundColor: {
                          image: GovernmentSrc,
                          width: ICON_SIZE,
                          height: ICON_SIZE
                        },
                      },
                      // 学校
                      school: {
                        backgroundColor: {
                          image: SchoolSrc,
                          width: ICON_SIZE,
                          height: ICON_SIZE
                        },
                      },
                      // 医院
                      hospital: {
                        backgroundColor: {
                          image: HispitalSrc,
                          width: ICON_SIZE,
                          height: ICON_SIZE
                        },
                      },
                      // 车站
                      station: {
                        backgroundColor: {
                          image: StationSrc,
                          width: ICON_SIZE,
                          height: ICON_SIZE
                        },
                      },
                      // 商场
                      market: {
                        backgroundColor: {
                          image: MarketSrc,
                          width: ICON_SIZE,
                          height: ICON_SIZE
                        },
                      },
                      // 景区
                      scenic: {
                        backgroundColor: {
                          image: ScenicSrc,
                          width: ICON_SIZE,
                          height: ICON_SIZE
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
                  splitLine: {
                    show: false
                  }
                }
              ],
              series: (new Array(RANGE_LENGTH)).fill(0).map((currentTime, indexTime, arrayTime) => {
                return {
                  name: '某个时刻',
                  type: 'bar',
                  stack: STACK_INTO_GROUP,
                  barMaxWidth: 10,
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
                      value: MIN_INTERRVAL,// value 可以设置成任何数值。这里使用的 MIN_INTERRVAL 代表了：假设每 MIN_INTERRVAL 个小时为最小单位计算一次交通指数
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
                            { offset: 0.5/* getSafeGaussianRandom() */, color: COLORS_STORE[indexRoad][indexTime] },// 当前位置的颜色
                            { offset: 1, color: COLORS_STORE[indexRoad][nextIndexTime] }                   // 后一个位置的颜色
                          ],
                        },
                        barBorderRadius,
                        shadowColor: COLORS_STORE[indexRoad][indexTime],
                        shadowBlur: 10,
                        opacity: 0.8,
                        shadowOffsetX: 2,
                        shadowOffsetY: 0,
                      }
                    };
                  })
                };
              })
            }}
          />
        </div>
        <div className={Style['legend']}>
          <ul className={Style['degree']}>
            {
              ['通畅', '缓行', '拥堵'].map((item, index) => {
                return (<li key={item}><i style={{ backgroundColor: uniqueColors[index] }} />{item}</li>);
              })
            }
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
    );
  }
}