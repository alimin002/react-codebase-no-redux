import { Form, Input, Button, Checkbox,Layout,Divider,Col} from "antd";
//css zone
import "antd/dist/antd.css";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from 'axios';
import React, { useState } from 'react';
const { Header, Footer, Sider, Content } = Layout;

function Login() {
  const [page, setPage] = useState(1);


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    //e.preventDefault();

    // localStorage.setItem("username", "Alimin");
    // window.location.reload();
    //alert("button handled")
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleLogin=()=>{
    var dataPost={
      "username": username,
      "password": password,
      
    }
    
    const options = {
      headers: {
          'Content-Type': 'application/json',            
      }
    };

    axios.post('http://localhost/dashboard-api/index.php/api/login/doLogin', dataPost, options)
    .then((res) => {
      console.log("response message",res)
      if(res.data.status=="success"){
        localStorage.setItem('username',res.data.username)
        localStorage.setItem('user_code',res.data.user_code)
        localStorage.setItem('token',res.data.token)
        window.location.reload();

      }else{
        alert(res.data.message);
        //console.log(res.data.message)
      }
     
    }).catch((err) => {
      alert("ERROR: ====", err);
    })
  }

  return (
    <div>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          Header
        </Header>

        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Col style={{ background: "#fff", padding: 24, minHeight: 380 }} span={8}>
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[
                    { required: true, message: "Please input your Username!" },
                    ]}
                >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  onInput={e => setUsername(e.target.value)}
                />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    { required: true, message: "Please input your Password!" },
                    ]}
                >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onInput={e => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleLogin}
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Col>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Footer</Footer> */}
      </Layout>
    </div>
  );
}
export default Login;
