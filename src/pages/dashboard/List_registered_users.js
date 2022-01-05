import { Layout, Menu, Breadcrumb, Card,Table } from "antd";
import {
  DashboardOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
//commons component
import HeaderPage from "../../parts/HeaderPage";
import SideNavigation from "../../parts/SideNavigation";
import FooterPage from "../../parts/FooterPage";
import "../../assets/css/layout.css";
import { useNavigate } from "react-router-dom";

//content List_registered_users
import Statistics from "./Statistics";

const { SubMenu } = Menu;
const { Header, Content } = Layout;

function List_registered_users() {
 
  const navigate = useNavigate();

  const backToDashboard = (event) => {
    navigate("/");
  };

  const [data_user_terdaftar, setDataUserTerdaftar] = useState(null);
  useEffect(() => {
    const token =localStorage.getItem("token");
    axios
      .get("http://localhost/dashboard-api/index.php/api/dashboard/data_registered_users", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((res) => {       
        console.log("user terdaftar:",res.data); 
        setDataUserTerdaftar(res.data.data)      
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'key',
    },
    {
      title: 'Tanggal Mendaftar',
      dataIndex: 'created_on',
      key: 'key',
    },
  ];

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
            <Card
              title="User Terdaftar"
              bordered={false}
              style={{ width: 1000 }}
              extra={
                <button className="ant-btn" onClick={backToDashboard}>
                  Back To Dashboard
                </button>
              }
            >
              <Table dataSource={data_user_terdaftar} columns={columns} />

            </Card>
          </Content>
          <FooterPage />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default List_registered_users;
