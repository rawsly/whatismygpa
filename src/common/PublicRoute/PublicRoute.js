import React from 'react';
import { Route } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
import { Layout } from 'antd';

const { Content } = Layout;

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <PageHeader />
          <Content className="main-wrapper">
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Component {...props} {...rest} />
            </div>
          </Content>
          <PageFooter />
        </Layout>
      )}
    />
  );
};

export default PublicRoute;
