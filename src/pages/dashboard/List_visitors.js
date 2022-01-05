import { Layout, Menu, Breadcrumb, Card,Table,Input,Divider } from "antd";
import {
  DashboardOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
//commons component
import HeaderPage from "../../parts/HeaderPage";
import SideNavigation from "../../parts/SideNavigation";
import FooterPage from "../../parts/FooterPage";
import "../../assets/css/layout.css";
import { useNavigate } from "react-router-dom";

//content List_visitors
import Statistics from "./Statistics";

const { SubMenu } = Menu;
const { Header, Content } = Layout;
const { Search } = Input;

function List_visitors() {
  const [data_visitors, setDataVisitors] = useState(null);
  const [total_data,setTotalData]=useState(null);
  //const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSerach] = useState('');
  const token =localStorage.getItem("token");
  const navigate = useNavigate();

  const backToDashboard = (event) => {
    navigate("/");
  };

  const handleChangeSearch=(event)=>{
    //alert("alert event change oke");
    ///event.target
    setSerach(event.target.value);
  }

  const search_data=()=>{
    //alert("searching..")
    axios
    .get(`http://localhost/dashboard-api/index.php/api/dashboard/data_visitors?page=${offset}&limit=${limit}&search=${search}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {       
      // console.log("user terdaftar:",res.data); 
      setDataVisitors(res.data.data)
      setTotalData(res.data.total_data);   
    })
    .catch((error) => {
      console.error(error);
    });
  }

  
  useEffect(() => {
    axios
      .get(`http://localhost/dashboard-api/index.php/api/dashboard/data_visitors?page=${offset}&limit=${limit}&search=${search}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((res) => {       
        console.log("user terdaftar:",res.data); 
        setDataVisitors(res.data.data)
        setTotalData(res.data.total_data);   
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    {
      title: 'Ip Adddress',
      dataIndex: 'ip_address',
      key: 'key',
    },
    {
      title: 'Tanggal Kunjungan',
      dataIndex: 'created_at',
      key: 'key',
    },
  ];

  const handleChangePagination = useCallback((pagination) => {
    console.log('all data pagination',pagination)
    
    //setPage(pagination.current);
    setOffset(pagination.current);
    setLimit(pagination.pageSize);
    axios
    .get(`http://localhost/dashboard-api/index.php/api/dashboard/data_visitors?page=${offset}&limit=${limit}&search=${search}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {       
      //console.log("user terdaftar:",res.data); 
      setDataVisitors(res.data.data) 
      setTotalData(res.data.total_data);     
    })
    .catch((error) => {
      console.error(error);
    });
    console.log('Offset',offset)
    console.log('limit sesuai button',limit)
    console.log('limit callback',pagination.pageSize)
    //console.log('limit',pagination.pageSize)
  });

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
              title="Data Pengunjung"
              bordered={false}
              style={{ width: 1000 }}
              extra={
                <button className="ant-btn" onClick={backToDashboard}>
                  Back To Dashboard
                </button>
              }
            >

              <Search
                placeholder="Search.."
                enterButton="Search"
                size="medium"
                style={{
                  width:400,
                  marginLeft:520,
                }}
                // suffix={suffix}
                onChange={handleChangeSearch}
                onSearch={search_data}
              />
              <Divider/>
              <Table 
               onChange={handleChangePagination}
               pagination={{
                //defaultPageSize: limit,
                pageSize: limit,
                showSizeChanger: true,
                //showQuickJumper: true,
                pageSizeOptions: ["5", "10", "15", "20"],
                total:total_data,
                showTotal: (total, range) =>
                    `${range[0]} sampai ${range[1]} data, dari total ${total} data`,
            }}
              dataSource={data_visitors} 
              columns={columns} 
              />

            </Card>
          </Content>
          <FooterPage />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default List_visitors;
