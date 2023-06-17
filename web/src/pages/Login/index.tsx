import { Form, Input, Button, Avatar, Col, Row, Checkbox } from 'antd';
import AppLogo from '@/assets/images/logo.png';
import '@/assets/scss/pages/login.scss';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form name="login-form" initialValues={{ remember: true }} onFinish={onFinish} className="login">
      <div className="login__logo">
        <Avatar shape="square" style={{ height: 120, width: 120 }} src={AppLogo} />
      </div>

      <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" danger htmlType="submit" block>
          Log in
        </Button>
      </Form.Item>

      <div>
        <Row>
          <Col span={12}>
            <Link to="/auth/register">Register now!</Link>
          </Col>
          <Col span={12}>
            <Link to="/auth/forgot-password">Forgot password?</Link>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default LoginPage;
