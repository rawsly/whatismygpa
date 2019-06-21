import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../routes';
import { Menu } from 'antd';

class PageMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: 'college'
    };
  }

  handleClick = e => {
    const { key } = e;
    this.setState({ selectedKeys: key });
  };

  render() {
    const { selectedKeys } = this.state;
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        className="top-menu"
        selectedKeys={[selectedKeys]}
        onClick={this.handleClick}
      >
        <Menu.Item key="college">
          <Link to={ROUTES.COLLEGE_GPA_CALCULATOR}>College GPA Calculator</Link>
        </Menu.Item>
        <Menu.Item key="high">
          <Link to={ROUTES.HIGH_SCHOOL_GPA_CALCULATOR}>
            High School GPA Calculator
          </Link>
        </Menu.Item>
        <Menu.Item key="grade">
          <Link to={ROUTES.GRADE_CALCULATOR}>Grade Calculator</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default PageMenu;
