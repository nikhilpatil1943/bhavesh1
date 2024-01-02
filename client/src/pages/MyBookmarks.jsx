import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  Input,
  Button,
  Tooltip,
  List,
} from 'antd';
import { Comment as AntComment } from '@ant-design/compatible';
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
  getItem('Home', 'home', <HomeOutlined />),
  getItem('Bookmarks', 'my-bookmarks', <BookOutlined />),
  getItem('Likes', 'my-likes', <LikeOutlined />),
  getItem('Posts', 'my-posts', <ProfileOutlined />),
  getItem('User', 'my-profile', <UserOutlined />),
];

const MyBookmarks = () => {
  const navigate = useNavigate();
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
  const [commentCounts, setCommentCounts] = useState({});
  const handleLike = async (postId) => {
    try {
      // Assuming you have the token stored in localStorage or some other way
      const token = localStorage.getItem('token');
  
      const response = await fetch('/suser/likepost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: postId }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  liked: !post.liked,
                  likes: data.likes,
                }
              : post
          )
        );
      } else {
        console.error('Failed to like the post');
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };
  
  const handleAddComment = async (postId) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch('/suser/addcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: postId, comment: newComment }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Fetch all comments for the post after adding a new comment
        const commentsResponse = await fetch('/suser/getallcomments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: postId }),
        });
  
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
  
          // Update the state based on the previous state
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post._id === postId
                ? {
                    ...post,
                    comments: commentsData.comments,
                    showComments: true, // Assuming you want to show comments after adding a new one
                  }
                : post
            )
          );
  
          // Update commentCounts for the specific post
          setCommentCounts((prevCounts) => ({
            ...prevCounts,
            [postId]: commentsData.comments.length,
          }));
        } else {
          console.error(`Failed to fetch comments after adding a new comment. Status: ${commentsResponse.status}`);
        }
  
        setNewComment('');
      } else {
        console.error(`Failed to add comment. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };
  
  
  
  
  

// ...

const toggleComments = async (postId) => {
  try {
    const response = await fetch('/suser/getallcomments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: postId }),
    });

    if (response.ok) {
      const data = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: data.comments, showComments: !post.showComments }
            : post
        )
      );
    } else {
      console.error(`Failed to fetch comments. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching comments:', error.message);
  }
};


// ...


// ...

const fetchPosts = async (page) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`/suser/getmybookmarks`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    // Ensure that data.post is defined before trying to iterate over it
    if (data.post) {
      setPosts((prevPosts) => {
        const uniquePosts = new Map(prevPosts.map((post) => [post._id, post]));

        // Merge new posts with existing posts based on unique identifier (_id)
        data.post.forEach((newPost) => {
          uniquePosts.set(newPost._id, newPost);
        });

        // Convert Map back to an array of posts
        return Array.from(uniquePosts.values());
      });
    }

    setLoading(false);
  } catch (error) {
    console.error('Error fetching posts:', error);
    setLoading(false);
  }
};

// ...

  useEffect(() => {
    setLoading(true);
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleMenuClick = (item) => {
    const { key } = item;
    navigate(`/${key}`);
  };
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

  const handleProfileClick = () => {
    navigate('/my-profile'); // Redirect to the home page
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
        <Menu
          theme="dark"
          defaultSelectedKeys={['my-bookmarks']}
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
          <Menu.Item key="my-profile" icon={<LikeOutlined />} onClick={handleProfileClick}>
            MyProfile
          </Menu.Item>
          
        </Menu>
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
                    onClick={() => handleLike(post._id)}
                  />
                  <span style={{ paddingLeft: 8 }}>{post.likes.length}</span>
                </Tooltip>,
                <Tooltip key="bookmark" title="Bookmark">
                  <BookTwoTone />
                  <span style={{ paddingLeft: 8 }}>{}</span>
                </Tooltip>,
                <Tooltip
                  key="comment"
                  title={post.showComments ? 'Hide Comments' : 'Show Comments'}
                  onClick={() => toggleComments(post._id)}
                >
                  <CommentOutlined />
                  <span style={{ paddingLeft: 8 }}>{post.comments ? post.comments.length : commentCounts}</span>

                </Tooltip>,
              ]}
            >
              <Meta
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={'https://img.freepik.com/free-photo/blue-wall-background_53876-88663.jpg'} alt="User" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }} />
          <div>{post.heading}</div>
        </div>
      }
      description={`${post.date} by ${post.username}`}
    />
              <p>{post.body}</p>
              {post.showComments && (
                <div>
                  <List
                    dataSource={post.comments}
                    renderItem={(comment) => (
                      <AntComment
                        key={comment.username}
                        author={comment.username}
                        content={<p>{comment.comment}</p>}
                      />
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
                      onClick={() => handleAddComment(post._id)}
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

export default MyBookmarks;