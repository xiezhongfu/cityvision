import React from 'react';
import classNames from 'classnames';
import Style from './style.module.scss';

class BasicLayout extends React.PureComponent {
  renderComponent = () => {
    const { className, children, tagName: Tag, ...others } = this.props;
    return (
      <Tag className={className} {...others}>
        {children}
      </Tag>
    )
  }
  render() {
    return <>{this.renderComponent()}</>;
  }
}

/**
 * 布局组件包装器
 * @param {*} param0 
 */
function generator({ className, tagName, displayName }) {
  return (BasicComponent) => {
    return class Adapter extends React.PureComponent {

      static displayName = displayName;

      renderComponent = () => {
        return <BasicComponent className={className} tagName={tagName} {...this.props} />;
      };

      render() {
        return <>{this.renderComponent()}</>;
      }
    };
  };
}


const Layout = generator({
  className: classNames(Style['layout']),
  tagName: 'section',
  displayName: 'Layout',
})(BasicLayout);

const Sider = generator({
  className: classNames(Style['sider']),
  tagName: 'aside',
  displayName: 'Sider',
})(BasicLayout);

const Content = generator({
  className: classNames(Style['content']),
  tagName: 'section',
  displayName: 'Content',
})(BasicLayout);

Layout.Sider = Sider;
Layout.Content = Content;

export default Layout;