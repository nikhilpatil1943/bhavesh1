import React, { useState, useEffect } from 'react';
import {
  HomeOutlined,
  BookOutlined,
  LikeOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('Bookmarks', '2', <BookOutlined />),
  getItem('Likes', 'sub1', <LikeOutlined />),
  getItem('Posts', 'sub2', <ProfileOutlined />),
  getItem('User', '9', <UserOutlined />),
];

const BasicLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) {
        // Do not allow uncollapsing for screen widths less than 450
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          if (window.innerWidth >= 450) {
            // Allow collapsing and uncollapsing for screen widths greater than or equal to 450
            setCollapsed(value);
          }
        }}
        breakpoint="lg" // Set the breakpoint for responsive behavior
        collapsedWidth="80" // Width of the collapsed sidebar
        zeroWidthTriggerStyle={{ top: 64 }} // Adjust trigger position
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer , textAlign: 'center' ,fontSize:'200%' , fontFamily:"'Signika Negative', sans-serif", color:'rgb(54, 3, 77)' , textShadow:'2px 1px #9966ff'}} >Algo_Bulls </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>About</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }} 
            
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;




