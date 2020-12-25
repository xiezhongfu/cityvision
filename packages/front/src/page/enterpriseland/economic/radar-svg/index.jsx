import React from 'react';

/**
 * 为了传递数据方便，直接把 map.svg 采用自定义组件的方式内嵌到 react 组件中
 * 为了 map.svg 不跟其他的 svg 出现样式冲突，采用内链样式
 * 为了不改变 svg 属性原生的书写方式，采用 dangerouslySetInnerHTML 插入到 svg 节点
 */
export default class RadarSvg extends React.PureComponent {
  render() {
    const { dataSource } = this.props;
    const [first, second, third, fourth, fifth] = dataSource;
    return (
      <svg style={{ width: '100%', height: '100%' }} id="组_2" data-name="组 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 836.16 435.77" dangerouslySetInnerHTML={{
        __html:
          `
        <title>第三部分中间</title>
        <path id="多边形_2" data-name="多边形 2" d="M481.82,358l-124.69-.6-38-119.1,101.19-73.1,100.5,74Z" transform="translate(3.36 -0.25)" style="fill:none" />
        <path d="M481.8,358l-124.7-.6-38-119.1,101.2-73.1,100.5,74Z" transform="translate(3.36 -0.25)" style="fill:none;stroke:#22e49d;stroke-width:17.3700008392334px" />
        <path id="多边形_2_拷贝" data-name="多边形 2 拷贝" d="M463,331l-85.9-.4L349.9,247l70.5-49.5,70.5,50.6Z" transform="translate(3.36 -0.25)" style="fill:none;stroke:#22e49d;stroke-width:2.25px" />

        <text transform="translate(295.05 19.25)" style="isolation:isolate;font-size:21.875200271606445px;fill:#fff;font-family:SourceHanSansCN-Bold-GBpc-EUC-H, Source Han Sans CN">${first.title}</text>
        <text transform="translate(1 142.75)" style="isolation:isolate;font-size:21.875200271606445px;fill:#fff;font-family:SourceHanSansCN-Bold-GBpc-EUC-H, Source Han Sans CN">${second.title}</text>
        <text transform="translate(28.81 321.25)" style="isolation:isolate;font-size:21.875200271606445px;fill:#fff;font-family:SourceHanSansCN-Bold-GBpc-EUC-H, Source Han Sans CN">${third.title}</text>
        <text transform="translate(594.58 156.25)" style="isolation:isolate;font-size:21.875200271606445px;fill:#fff;font-family:SourceHanSansCN-Bold-GBpc-EUC-H, Source Han Sans CN">${fourth.title}</text>
        <text id="其他费用" transform="translate(576.75 326.5)" style="isolation:isolate;font-size:21.875200271606445px;fill:#fff;font-family:SourceHanSansCN-Bold-GBpc-EUC-H, Source Han Sans CN">${fifth.title}</text>
        
        
        <text transform="translate(298 76.06)" style="isolation:isolate;font-size:53.12229919433594px;fill:#22e49d;font-family:Arial-BoldMT, Arial;font-weight:700">${first.value}</text>
        <path id="形状_4" data-name="形状 4" d="M306.4,85H518.6" transform="translate(3.36 -0.25)" style="fill:none;stroke:#22e49d;stroke-width:0.75px" />
        <path id="形状_5" data-name="形状 5" d="M419.6,134.5V85" transform="translate(3.36 -0.25)" style="fill:none;stroke:#22e49d;stroke-width:0.75px" />
        <text transform="translate(468.29 76.23)" style="isolation:isolate;font-size:28.12299919128418px;fill:#22e49d;font-family:SourceHanSansCN-Medium-GBpc-EUC-H, Source Han Sans CN">${first.unit}</text>
        <text transform="translate(303.54 121.05)" style="isolation:isolate;font-size:37.49909973144531px;fill:#d03357;font-family:Arial-BoldMT, Arial;font-weight:700">${first.diff}</text>
        <rect x="439.96" y="110.05" width="5.8" height="11" style="fill:#d03357" />
        <polygon points="442.76 101.45 436.26 111.35 449.26 111.35 442.76 101.45" style="fill:#d03357" />
        
        <text transform="translate(0 212.06)" style="isolation:isolate;font-size:53.12229919433594px;fill:#22e49d;font-family:Arial-BoldMT, Arial;font-weight:700">${second.value}</text>
        <path id="形状_1" data-name="形状 1" d="M.4,220.8H230.6l22.5,28.5" transform="translate(3.36 -0.25)" style="fill:none;stroke:#22e49d;stroke-width:0.75px" />
        <text transform="translate(162.48 212.06)" style="isolation:isolate;font-size:28.12299919128418px;fill:#22e49d;font-family:Arial-BoldMT, Arial;font-weight:700"></text>
        <text transform="translate(170.29 214.23)" style="isolation:isolate;font-size:28.12299919128418px;fill:#22e49d;font-family:SourceHanSansCN-Medium-GBpc-EUC-H, Source Han Sans CN">${second.unit}</text>
        <text transform="translate(0 257.05)" style="isolation:isolate;font-size:37.49909973144531px;fill:#d03357;font-family:Arial-BoldMT, Arial;font-weight:700">${second.diff}</text>
        <rect x="126.66" y="245.75" width="5.8" height="11" style="fill:#d03357" />
        <polygon points="129.56 237.05 122.96 247.05 136.06 247.05 129.56 237.05" style="fill:#d03357" />
        
        <text transform="translate(28.81 376.66)" style="isolation:isolate;font-size:53.12229919433594px;fill:#22e49d;font-family:Arial-BoldMT, Arial;font-weight:700">${third.value}</text>
        <path id="形状_3" data-name="形状 3" d="M282.4,358l-24.8,30H28.9" transform="translate(3.36 -0.25)" style="fill:none;stroke:#22e49d;stroke-width:0.75px" />
        <text transform="translate(200.22 378.83)" style="isolation:isolate;font-size:28.12299919128418px;fill:#22e49d;font-family:SourceHanSansCN-Medium-GBpc-EUC-H, Source Han Sans CN">${third.unit}</text>
        <text transform="translate(28.81 421.66)" style="isolation:isolate;font-size:37.49909973144531px;fill:#d03357;font-family:Arial-BoldMT, Arial;font-weight:700">${third.diff}</text>
        <rect x="154.56" y="410.35" width="5.8" height="11" style="fill:#d03357" />
        <polygon points="157.46 401.65 150.96 411.65 163.96 411.65 157.46 401.65" style="fill:#d03357" />

        <text transform="translate(594.58 212.06)" style="isolation:isolate;font-size:53.12229919433594px;fill:#22e49d;font-family:Arial-BoldMT, Arial;font-weight:700">${fourth.value}</text>
        <path id="形状_2" data-name="形状 2" d="M569.6,251.5,595.8,223h237" transform="translate(3.36 -0.25)" style="fill:none;stroke:#22e49d;stroke-width:0.75px" />
        <text transform="translate(764.88 214.23)" style="isolation:isolate;font-size:28.12299919128418px;fill:#22e49d;font-family:SourceHanSansCN-Medium-GBpc-EUC-H, Source Han Sans CN">${fourth.unit}</text>
        <text transform="translate(594.58 257.05)" style="isolation:isolate;font-size:37.49909973144531px;fill:#d03357;font-family:Arial-BoldMT, Arial;font-weight:700">${fourth.diff}</text>
        <rect x="722.26" y="245.75" width="5.8" height="11" style="fill:#d03357" />
        <polygon points="725.06 237.05 718.56 247.05 731.66 247.05 725.06 237.05" style="fill:#d03357" />

        <text transform="translate(576.53 377.58)" style="isolation:isolate;font-size:53.12229919433594px;fill:#22e49d;font-family:Arial-BoldMT, Arial;font-weight:700">${fifth.value}</text>
        <path id="形状_3_拷贝" data-name="形状 3 拷贝" d="M541.9,357.2l24.8,30H795.5" transform="translate(3.36 -0.25)" style="fill:none;stroke:#22e49d;stroke-width:0.75px" />
        <text transform="translate(739.01 377.58)" style="isolation:isolate;font-size:28.12299919128418px;fill:#22e49d;font-family:Arial-BoldMT, Arial;font-weight:700"></text>
        <text transform="translate(746.82 381.76)" style="isolation:isolate;font-size:28.12299919128418px;fill:#22e49d;font-family:SourceHanSansCN-Medium-GBpc-EUC-H, Source Han Sans CN">${fifth.unit}</text>
        <text transform="translate(582.59 420.58)" style="isolation:isolate;font-size:37.49909973144531px;fill:#38f4e6;font-family:Arial-BoldMT, Arial;font-weight:700">${fifth.diff}</text>
        <rect x="709.16" y="399.05" width="5.8" height="11" style="fill:#38f4e6" />
        <polygon points="712.06 418.65 718.66 408.75 705.56 408.75 712.06 418.65" style="fill:#38f4e6" />
        `
      }}>
      </svg>
    );
  }
}