import React from 'react';
import ReactEcharts from '../../../../components/enhance-echarts-for-react/';
// import { ReactComponent as BaseMap } from './map.svg';
import Title from '../components/title';
import Style from './style.module.scss';

export default class Total extends React.PureComponent {
  render() {
    return (
      <div className={Style['container']}>
        {/* <BaseMap /> */}
        <Title>土地总体情况</Title>
        <div className={Style['echarts']}>
          <ReactEcharts
            style={{ height: '100%' }}
            option={{
              series: [
                {
                  type: 'tree',
                  data: [
                    {
                      name: "flare",
                      children: [
                        {
                          name: "建成面积",
                          value: 3938
                        },
                        {
                          name: "存量面积",
                          value: 3938
                        },
                        {
                          name: "挂牌面积",
                          value: 3938
                        },
                        {
                          name: "出让面积",
                          value: 3938
                        },
                      ]
                    }

                  ],

                  left: '2%',
                  right: '2%',
                  top: '20%',
                  bottom: '8%',

                  symbol: 'roundRect',
                  orient: 'BT',
                  symbolSize: [80, 20],

                  label: {
                    verticalAlign: 'middle',
                    color: '#fff',
                    fontSize: window.$parseMultiple(25),
                    fontWeight: 'bold'
                  },
                  lineStyle: {
                    color: {
                      width: 10,
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        { offset: 0, color: '#48ECC0' },
                        { offset: 1, color: '#151a37' },
                      ],
                    },
                  },
                  leaves: {
                    label: {
                      // rotate: 90,
                      verticalAlign: 'middle',
                      align: 'center'
                    }
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