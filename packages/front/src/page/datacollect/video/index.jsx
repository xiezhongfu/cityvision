import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import './style.scss';
import PosterSrc from './poster.jpg';
/**
 * !!! 视频 !!! 已经加入到了忽略文件中，more: http://jira.tsingj.local/browse/SLTDLV-642?focusedCommentId=27268&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-27268
 * 
 * 视频源地址
 * 链接：https://pan.baidu.com/s/13tatVKdPS2scbbTKZ-ufGQ 提取码：wco7 
 * 
 * 克隆的时候需要单独下载此视频到当前目录
 */
import VideoSrc from './video.mp4';


export default class Video extends React.PureComponent {
  render() {

    return (
      // 为了布局隔离方便，增加一层冗余的 div 
      // !!! 为了凸显 poster，防止播放按钮遮盖了 poster。使用 BigPlayButton 居中显示，透明度设置为 0 !!!
      <div>
        <Player
          preLoad="auto"
          // aspectRatio="1:1"
          // muted
          // autoPlay
          playsInline
          poster={PosterSrc}
          src={VideoSrc}
        >
          <BigPlayButton position="center" />
          <ControlBar autoHide={false}>
            {/* <DownloadButton order={7} /> */}
          </ControlBar>
        </Player>
      </div>
    )
  }
}

/**
 * 视频播放器的自定义组件
 */
// 下载按钮
class DownloadButton extends React.PureComponent {

  handleClick = () => { }

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

