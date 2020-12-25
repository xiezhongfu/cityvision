import React from 'react';
import Classnames from 'classnames';
import uuid from 'uuid';
import { ReactLocation as Location } from '../../../components/location/';
import { addListener as addFrameListener } from '../../../components/frame-messagechannel/';
import { ReactComponent as BaseMap } from './map.svg';
import Statistic from './statistic/';
import Style from './style.module.scss';
/**
 * 自造 3 级简单的 tab 实现交互
 * 
 * right-legend 的数据嵌套了 Statistic 的数据；Statistic 的数据嵌套了地图 pop 的数据
 */

const DATA_SOURCE = [
  { name: '告警处置率', unit: '', value: '80.9%', icon: require('./alarm-handl-rate.svg') },

  {
    name: '重大隐患', unit: '（次）', value: '116', icon: require('./major-hidden-danger.svg'), children: [
      {
        name: '核心商务', value: 21, unit: '个', icon: [require('./statistic/business.svg'), require('./statistic/business-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-a" value="核心商务" /> }
        ]
      },
      {
        name: '综合消费', value: 27, unit: '个', icon: [require('./statistic/consumption.svg'), require('./statistic/consumption-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-b" value="综合消费" /> }
        ]
      },
      {
        name: '化工产业', value: 32, unit: '个', icon: [require('./statistic/chemical.svg'), require('./statistic/chemical-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-c" value="化工产业" /> }
        ]
      },
      {
        name: '装备制造', value: 19, unit: '个', icon: [require('./statistic/equipment.svg'), require('./statistic/equipment-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-d" value="装备制造" /> }
        ]
      },
      {
        name: '仓储物流', value: 17, unit: '个', icon: [require('./statistic/express.svg'), require('./statistic/express-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-e" value="仓储物流" /> }
        ]
      },
    ]
  },
  {
    name: '一般隐患', unit: '（次）', value: '102', icon: require('./general-hidde-danger.svg'), children: [
      {
        name: '综合消费区', value: 43, unit: '个', icon: [require('./statistic/business.svg'), require('./statistic/business-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-c" value="综合消费区" /> }
        ]
      },
      {
        name: '核心商务', value: 22, unit: '个', icon: [require('./statistic/consumption.svg'), require('./statistic/consumption-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-e" value="核心商务" /> }
        ]
      },
      {
        name: '仓储物流', value: 37, unit: '个', icon: [require('./statistic/express.svg'), require('./statistic/express-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-a" value="仓储物流" /> }
        ]
      },
    ]
  },
  {
    name: '巡检次数', unit: '（次）', value: '259', icon: require('./inspection-times.svg'), children: [
      {
        name: '化工产业区', value: 105, unit: '个', icon: [require('./statistic/business.svg'), require('./statistic/business-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-b" value="化工产业区" /> }
        ]
      },
      {
        name: '装备制造', value: 73, unit: '个', icon: [require('./statistic/consumption.svg'), require('./statistic/consumption-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-e" value="装备制造" /> }
        ]
      },
      {
        name: '仓储物流', value: 81, unit: '个', icon: [require('./statistic/express.svg'), require('./statistic/express-focus.svg')], mapPoints: [
          { component: <Location key={uuid()} positionId="page-2-point-pop-c" value="仓储物流" /> }
        ]
      },
    ]
  },

  { name: '联网单位', unit: '（家）', value: '112', icon: require('./networking-unit.svg') },
  { name: '监控设备', unit: '（个）', value: '103', icon: require('./monitoring-equipment.svg') },
  { name: '监管设备', unit: '（个）', value: '127', icon: require('./regulatory-equipment.svg') },
  { name: '设备完好度', unit: '', value: '99.6%', icon: require('./equipment-integrity-rate.svg') },
];


export default class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      legendSelected: 1,// 区间: [1 --> 3]
      statisticSelected: 0,// 二维区间 [[0 --> 4], [0 --> 2], [0 --> 2]]
    }

    let legendRangeArray = DATA_SOURCE.map((item, index) => item.children ? index : null).filter(i => i !== null);
    let statisticRangeArray = DATA_SOURCE.filter(item => item.children).map(item => item.children.map((item, index) => index));

    /**
     * eg
     * { min:1, max:3 }
     */
    this.legendRange = {
      min: legendRangeArray.shift(),
      max: legendRangeArray.pop(),
    };
    /**
     * eg
     * [
     *  { min:0, max:4 }, // 第 this.legendRange.min 个 legend 下的 statistic 的范围。this.legendRange.min 不是 0, legend 存在一个偏移量
     *  { min:0, max:2 },
     *  { min:0, max:2 },
     * ]
     */
    this.statisticRange = statisticRangeArray.map(item => {
      return {
        min: item.shift(),
        max: item.pop(),
      }
    });
  }

  onLegendChange = (legendSelected) => {
    // legendSelected 发生变化，重制 statisticSelected
    // this.setState({ legendSelected, statisticSelected: 0 });
  }
  onStatisticChange = (statisticSelected) => {
    // this.setState({ statisticSelected });
  }

  ref = React.createRef()

  removeInterval = null

  componentDidMount() {
    // console.log(this.legendRange, this.statisticRange);

    this.removeInterval = addFrameListener(() => {
      this.setState(function (state, props) {
        // pre
        const { legendSelected, statisticSelected } = state;

        const { min: legendMin, max: legendMax } = this.legendRange;
        // 根据 legendRange 的偏移量找出当前 statistic 下的最大值
        const { max: statisticCurrentMax } = this.statisticRange[legendSelected - legendMin];

        // 以 statistic 循环为基准，当前 legend 下的 statistic 循环到最大值后，切换到下一个 legend
        // 否则维持当前的 legendSelected
        let legendSelectedShouldUpdate = statisticSelected >= statisticCurrentMax;
        const newLegendSelected = legendSelectedShouldUpdate ? (legendSelected >= legendMax ? legendMin : legendSelected + 1) : legendSelected;

        let neweStatisticSelected = null;
        // 如果切换到了下一个 legend，那 statistic 更新为新的 legend 下的第一个 statistic
        if (legendSelectedShouldUpdate) {
          const { min: statisticCurrentMin } = this.statisticRange[newLegendSelected - legendMin];
          neweStatisticSelected = statisticCurrentMin;
        } else {
          neweStatisticSelected = statisticSelected + 1;
        }

        return {
          legendSelected: newLegendSelected,
          statisticSelected: neweStatisticSelected
        };
      });
    }, 2000);
  }

  componentWillUnmount() {
    this.removeInterval && this.removeInterval();
  }

  render() {
    const { legendSelected, statisticSelected } = this.state;
    const { children: statisticDataSource, ...tipSource } = DATA_SOURCE[legendSelected];

    return (
      <div className={Style['container']}>
        <div className={Style['map']}>
          <div className={Style['svg-map']} ref={this.ref}>
            <BaseMap className={Style['svg']} />
            {
              // 地图上的 pop
              statisticDataSource[statisticSelected].mapPoints.map((item, index) => {
                const { component } = item;
                return component;
              })
            }
            {/* <ul className={Style['tip']}>
              {
                ['预警企业', '产业园', '区域', '区域', '区域'].map((i, index) => (
                  <li key={index}>{i}</li>
                ))
              }
            </ul> */}
          </div>
          <Statistic
            value={statisticSelected}
            tipSource={tipSource}
            dataSource={statisticDataSource}
            onChange={this.onStatisticChange}
          />
        </div>

        <ul className={Style['right-legend']}>
          {
            DATA_SOURCE.map((current, index) => {
              const { name, value, unit, icon, children } = current;

              return (
                <li
                  key={name}
                  // 根据 children 判断是否增加 onClick
                  {... (children ? { onClick: () => { this.onLegendChange(index) } } : {})}
                  className={Classnames({ [Style['able']]: children, [Style['selected']]: legendSelected === index })}
                >
                  <div className={Style['item']}>
                    <div className={Style['icon']}><img alt={name} src={icon} /></div>
                    <div className={Style['desc']}>
                      <h4>{value}</h4>
                      <p>{name}{unit}</p>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    )
  }
}