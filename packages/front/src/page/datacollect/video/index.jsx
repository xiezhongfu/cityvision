import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import './style.scss';

export default class Video extends React.PureComponent {
  render() {
    return (
      // 为了布局隔离方便，增加一层冗余的 div 
      <div>
        <Player
          preLoad="auto"
          // aspectRatio="1:1"
          // muted
          // autoPlay
          playsInline
          // poster="/assets/poster.png"
          src="https://www.tsingj.com/static/4595f393c0e05dba.mp4"
        >
          <BigPlayButton position="center" />
          <ControlBar autoHide={false}>
            <DownloadButton order={7} />
          </ControlBar>
        </Player>
      </div>
    )
  }
}

class DownloadButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() { }

  render() {
    const { player, className } = this.props;
    const { currentSrc } = player;

    return (
      <a
        className={ClassNames(className, {
          'video-react-control': true,
          'video-react-button': true
        })}
        rel="noopener noreferrer"
        target="_blank"
        href={currentSrc}
        aria-label="download"
        download
        style={{
          backgroundImage:
            'url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTE5IDloLTRWM0g5djZINWw3IDcgNy03ek01IDE4djJoMTR2LTJINXoiLz4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
        tabIndex="0"
        onClick={this.handleClick}
      >&nbsp;</a>
    );
  }
}

DownloadButton.propTypes = {
  player: PropTypes.object,
  className: PropTypes.string
};

