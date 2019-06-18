import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

class RightMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="signin">
          <Icon type="login" /> <a href="">Signin</a>
        </Menu.Item>
        <Menu.Item key="signup">
          <Icon type="user-add" /> <a href="">Signup</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
