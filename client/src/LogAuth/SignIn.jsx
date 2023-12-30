import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import './Log.css';
import Typography from 'antd/es/typography/Typography';
import Registration from './Registration';
import { Link } from 'react-router-dom';
const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Add logic to handle sign-in here
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
          <Typography style={{justifyContent:'center', textAlign:'center', color:'GrayText  '}}>Don't have account 
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
