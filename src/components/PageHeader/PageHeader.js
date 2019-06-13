import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import './PageHeader.css';

const { Header } = Layout;

class PageHeader extends Component {
  render() {
    return (
      <Header>
        <div className="logo">whatIsMyGPA</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
          className="top-menu"
        >
          <Menu.Item key="1">College GPA Calculator</Menu.Item>
          <Menu.Item key="2">High School GPA Calculator</Menu.Item>
          <Menu.Item key="3">Grade Calculator</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default PageHeader;
