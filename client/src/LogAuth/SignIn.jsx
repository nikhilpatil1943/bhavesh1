import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import './Log.css';
import Typography from 'antd/es/typography/Typography';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import Home from '../pages/Home';

const SignIn = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/suser/login', values);
      console.log('API Response:', response.data);

      // Extract the token from the API response
      const token = response.data.token;

      // Save the token to local storage
      localStorage.setItem('token', token);

      // Add logic to handle successful sign-in
      message.success('Sign-in successful!');

      // Redirect to the Home page
      navigate('/');
    } catch (error) {
      console.error('API Error:', error.message);
      // Add logic to handle sign-in error
      message.error('Sign-in failed. Please check your credentials and try again.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='lgbg' style={{display:'flex', height:'100vh'}}>
      <div style={{  }} className='formbox '>
        <h2 className='Title'   style={{ textAlign: 'center', marginBottom: '30px' }}>Algo Bulls</h2>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: true }}
        >
            <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" style={{height:'40px'}} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" style={{height:'40px'}} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: '15px' }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
          
          <Form.Item>
            <Button type="primary" danger htmlType="submit" size="large" style={{ width: '100%' }}>
              Sign In
            </Button>
          </Form.Item>
          <Form.Item>
            <Typography style={{justifyContent:'center', textAlign:'center', color:'GrayText  '}}>Don't have an account? 
              <div>
                <Link to="/Registration"> Sign Up</Link>
              </div>
            </Typography>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
