import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';

const Registration = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/suser/register', values);
      console.log('API Response:', response.data);
      // Add logic to handle successful registration
      message.success('Registration successful!');
    } catch (error) {
      console.error('API Error:', error.message);
      // Add logic to handle registration error
      message.error('Registration failed. Please try again.');
    }
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
              name="cpassword"
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
                <Button type="primary" danger size="large" htmlType="submit" style={{ width: '100%' }}>
                  Register
                </Button>
              </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
