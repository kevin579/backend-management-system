import React, { useState } from 'react';

import { Breadcrumb, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';

import MainMenu from '@/components/MainMenu';

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  

 
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Left bar */}
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* Logo Icon */}
        <div className="demo-logo-vertical" />
        <MainMenu/>
        
      </Sider>
      {/* Main Area */}
      <Layout>
        {/* Top Header */}
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Breadcrumb style={{ margin: '18px 14px' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
        </Header>
        {/* Content Area*/}
        <Content style={{ margin: '16px 16px',padding: 24,minHeight: 360,background: colorBgContainer,borderRadius: borderRadiusLG, }}>
            <Outlet/>
        </Content>
        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;