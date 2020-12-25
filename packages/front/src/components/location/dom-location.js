/**
 * 用于在 DOM 上 node 的循环执行直线移动的动画
 * TODO: 引入 frame-messagechannel
 */

export default class DomLocation {
  constructor({ wrapNode, className, backgroundColor, threshold = 150, step = 1 }) {
    this.wrapNode = wrapNode;
    this.backgroundColor = backgroundColor;

    this.point = null;
    this._pointNode(className);

    this.top = null;
    this.left = null;

    this.startTop = null;
    this.startLeft = null;

    this.endTop = null;
    this.endLeft = null;

    this.threshold = threshold;// requestAnimationFrame 执行的前后间隔

    this.step = step;// 单次运动的步长

    this.workingTimestamp = null;// 执行动画时的时间戳
  }

  _pointNode(className) {
    const point = document.createElement('div');
    point.classList.add(className);
    this.point = point;
    this.wrapNode.appendChild(this.point);
  }

  clientLocation = (root, locationId) => {
    const location = root.querySelector(`#${locationId}`);
    const { width: pointWidth, height: pointHeight } = this.point.getBoundingClientRect();
    const { left, top, ...rest } = location.getBoundingClientRect().toJSON();

    return {
      ...rest,
      left: left - pointWidth / 2,
      top: top - pointHeight / 2,
    };
  }

  domDestroyed = () => {
    this.wrapNode.removeChild(this.point);
    return this;
  }
  /**
   * 使用 contains 可以在不调用 cancelAnimationFrame 的情况下，跳出递归调用 requestAnimationFrame
   * TODO: 不能及时退出已经规划的 Frame 动画
   * 
   * 让循环的执行和 this.point 绑定到一起，防止内存泄漏
   */
  ensureDomReady = () => {
    if (!document.body.contains(this.point)) {
      return false;
    }
    return true;
  }

  /**
   * 
   * @param {*} top 
   * @param {*} left 
   */
  start(top, left) {
    /* this.point.cssText = `
      top: ${top}px;
      left: ${left}px;
      background-color: ${this.backgroundColor};
    `; */

    this.point.style.top = `${top}px`;
    this.point.style.left = `${left}px`;
    this.point.style.backgroundColor = `${this.backgroundColor}`;

    this.top = top;
    this.left = left;

    this.startTop = top;
    this.startLeft = left;

    return this;
  }
  /**
   * 
   * @param {*} top 
   * @param {*} left 
   */
  moveTo(top, left) {
    if (!this.ensureDomReady()) {
      return;
    }

    this.endTop = top;
    this.endLeft = left;

    /**
     * 起点(startLeft, this.startTop)和终点(this.endTop, this.startTop)确定后，可以确定一条直线，直线方程为: y = k * x + b;
     * 求出系数 k 和 b
     */
    const CONST_K = (this.endTop - this.startTop) / (this.endLeft - this.startLeft);
    const CONST_B = this.startTop - CONST_K * this.startLeft;
    // x 变化方向
    const leftDirection = this.endLeft - this.startLeft > 0 ? 1 : -1;

    // 持续动画开始
    if (this.left !== this.endLeft) {
      window.requestAnimationFrame(timestamp => {
        if (!this.workingTimestamp) {
          this.workingTimestamp = timestamp;
        }
        const elapsed = timestamp - this.workingTimestamp;

        if (elapsed >= this.threshold) {
          const newLeft = leftDirection > 0 ?
            Math.min(this.left + leftDirection * this.step, this.endLeft) :
            Math.max(this.left + leftDirection * this.step, this.endLeft);
          const newTop = CONST_K * newLeft + CONST_B;

          this.top = newTop;
          this.left = newLeft;

          this.point.style.top = `${newTop}px`;
          this.point.style.left = `${newLeft}px`;

          this.workingTimestamp = timestamp;
        }
        this.moveTo(top, left);
      });
    }
    // 动画从头开始
    else {
      this.top = this.startTop;
      this.left = this.startLeft;

      this.moveTo(top, left);
    }

    return this;
  }
}