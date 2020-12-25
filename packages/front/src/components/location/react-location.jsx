import React from 'react';
import ReactDOM from 'react-dom';
import Style from './react-location.module.scss';

export default class ReactLocation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.wrap = document.createElement('div');
  }

  state = {
    top: -1000,
    left: -1000,
  }

  componentDidMount() {
    document.body.appendChild(this.wrap);

    const { positionRoot = document, positionId } = this.props;
    const { top, left, width, height } = positionRoot.querySelector(`#${positionId}`).getBoundingClientRect();

    this.setState({ top: top + height / 2, left: left + width / 2 });
  }

  componentWillUnmount() {
    this.wrap.parentNode.removeChild(this.wrap);
  }

  render() {
    const { top, left } = this.state;
    const { value } = this.props

    return ReactDOM.createPortal(
      <div className={Style['point-pop-container']} style={{ top, left }}>
        <div className={Style['content']}>{value}</div>
        <div className={Style['pointer']}></div>
      </div>,
      this.wrap
    );
  }
}