import { Layout, Menu, Breadcrumb } from 'antd';
import { DashboardOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { useNavigate} from "react-router-dom";
const { SubMenu } = Menu;
const { Header } = Layout;

function HeaderPage() {
  const handleLogout=(e)=>{
        window.location.reload();
        localStorage.clear();
  }

  const navigate=useNavigate();

  const goToProfile=()=>{
    const my_username=localStorage.getItem("username");
    navigate("/profile");

  }
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">User & visitor activity Controller</Menu.Item>

        <Menu.Item 
        key="3" 
        style={{marginLeft:600}}
        onClick={handleLogout}
        >
            Logout
        </Menu.Item>
        <Menu.Item key="2" onClick={goToProfile}>{localStorage.getItem("username")}</Menu.Item>
      </Menu>
    </Header>
  );
}

export default HeaderPage;
