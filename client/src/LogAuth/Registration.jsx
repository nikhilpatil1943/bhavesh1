import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const history = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/suser/register', values);
      
      console.log('API Response:', response.data);

      // Extract the token from the API response
      const token = response.data.token;

      // Save the token to local storage
      localStorage.setItem('token', token);

      // Add logic to handle successful registration
      message.success('Registration successful! Redirecting to Sign In page.');

      // Redirect to SignIn page
      history('/signin');
    } catch (error) {
      console.error('API Error:', error.response.data.message);

      // Check if the error response indicates that the user already exists
      if (error.response && error.response.data && error.response.data.message === 'User already exists') {
        message.error('User already exists. Please sign in or use a different username/email.');
      } else {
        // Add logic to handle other registration errors
        message.error(`${error.response.data.message}`);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='lgbg' style={{ display: 'flex', height: '100vh' }}>
      <div className='formbox '>
        <h1 className="Title" style={{ textAlign: 'center', marginBottom: '20px', marginTop: '0px' }}>Register</h1>
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
