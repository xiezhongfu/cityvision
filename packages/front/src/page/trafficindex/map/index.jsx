import React from 'react';
import { ReactComponent as BaseMap } from './map.svg';
import { DomLocation as Location } from '../../../components/location/';
import Style from './style.module.scss';

export default class Map extends React.PureComponent {
  ref = React.createRef()
  wrap = null;

  componentDidMount() {
    // 构建 wrap fragment
    const fragment = document.createDocumentFragment();
    const wrap = document.createElement('div');
    wrap.classList.add(Style['wrap']);
    this.wrap = wrap;


    // 追加 wrap fragment 到 DOM
    fragment.appendChild(wrap);
    document.body.appendChild(fragment);

    // 3个闪烁的圈
    this.sparkleNodeContext('page-1-sparkle-a', wrap);
    this.sparkleNodeContext('page-1-sparkle-b', wrap);
    this.sparkleNodeContext('page-1-sparkle-c', wrap);

    const { current: pointRoot } = this.ref;

    // 出租车 a --> b
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#662EAB' });
      const { top: startTop, left: startLeft } = point.clientLocation(pointRoot, 'page-1-point-a');
      const { bottom: endTop, left: endLeft } = point.clientLocation(pointRoot, 'page-1-point-b');
      point.start(startTop, startLeft).moveTo(endTop, endLeft);
    }

    // 出租车 c --> b
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#662EAB' });
      const { top: startTop, left: startLeft } = point.clientLocation(pointRoot, 'page-1-point-c');
      const { bottom: endTop, left: endLeft } = point.clientLocation(pointRoot, 'page-1-point-b');
      point.start(startTop, startLeft).moveTo(endTop, endLeft);
    }

    // 出租车 d
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#662EAB' });
      const { bottom: startTop, left: startLeft } = point.clientLocation(pointRoot, 'page-1-point-d');
      const { bottom: endTop, right: endLeft } = point.clientLocation(pointRoot, 'page-1-point-d');
      point.start(startTop, startLeft).moveTo(endTop, endLeft);
    }

    // 出租车 i --> j
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#662EAB', step: 2 });
      const { bottom: startTop, left: startLeft } = point.clientLocation(pointRoot, 'page-1-point-i');
      const { top: endTop, right: endLeft } = point.clientLocation(pointRoot, 'page-1-point-j');
      point.start(startTop, startLeft).moveTo(endTop, endLeft, 0);
    }
    // 货运车 j --> i
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#22E49D' });
      const { bottom: startTop, left: startLeft } = point.clientLocation(pointRoot, 'page-1-point-i');
      const { top: endTop, right: endLeft } = point.clientLocation(pointRoot, 'page-1-point-j');
      point.start(endTop, endLeft).moveTo(startTop, startLeft);
    }
    // 货运车 i --> j
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#22E49D', step: 1 });
      const { bottom: startTop, left: startLeft } = point.clientLocation(pointRoot, 'page-1-point-i');
      const { top: endTop, right: endLeft } = point.clientLocation(pointRoot, 'page-1-point-j');
      point.start(startTop, startLeft).moveTo(endTop, endLeft, 1);
    }

    // 货运车 a --> c
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#22E49D' });
      const { top: startTop, left: startLeft } = point.clientLocation(pointRoot, 'page-1-point-a');
      const { top: endTop, left: endLeft } = point.clientLocation(pointRoot, 'page-1-point-c');
      point.start(startTop, startLeft).moveTo(endTop, endLeft);
    }

    // 货运车 e --> f
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#22E49D' });
      const { top: startTop, right: startLeft } = point.clientLocation(pointRoot, 'page-1-point-e');
      const { top: endTop, left: endLeft } = point.clientLocation(pointRoot, 'page-1-point-f');
      point.start(startTop, startLeft).moveTo(endTop, endLeft);
    }
    // 货运车 g --> f
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#22E49D' });
      const { top: startTop, right: startLeft } = point.clientLocation(pointRoot, 'page-1-point-g');
      const { top: endTop, left: endLeft } = point.clientLocation(pointRoot, 'page-1-point-f');
      point.start(startTop, startLeft).moveTo(endTop, endLeft);
    }
    // 货运车 g --> h
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#22E49D', step: 0.15 });
      const { top: startTop, right: startLeft } = point.clientLocation(pointRoot, 'page-1-point-f');
      const { bottom: endTop, right: endLeft } = point.clientLocation(pointRoot, 'page-1-point-h');
      point.start(startTop, startLeft).moveTo(endTop, endLeft);
    }

    // 公交车 k --> h
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#F7FFFF'/*,  threshold: 0 */, step: 0.05 });
      const { top: startTop, left: startLeft } = point.clientLocation(pointRoot, 'page-1-point-k');
      const { bottom: endTop, right: endLeft } = point.clientLocation(pointRoot, 'page-1-point-h');
      point.start(startTop, startLeft).moveTo(endTop, endLeft, 0);
    }
    // 公交车 h --> k
    {
      const point = new Location({ wrapNode: wrap, className: Style['point'], backgroundColor: '#F7FFFF'/*,  threshold: 0 */, step: 0.05 });
      const { top: startTop, left: startLeft } = point.clientLocation(pointRoot, 'page-1-point-k');
      const { bottom: endTop, right: endLeft } = point.clientLocation(pointRoot, 'page-1-point-h');
      point.start(endTop, endLeft).moveTo(startTop, startLeft, 0);
    }
  }

  /**
   * 闪烁的动画
   * @param {*} locationId 
   * @param {*} wrapNode 
   */
  sparkleNodeContext = (locationId, wrapNode) => {
    const { current: root } = this.ref;
    const location = root.querySelector(`#${locationId}`);
    const { top, /* right, bottom,  */left, width, height } = location.getBoundingClientRect();

    // 外层
    const container = document.createElement('div');
    container.classList.add(Style['sparkle-container']);
    container.style.cssText = `
      top: ${top + height / 2}px;
      left: ${left + width / 2}px;
    `;

    // 3个圈
    const fragment = document.createDocumentFragment();
    (new Array(3)).fill(0).forEach(() => {
      const node = document.createElement('div');
      node.classList.add(Style['circle']);
      fragment.appendChild(node);
    });
    // 1个圆点
    const point = document.createElement('div');
    point.classList.add(Style['center']);
    fragment.appendChild(point);

    container.appendChild(fragment);
    wrapNode.appendChild(container);
  }

  componentWillUnmount() {
    this.wrap.parentNode.removeChild(this.wrap);
  }

  render() {
    return (
      <div className={Style['container']}>
        <div className={Style['map']} ref={this.ref}>
          <BaseMap />
        </div>
        <h4 className={Style['title']}>最新车辆分布</h4>
        <ol className={Style['legend']}>
          <li>拥堵点</li>
          <li>公交车</li>
          <li>货运车</li>
          <li>出租车</li>
        </ol>
      </div>
    );
  }
}