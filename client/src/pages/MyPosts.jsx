import React, { useState, useEffect } from 'react';
import {
  Layout,
  Menu,
  theme,
  Card,
  Avatar,
  Input,
  Button,
  Tooltip,
  List,
  Form,
  Table,
  Space,
  Drawer,
} from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  LikeOutlined,
  ProfileOutlined,
  UserOutlined,
  LikeTwoTone,
  BookTwoTone,
} from '@ant-design/icons';
import Comment from '@ant-design/compatible/lib/comment';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

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

const MyPosts = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 450);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 450);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [posts, setPosts] = useState([
    {
      id: 1,
      owner: {
        name: 'Your Name',
        photo: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=new',
      },
      date: 'Just now',
      content: 'This is a sample post content.',
      likes: 0,
      bookmarks: 0,
      comments: [
        { id: 1, author: 'Alice', content: 'Great post!' },
        { id: 2, author: 'Bob', content: 'I agree!' },
      ],
      showComments: false,
      isEditing: false,
    },
    // Add more posts as needed
  ]);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + (post.liked ? -1 : 1), liked: !post.liked }
          : post
      )
    );
  };

  const handleBookmark = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              bookmarks: post.bookmarks + (post.bookmarked ? -1 : 1),
              bookmarked: !post.bookmarked,
            }
          : post
      )
    );
  };

  const toggleComments = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  const handleEditPost = (postId, newContent) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, content: newContent, isEditing: false } : post
      )
    );
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const expandedRowRender = (record) => (
    <List
      dataSource={record.comments}
      renderItem={(comment) => (
        <Comment key={comment.id} author={comment.author} content={comment.content} />
      )}
    />
  );

  const columns = [
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (owner) => (
        <Space size="middle">
          <Avatar src={owner.photo} />
          {owner.name}
        </Space>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (text, record) => (
        record.isEditing ? (
          <Form
            name={`editPostForm-${record.id}`}
            initialValues={{ content: record.content }}
            onFinish={(values) => handleEditPost(record.id, values.content)}
          >
            <Form.Item
              noStyle
              name="content"
              rules={[{ required: true, message: 'Content is required' }]}
            >
              <Input.TextArea rows={2} placeholder="Edit your post..." style={{ width: '100%' }} />
            </Form.Item>
            <Button key="edit" type="primary" htmlType="submit" style={{ width: '100%', marginTop: '2px' }}>
              Save
            </Button>
          </Form>
        ) : (
          text
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Like">
            <Button
              icon={<LikeTwoTone />}
              onClick={() => handleLike(record.id)}
            >
              {record.likes}
            </Button>
          </Tooltip>
          <Tooltip title="Bookmark">
            <Button
              icon={<BookTwoTone />}
              onClick={() => handleBookmark(record.id)}
            >
              {record.bookmarks}
            </Button>
          </Tooltip>
          <Button
            key="edit"
            type="primary"
            onClick={() => setPosts((prevPosts) =>
              prevPosts.map((post) =>
                post.id === record.id ? { ...post, isEditing: !post.isEditing } : post
              )
            )}
          >
            Edit
          </Button>
          <Button
            key="delete"
            type="danger"
            onClick={() => handleDeletePost(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const responsiveColumns = columns.map((col) => ({
    ...col,
    responsive: ['xs', 'sm'],
  }));

  const tableContent = (
    <>
      <Table
        columns={responsiveColumns}
        dataSource={posts}
        expandable={{ expandedRowRender, rowExpandable: (record) => record.comments && record.comments.length > 0 }}
      />
      <Card
        size="small"
        style={{ marginBottom: '16px' }}
        actions={[
          <Tooltip key="like" title="Like">
            <Button icon={<LikeTwoTone />} disabled />
            <span style={{ paddingLeft: 8 }}>0</span>
          </Tooltip>,
          <Tooltip key="bookmark" title="Bookmark">
            <Button icon={<BookTwoTone />} disabled />
            <span style={{ paddingLeft: 8 }}>0</span>
          </Tooltip>,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=new" />}
          title="Your Name"
          description="Just now"
        />
        <Form
          name="newPostForm"
          initialValues={{ content: '' }}
          onFinish={(values) => {
            setPosts((prevPosts) => [
              {
                id: prevPosts.length + 1,
                owner: {
                  name: 'Your Name',
                  photo: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=new',
                },
                date: 'Just now',
                content: values.content,
                likes: 0,
                bookmarks: 0,
                comments: [],
                showComments: false,
                isEditing: false,
              },
              ...prevPosts,
            ]);
          }}
        >
          <Form.Item
            name="content"
            rules={[{ required: true, message: 'Content is required' }]}
          >
            <Input.TextArea rows={4} placeholder="What's on your mind?" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </Form>
      </Card>
    </>
  );

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
        {window.innerWidth < 450 ? (
          <Drawer
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
          >
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
          </Drawer>
        ) : (
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        )}
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
        <Content style={{ margin: '0 16px' }}>
          {window.innerWidth < 450 ? (
            <Button
              type="primary"
              onClick={() => setDrawerVisible(true)}
              style={{ marginBottom: '16px' }}
            >
              Open Menu
            </Button>
          ) : null}
          {tableContent}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MyPosts;
