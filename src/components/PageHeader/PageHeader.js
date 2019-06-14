import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import './PageHeader.css';
import * as ROUTES from '../../routes';

const { Header } = Layout;

class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
          <Menu.Item key="1">
            <a href={ROUTES.COLLEGE_GPA_CALCULATOR}>College GPA Calculator</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href={ROUTES.HIGH_SCHOOL_GPA_CALCULATOR}>
              High School GPA Calculator
            </a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href={ROUTES.GRADE_CALCULATOR}>Grade Calculator</a>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default PageHeader;
