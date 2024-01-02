import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const MyPosts = () => {
  const [editingPostId, setEditingPostId] = useState(null);

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(window.innerWidth < 450);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    // Fetch previous posts when the component mounts
    const fetchPreviousPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        // Make a request to the API
        const response = await fetch('/suser/getmypost',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
console.log(data)
        // Assuming the response has a "posts" property
        setPosts(data.myPosts); // Update the state with the fetched posts
      } catch (error) {
        console.error('Error fetching previous posts:', error);
      }
    };

    fetchPreviousPosts();
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
  const handleCreatePost = async (values) => {
    try {
      const token = localStorage.getItem('token');

      // Make a request to the API to create a new post
      const response = await fetch('/suser/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          heading: values.heading,  // Include heading in the request
          body: values.content,        // Include body in the request
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the state with the newly created post
        setPosts((prevPosts) => [
          {
            id: data.post._id,
            owner: {
              name: 'Your Name',
              photo: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=new',
            },
            date: 'Just now',
            heading: values.heading,  // Set heading in the state
            body: values.body,        // Set body in the state
            likes: 0,
            bookmarks: 0,
            comments: [],
            showComments: false,
            isEditing: false,
          },
          ...prevPosts,
        ]
        );
        window.location.reload();

      } else {
        console.error('Error creating post:', data.message);
        // Handle error if needed
      }
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error if needed
    }
  };
  

  

  const handleEditPost = async (postId, newContent) => {
    try {
      const token = localStorage.getItem('token');

      // Make a request to the API to update the post
      const response = await fetch('/suser/updatepost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          _id: postId,
          body: newContent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the state with the edited post
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, content: newContent, isEditing: false } : post
          )
        );
        setEditingPostId(null); // Reset editingPostId after editing is complete
      } else {
        console.error('Error updating post:', data.message);
        // Handle error if needed
      }
    } catch (error) {
      console.error('Error updating post:', error);
      // Handle error if needed
    }
  };


  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');

      // Make a request to the API to delete the post
      const response = await fetch('/suser/deletePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: postId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the state by filtering out the deleted post
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        window.location.reload();
      } else {
        console.error('Error deleting post:', data.message);
        // Handle error if needed
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error if needed
    }
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

  const isSmallScreen = window.innerWidth < 500;
  const user_name1 = localStorage.getItem('username');
  const cardContent = (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(post) => (
          <Card
            key={post.id}
            style={{ marginBottom: 16 }}
            actions={[
              <Tooltip key="like" title="Like">
                <Button icon={<LikeTwoTone />} onClick={() => handleLike(post.id)}>
                  {post.likes.length}
                </Button>
              </Tooltip>,
              <Tooltip key="bookmark" title="Bookmark">
                <Button icon={<BookTwoTone />} onClick={() => handleBookmark(post.id)}>
                  {}
                </Button>
              </Tooltip>,
               <Button
               key="edit"
               type="primary"
               onClick={() => setEditingPostId(post.id)}
               disabled={editingPostId !== null}
             >
               Edit
             </Button>,
            
      
              <Button key="delete" type="danger" onClick={() => handleDeletePost(post._id)}>
                Delete
              </Button>,
            ]}
          >
             <Meta
                avatar={<Avatar src={'https://img.freepik.com/free-photo/blue-wall-background_53876-88663.jpg'} />}
                title={post.heading}
                description={post.body}
              />
              {editingPostId === post.id ? (
                <Form
                  name={`editPostForm-${post.id}`}
                  initialValues={{ content: post.content }}
                  onFinish={(values) => handleEditPost(post._id, values.content)}
                >
                  <Form.Item
                    noStyle
                    name="content"
                    rules={[{ required: true, message: 'Content is required' }]}
                  >
                    <Input.TextArea rows={2} placeholder="Edit your post..." style={{ width: '100%' }} />
                  </Form.Item>
                  <Button
                    key="edit"
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%', marginTop: '2px' }}
                  >
                    Save
                  </Button>
                </Form>
              ) : (
                <p>{post.content}</p>
              )}
            </Card>
        )}
      />
      <Card
        size="small"
        style={{ marginBottom: '16px' }}
        actions={[
          <Tooltip key="like" title="Like">
            <Button icon={<LikeTwoTone />} disabled>
              0
            </Button>
          </Tooltip>,
          <Tooltip key="bookmark" title="Bookmark">
            <Button icon={<BookTwoTone />} disabled>
              0
            </Button>
          </Tooltip>,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=new" />}
          title={`${user_name1}`}
          description="Just now"
        />
        <Form
          name="newPostForm"
          initialValues={{ content: '' }}
          onFinish={handleCreatePost}
        >
          <Form.Item
            name="heading"
            rules={[{ required: true, message: 'Heading is required' }]}
          >
            <Input placeholder="Enter heading" />
          </Form.Item>
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
        {isSmallScreen && (
          <Drawer
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
          >
            <Menu theme="dark" defaultSelectedKeys={['my-posts']} mode="inline" items={items} />
          </Drawer>)}
        ) : (
          <Menu
          theme="dark"
          defaultSelectedKeys={['my-posts']}
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
        )
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
          
          { cardContent }
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MyPosts;
