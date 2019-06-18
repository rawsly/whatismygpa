import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

const { Footer } = Layout;

class PageFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        {new Date().getFullYear()} &copy; Designed with{' '}
        <Icon type="heart" style={{ color: 'red' }} /> by{' '}
        <a href="http://rawsly.com">rawsly</a>
      </Footer>
    );
  }
}

export default PageFooter;
