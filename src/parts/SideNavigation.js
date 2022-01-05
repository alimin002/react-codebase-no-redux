import { Layout, Menu} from 'antd';
import { DashboardOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {Link } from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;

function SideNavigation() {
  const handleLogout=(e)=>{
        window.location.reload();
        localStorage.clear();
  }
  return (
    <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
         
          <Menu.Item key="4" icon={<DashboardOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
         
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Configuration">
            <Menu.Item key="5">
              <Link to="/change_password">Change Password</Link>
            </Menu.Item>
            
          </SubMenu>
          
        </Menu>
      </Sider>
  );
}

export default SideNavigation;
