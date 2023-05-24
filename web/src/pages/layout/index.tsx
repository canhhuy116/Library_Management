import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import SiderMenu from '@/components/SiderMenu';
import Header from '@/components/Header/header';

const { Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderMenu onCollapse={onCollapse} collapsed={collapsed} />
      <Layout>
        <Layout.Header style={{ background: '#fff', minHeight: 52, padding: 0 }}>
          <Header collapsed={collapsed} toggle={toggle} />
        </Layout.Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
