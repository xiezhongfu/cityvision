import React from 'react';
import ReactEcharts from '../../../components/enhance-echarts-for-react/';

import GovernmentSrc from './img/government.svg';
import SchoolSrc from './img/school.svg';
import HispitalSrc from './img/hispital.svg';
import StationSrc from './img/station.svg';
import MarketSrc from './img/market.svg';
import ScenicSrc from './img/scenic.svg';

import Style from './style.module.scss';

const stackIntoGroup = '_stack-into-group_';

/**
 * 实现思路
 * 1: 正常堆叠图
 * 2: 双 Y 轴
 *    第一个 Y 轴表示"路段名称"
 *    第二个 Y 轴表示"附近路段"
 * 
 * 交通指数 eg:
 * 1: 昨天 17 点 ----> 今天 17 点 ----> 明天 17 点
 * 2: 最小刻度是 4 个小时(为了简化，假设在业务上，每4个小时为最小单位计算一次交通指数)
 * 3: 根据交通指数的等级，自定义每一个柱条的颜色(不从全局色盘获取)
 */
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
                  subtext: "昨日 15 时 ---> 今日 15 时 ---> 明日 15 时",
                  left: "center",
                  top: "top",
                  textStyle: {
                    color: '#fff',
                  },
                  subtextStyle: {
                    color: '#F7F1FF',
                  }
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  }
                },
                grid: {
                  top: 37,
                  left: 37,// 同 Y 轴的 offset
                  right: 41 * 2,// ??
                  bottom: 0,
                },
                xAxis: [
                  {
                    type: 'value',
                    splitLine: {
                      show: false
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'category',
                    data: ['淮海路（洪山路口）', '惠黎路（建安路口）', '高山中（人民中路口）', '淮海中路（房星巷口）', '惠黎路（XX路口）', '高山中（XX路口）', '淮海中路（XX巷口）'],
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
                    offset: 37,
                    name: '路段名称',
                    nameTextStyle: {
                      color: '#fff',
                      align: 'right',
                    }
                  },
                  {
                    type: 'category',
                    data: (new Array(7)).fill(1),// 这里的数组个数同第一个 Y 轴的个数相等，用于给第一个 Y 轴的每一个刻度定制 icon
                    axisTick: {
                      show: false
                    },
                    name: '附近',
                    nameTextStyle: {
                      color: '#fff',
                      align: 'left',
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
                    offset: 37
                  }
                ],
                series: [
                  {
                    name: '昨天 17 点',
                    type: 'bar',
                    stack: stackIntoGroup,
                    data: [
                      {
                        value: 4,
                        itemStyle: {
                          color: 'rgba(255, 206, 38, 1)',
                          barBorderRadius: 7,
                        }
                      },
                      {
                        value: 4,
                        itemStyle: {
                          color: 'rgba(34, 228, 157, 1)',
                          barBorderRadius: 7,
                        }
                      },
                      {
                        value: 4,
                        itemStyle: {
                          color: 'rgba(255, 62, 95, 1)',
                          barBorderRadius: 7,
                        }
                      },
                      {
                        value: 4,
                        itemStyle: {
                          color: 'rgba(34, 228, 157, 1)',
                          barBorderRadius: 7,
                        }
                      },
                      {
                        value: 4,
                        itemStyle: {
                          color: 'rgba(102, 54, 172, 1)',
                          barBorderRadius: 7,
                        }
                      },
                      {
                        value: 4,
                        itemStyle: {
                          color: 'rgba(255, 62, 95, 1)',
                          barBorderRadius: 7,
                        }
                      },
                      {
                        value: 4,
                        itemStyle: {
                          color: 'rgba(102, 54, 172, 1)',
                          barBorderRadius: 7,
                        }
                      }
                    ],
                  },
                ]
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