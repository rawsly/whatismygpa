import React, { Component } from 'react';
import * as ROUTES from '../../routes';
import { Menu } from 'antd';

class PageMenu extends Component {
  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
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
    );
  }
}

export default PageMenu;
