import React from 'react';
import { Row, Col, Card, Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 引入样式文件

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <Row justify="center" align="middle" style={{minHeight:'100vh'}}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <Card className="login-card">
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Title level={3} style={{ color: '#76EDFF',fontWeight:'bold' }}>
                登录
              </Title>
            </div>
            <Form
              name="login"
              onFinish={(values) => {
                console.log('Received values: ', values);
                message.success('登陆成功')
                navigate('/admin/screen'); // 登录后跳转
              }}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please enter your username!' }]}
              >
                <Input placeholder="用户名" className="login-input" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password placeholder="密码" className="login-input" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-button"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
