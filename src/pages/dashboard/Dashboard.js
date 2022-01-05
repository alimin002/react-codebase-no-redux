import { Layout, Menu, Breadcrumb,Card } from "antd";
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

//content dashboard
import Statistics from "./Statistics";

const { SubMenu } = Menu;
const { Header, Content } = Layout;

function Dashboard() {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    const token =localStorage.getItem("token");
    axios
      .get("http://localhost/dashboard-api/index.php/api/dashboard/data_summary", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log("message",res.data.message)
        if(res.data.data){
          if(res.data.status=="success"){
            console.log(res.data.data.num_of_visitors);
            setSummary(res.data.data)
          }
        }else{
          alert(res.data.message+",Anda akan di redirect ke login kembali");
          localStorage.clear(); 
          window.location.reload();
        }
        
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
            <Card title="Dashboard" bordered={false} style={{ width: 1000 }}>
              <Statistics data_statistik={summary} />
            </Card>
            
          </Content>
          <FooterPage />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
