import { Layout, Menu, Image, Card, Divider, Form, Input, Button,Modal,Upload,message } from "antd";
import {
  DashboardOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UploadOutlined 
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
//commons component
import HeaderPage from "../../parts/HeaderPage";
import SideNavigation from "../../parts/SideNavigation";
import FooterPage from "../../parts/FooterPage";
import "../../assets/css/layout.css";

//modal
import ModalEdit from "./ModalEdit"

const { Header, Content } = Layout;
const token=localStorage.getItem("token");

function Profile() {
  // alert(123);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [user_code, setUserCode] = useState(localStorage.getItem('user_code'));
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [isModalFotoVisible, setIsModalFotoVisible] = useState(false);

  const openModalEdit=()=>{
    setIsModalVisible(true);
    
  }

  const openModalFoto=()=>{
    setIsModalFotoVisible(true);
    
  }

  const saveProfile = () => {

    var dataPost={
      "username": username,
      "user_code": user_code,
      
    }
    
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`            
      }
    };

    axios.post('http://localhost/dashboard-api/index.php/api/profile/saveProfile', dataPost, options)
    .then((res) => {
      //console.log(res.data.message);
     
      message.success({
        content:res.data.message,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
     
    }).catch((err) => {
      alert("ERROR: ====", err);
    })
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOkModalFoto = () => {
    setIsModalFotoVisible(false);
  };

  const handleCancelModalFoto = () => {
    setIsModalFotoVisible(false);
  };

 

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  const showModalChangeImage=()=>{
      setIsModalFotoVisible(true);
  }

  const handleUsername=(e)=>{
    //console.log(e.target.value);
    setUsername(e.target.value);

  }
 



  return (
    <Layout>
      <HeaderPage />
      <Layout>
        <SideNavigation />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Card title="Profile" bordered={false} style={{ width: 1000 }}>
              
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label=""
                  name="foto"
                  style={{paddingLeft:300}}
                >
              <Image
                preview={{ visible: false }}
                width={200}
                src="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"
                onClick={showModalChangeImage}
              />
                  
                </Form.Item>
                
              <Divider />
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Input defaultValue={localStorage.getItem('username')} readOnly/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="button" onClick={openModalEdit}>
                    Edit
                  </Button>
                </Form.Item>
              </Form>
              <Modal 
                title="Edit Profile" 
                okText="Simpan" 
                cancelText="Batal" 
                visible={isModalVisible} 
                onOk={saveProfile} 
                onCancel={handleCancel}>                 
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                  >
                      <Form.Item
                        label="Username"
                        name="username"
                      >
                        <Input onChange={handleUsername} defaultValue={localStorage.getItem('username')}/>
                      </Form.Item>
                      <Form.Item
                        label="User code"
                        name="user_code"
                      >
                        <Input defaultValue={localStorage.getItem('user_code')} readOnly/>
                      </Form.Item>
                  </Form>
              </Modal>

              <Modal title="Ganti Foto" okText="Simpan" cancelText="Batal" visible={isModalFotoVisible} onOk={handleOkModalFoto} onCancel={handleCancelModalFoto}>                 
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              </Modal>
            </Card>
          </Content>
          <FooterPage />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Profile;
