import React from 'react';
import Classnames from 'classnames';
import Style from './style.module.scss';

const directionMap = {
  0: "⇩",
  1: "⇧"
};

export class Statistic extends React.PureComponent {
  render() {
    return (
      <ul className={Style['block-container']}>
        {
          this.props.dataSource.map(item => {
            const { title, value, unit, per, status } = item;
            return (
              <li key={title}>
                <div className={Style['title']}>{title}</div>
                <div className={Style['value-container']}>
                  <span className={Style['value']}>{value}</span>
                  <span className={Style['unit']}>{unit}</span>
                </div>
                <div className={
                  Classnames(
                    Style['per-container'],
                    { [Style['down']]: !status },
                    { [Style['up']]: status }
                  )
                }>
                  <span className={Style['per']}>{per}</span>
                  <span className={Style['status']}>{directionMap[status]}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    );
  }
}


export class StatisticList extends React.PureComponent {
  render() {
    return (
      <ul className={Style['list-container']}>
        {
          this.props.dataSource.map(item => {
            const { title, value, unit, diffTitle, diff, status } = item;
            return (
              <li key={title}>
                <div className={Style['value-container']}>
                  <div>{title}</div>
                  <div><span>{value}</span><span>{unit}</span></div>
                </div>
                <div className={Style['diff-container']}>
                  <div>{diffTitle}</div>
                  <div className={
                    Classnames(
                      { [Style['down']]: !status },
                      { [Style['up']]: status }
                    )
                  }><span>{diff}</span><span>{directionMap[status]}</span></div>
                </div>
              </li>
            );
          })
        }
      </ul>
    );
  }
}