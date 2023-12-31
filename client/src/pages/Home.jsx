import React, { useState, useEffect } from 'react';
import {
  HomeOutlined,
  BookOutlined,
  LikeOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Card, Avatar, Input, Button, Tooltip, List } from 'antd';
import Comment from '@ant-design/compatible/lib/comment';
import {
  LikeTwoTone,
  BookTwoTone, 
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

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

const Home = () => {
  const [collapsed, setCollapsed] = useState(true);
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Sample posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      owner: {
        name: 'John Doe',
        photo: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
      },
      date: '2023-01-01',
      content: 'This is a sample post.',
      likes: 5,
      bookmarks: 2,
      comments: [
        { id: 1, author: 'Alice', content: 'Great post!' },
        { id: 2, author: 'Bob', content: 'I agree!' },
      ],
    },
    // Add more sample posts as needed
  ]);

  const handleLike = (postId) => {
    // Toggle like for the post with postId
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + (post.liked ? -1 : 1), liked: !post.liked } : post
      )
    );
  };

  const handleBookmark = (postId) => {
    // Toggle bookmark for the post with postId
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, bookmarks: post.bookmarks + (post.bookmarked ? -1 : 1), bookmarked: !post.bookmarked }
          : post
      )
    );
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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, textAlign: 'center', fontSize: '200%', fontFamily: "'Signika Negative', sans-serif", color: 'rgb(54, 3, 77)', textShadow: '2px 1px #9966ff' }}>Algo_Bulls </Header>
        <Content style={{ margin: '0 16px' }}>
          {posts.map((post) => (
            <Card
              key={post.id}
              style={{ marginBottom: '16px' }}
              actions={[
                <Tooltip key="like" title="Like">
                  <LikeTwoTone twoToneColor={post.liked ? '#eb2f96' : undefined} onClick={() => handleLike(post.id)} />
                  <span style={{ paddingLeft: 8 }}>{post.likes}</span>
                </Tooltip>,
                <Tooltip key="bookmark" title="Bookmark">
                  <BookTwoTone twoToneColor={post.bookmarked ? '#eb2f96' : undefined} onClick={() => handleBookmark(post.id)} />
                  <span style={{ paddingLeft: 8 }}>{post.bookmarks}</span>
                </Tooltip>,
                <Tooltip key="comment" title="Comment">
                  <CommentOutlined />
                  <span style={{ paddingLeft: 8 }}>{post.comments.length}</span>
                </Tooltip>,
              ]}
            >
              <Meta
                avatar={<Avatar src={post.owner.photo} />}
                title={post.owner.name}
                description={post.date}
              />
              <p>{post.content}</p>
              {post.comments.length > 0 && (
                <List
                  dataSource={post.comments}
                  renderItem={(comment) => (
                    <Comment
                      key={comment.id}
                      author={comment.author}
                      content={comment.content}
                    />
                  )}
                />
              )}
            </Card>
          ))}
          {/* Add a new post form */}
          <Card
            style={{ marginBottom: '16px' }}
            actions={[
              <Tooltip key="like" title="Like">
                <LikeTwoTone />
                <span style={{ paddingLeft: 8 }}>0</span>
              </Tooltip>,
              <Tooltip key="bookmark" title="Bookmark">
                <BookTwoTone />
                <span style={{ paddingLeft: 8 }}>0</span>
              </Tooltip>,
              <Tooltip key="comment" title="Comment">
                <CommentOutlined />
                <span style={{ paddingLeft: 8 }}>0</span>
              </Tooltip>,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=new" />}
              title="Your Name"
              description="Just now"
            />
            <Input.TextArea rows={4} placeholder="What's on your mind?" />
            <Button type="primary" style={{ marginTop: '8px' }}>
              Post
            </Button>
          </Card>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
