import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  HomeOutlined,
  BookOutlined,
  LikeOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Form, Input, Button } from 'antd';
import {  MailOutlined, PhoneOutlined } from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme , Card} from 'antd';
import Home from '../pages/Home';
import MyLikes from '../pages/MyLikes';
import MyPosts from '../pages/MyPosts';
import MyBookmarks from '../pages/MyBookmarks';

const { Header, Content, Footer, Sider } = Layout;

// Function to create menu items
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Array of menu items
const items = [
  getItem('Home', 'home', <HomeOutlined />),
  getItem('Bookmarks', 'my-bookmarks', <BookOutlined />),
  getItem('Likes', 'my-likes', <LikeOutlined />),
  getItem('Posts', 'my-posts', <ProfileOutlined />),
  getItem('User', 'my-profile', <UserOutlined />),
];

const MyProfile = () => {
  
  const navigate = useNavigate();
  const [editableMobile, setEditableMobile] = useState(false);

  const [collapsed, setCollapsed] = useState(true);
  const toggleEditableMobile = () => {
    setEditableMobile(!editableMobile);
  };
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      // Redirect to sign-in page if token is not present
      navigate('/signin');
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  // Handle menu item click
  const handleMenuClick = (item) => {
    const { key } = item;
    navigate(`/${key}`);
  };

  // Handle Home button click 
  const handleHomeClick = () => {
    navigate('/home'); // Redirect to the home page
  };
  const handleLikeClick = () => {
    navigate('/my-likes'); // Redirect to the home page
  };
  const handleBookmarkClick = () => {
    navigate('/my-bookmarks'); // Redirect to the home page
  };
  const handlePostClick = () => {
    navigate('/my-posts'); // Redirect to the home page
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          if (window.innerWidth >= 450) {
            setCollapsed(value);
          }
        }}
        breakpoint="lg"
        collapsedWidth="80"
        zeroWidthTriggerStyle={{ top: 64 }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['my-profile']}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        >
          <Menu.Item key="home" icon={<HomeOutlined />} onClick={handleHomeClick}>
            Home
          </Menu.Item>
          <Menu.Item key="my-likes" icon={<LikeOutlined />} onClick={handleLikeClick}>
            MyLikes
          </Menu.Item>
          <Menu.Item key="my-bookmarks" icon={<LikeOutlined />} onClick={handleBookmarkClick}>
            MyBookmarks
          </Menu.Item>
          <Menu.Item key="my-posts" icon={<LikeOutlined />} onClick={handlePostClick}>
            MyBookmarks
          </Menu.Item>

          {/* Other menu items... */}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign: 'center',
            fontSize: '200%',
            fontFamily: "'Signika Negative', sans-serif",
            color: 'rgb(54, 3, 77)',
            textShadow: '2px 1px #9966ff',
          }}
        >
          Algo_Bulls{' '}
        </Header>
        <Content style={{ margin: '0 16px', padding: '16px' }}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <Avatar size={64} icon={<UserOutlined />} />
              <div style={{ marginTop: 10, fontSize: 18 }}>User Name</div>
            </div>

            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Email" colon={false}>
                <Input prefix={<MailOutlined />} value="user@example.com" disabled />
              </Form.Item>

              <Form.Item label="Mobile" colon={false}>
                <Input
                  prefix={<PhoneOutlined />}
                  value="123-456-7890"
                  disabled={!editableMobile}
                  onChange={(e) => console.log(e.target.value)}
                />
                <Button type="link" onClick={toggleEditableMobile}>
                  {editableMobile ? 'Save' : 'Edit'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MyProfile;