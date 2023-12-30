// Registration.js
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const Registration = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Add logic to handle registration here
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='lgbg' style={{display:'flex', height:'100vh'}}>
    <div className='formbox '>
      <h1 className="Title"style={{ textAlign: 'center', marginBottom: '20px' , marginTop:'0px'}}>Register</h1>
      <Form
        name="registration"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input placeholder="First Name" style={{height:'40px'}} />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input placeholder="Last Name" style={{height:'40px'}}/>
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" style={{height:'40px'}}/>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input placeholder="Email" style={{height:'40px'}}/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" style={{height:'40px'}}/>
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password"  style={{height:'40px'}}/>
        </Form.Item>

        <Form.Item name="agreement" valuePropName="checked" style={{ marginBottom: '15px' }}>
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" danger size="large" submit style={{ width: '100%' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default Registration;
