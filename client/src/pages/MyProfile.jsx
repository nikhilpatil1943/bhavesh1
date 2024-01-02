import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  BookOutlined,
  LikeOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Form, Input, Button, Card, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import { Layout, Menu, theme } from 'antd';

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
  getItem('Home', 'home', <HomeOutlined />),
  getItem('Bookmarks', 'my-bookmarks', <BookOutlined />),
  getItem('Likes', 'my-likes', <LikeOutlined />),
  getItem('Posts', 'my-posts', <ProfileOutlined />),
  getItem('User', 'my-profile', <UserOutlined />),
];

const MyProfile = () => {
  const navigate = useNavigate();
  const [editableEmail, setEditableEmail] = useState(false);
  const [userData, setUserData] = useState({});
  const [newEmail, setNewEmail] = useState(''); // State to store the new email input


  const [collapsed, setCollapsed] = useState(true);

  const toggleEditableEmail = () => {
    if (!editableEmail) {
      // Set newEmail to the current user's email when entering edit mode
      setNewEmail(userData.email || '');
    }
    setEditableEmail(!editableEmail);
  };

  const {
    token: { colorBgContainer },
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

    const fetchUserDetails = async () => {
      try {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
          navigate('/signin');
          return;
        }

        const response = await fetch('/suser/getmyprofile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error(error);
        message.error('Internal Server Error');
      }
    };

    fetchUserDetails();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  const handleMenuClick = (item) => {
    const { key } = item;
    navigate(`/${key}`);
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleUpdateEmail = async () => {
    try {
      const userToken = localStorage.getItem('token');
      if (!userToken) {
        navigate('/signin');
        return;
      }
  
      const response = await fetch('/suser/updateprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({ newEmail }), // Ensure newEmail is correctly set
      });
  
      if (response.ok) {
        const updatedUserData = await response.json();
        setUserData(updatedUserData.updatedUser);
        setEditableEmail(false);
        message.success('Email updated successfully');
        window.location.reload(); // Refresh the page
      } else {
        console.error('Failed to update email');
        message.error('Failed to update email. Please try again.');
      }
    } catch (error) {
      console.error(error);
      message.error('Internal Server Error');
    }
  };
  
  
  

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
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
              <div style={{ marginTop: 10, fontSize: 18 }}>{userData.username}</div>
            </div>

            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Name" colon={false}>
                <Input prefix={<UserOutlined />} value={userData.name} disabled />
              </Form.Item>

              <Form.Item label="Email" type='email' colon={false}>
                <Input
                  prefix={<MailOutlined />}
                  type='email'
                  value={editableEmail ? newEmail : userData.email}
                  disabled={!editableEmail}
                  onChange={handleEmailChange}
                />
                <Button type="link" onClick={toggleEditableEmail}>
                  {editableEmail ? 'Cancel' : 'Edit'}
                </Button>
                {editableEmail && (
                  <Button type="primary" style={{marginTop:'2px'}} onClick={handleUpdateEmail}>
                    Save
                  </Button>
                )}
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
