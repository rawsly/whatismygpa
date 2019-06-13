import React from 'react';
import { Layout } from 'antd';
import PageHeader from './components/PageHeader/PageHeader';
import PageFooter from './components/PageFooter/PageFooter';
import College from './components/College/College';

const { Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <PageHeader />
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <College />
        </div>
      </Content>
      <PageFooter />
    </Layout>
  );
}

export default App;
