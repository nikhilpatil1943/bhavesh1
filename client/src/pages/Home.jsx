import React, { useState, useEffect } from 'react';
import {
  HomeOutlined,
  BookOutlined,
  LikeOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Card,
  Avatar,
  Input,
  Button,
  Tooltip,
  List,
} from 'antd';
import Comment from '@ant-design/compatible/lib/comment';
import { LikeTwoTone, BookTwoTone, CommentOutlined } from '@ant-design/icons';

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

  const [newComment, setNewComment] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLike = (postId) => {
    // Add your logic to handle liking a post
  };

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(`http://localhost:5000/suser/getallpost?page=${page}`);
      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (postId) => {
    // Add your logic to add a comment to a post
  };

  const toggleComments = (postId) => {
    // Add your logic to toggle comments for a post
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
        style={{
          position: 'fixed',
          height: '100vh',
          left: 0,
          zIndex: 1,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
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
          {posts.map((post) => (
            <Card
              key={post._id}
              size="small"
              style={{ marginBottom: '16px', marginTop: '10px' }}
              actions={[
                <Tooltip key="like" title={`Likes: ${post.likes.length}`}>
                  <LikeTwoTone
                    twoToneColor={post.liked ? '#eb2f96' : undefined}
                    onClick={() => handleLike(post.id)}
                  />
                </Tooltip>,
                <Tooltip key="bookmark" title="Bookmark">
                  <BookTwoTone />
                  <span style={{ paddingLeft: 8 }}>{post.bookmarks}</span>
                </Tooltip>,
                <Tooltip
                  key="comment"
                  title={post.showComments ? 'Hide Comments' : 'Show Comments'}
                  onClick={() => toggleComments(post.id)}
                >
                  <CommentOutlined />
                  <span style={{ paddingLeft: 8 }}>{post.comments.length}</span>
                </Tooltip>,
              ]}
            >
              <Meta title={post.heading} description={post.date} />
              <p>{post.body}</p>
              {post.showComments && (
                <div>
                  <List
                    dataSource={post.comments}
                    renderItem={(comment) => (
                      <Comment key={comment.id} author={comment.author} content={comment.content} />
                    )}
                  />
                  <div>
                    <Input.TextArea
                      rows={2}
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={handleCommentChange}
                    />
                    <Button
                      type="primary"
                      style={{ marginTop: '8px' }}
                      onClick={() => handleAddComment(post.id)}
                    >
                      Add Comment
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
          {loading && <p>Loading...</p>}
          {!loading && (
            <Button
              type="primary"
              style={{ marginTop: '16px' }}
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            >
              Load More
            </Button>
          )}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
