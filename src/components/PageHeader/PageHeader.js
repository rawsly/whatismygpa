import React, { Component } from 'react';
import { Layout } from 'antd';
import './PageHeader.css';
import * as ROUTES from '../../routes';
import PageMenu from '../PageMenu/PageMenu';
import { isMobile } from 'react-device-detect';

const { Header } = Layout;
class PageHeader extends Component {
  render() {
    return (
      <Header>
        <div className="logo">
          <a href={ROUTES.HOME}>whatIsMyGPA</a>
        </div>
        {isMobile ? console.log('Implement this later!') : <PageMenu />}
      </Header>
    );
  }
}

export default PageHeader;
