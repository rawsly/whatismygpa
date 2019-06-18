import React from 'react';
import { Layout, Menu } from 'antd';
import PageHeader from './components/PageHeader/PageHeader';
import PageFooter from './components/PageFooter/PageFooter';
import AppRouter from './AppRouter';
import * as ROUTES from './routes';
import './App.css';

const { Content, Sider } = Layout;

function App() {
  return (
    <Layout>
      <PageHeader />
      <Content className="main-wrapper">
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <AppRouter />
        </div>
      </Content>
      <PageFooter />
    </Layout>
  );
}

export default App;
