import React from 'react';
import { ReactComponent as BaseMap } from './map.svg';
import { ReactComponent as TitleBackground } from './title.svg';
import Style from './style.module.scss';

export default class Map extends React.PureComponent {
  render() {
    const { legendSource = [], legendOnChange = () => { } } = this.props;

    return (
      <div className={Style['container']}>
        <div className={Style['map']}>
          <BaseMap />
          <TitleBackground className={Style['title']} />
        </div>
        <ul className={Style['legend']}>
          {
            legendSource.map((item, index, array) => (
              <li
                key={index}
                onClick={() => {
                  legendOnChange(item, index, array);
                }}>{item}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}