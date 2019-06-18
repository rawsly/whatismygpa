import React, { Component } from 'react';
import { Menu } from 'antd';
import * as ROUTES from '../../routes';

class LeftMenu extends Component {
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

export default LeftMenu;
