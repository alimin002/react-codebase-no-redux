import { Layout, Menu, Breadcrumb,Card } from 'antd';
import { DashboardOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

//commons component
import HeaderPage from '../../parts/HeaderPage';
import SideNavigation from '../../parts/SideNavigation';
import FooterPage from '../../parts/FooterPage';
import '../../assets/css/layout.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function ChangePassword() {
  const handleLogout=(e)=>{
        window.location.reload();
        localStorage.clear();
  }
  return (
    <Layout>
    <HeaderPage/>
    <Layout>
      <SideNavigation/>
      <Layout style={{ padding: '0 24px 24px' }}>
        
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Card title="Change Password" bordered={false} style={{ width: 1000 }}>
        </Card>
        </Content>
        <FooterPage/>
      </Layout>
    </Layout>
  </Layout>
  );
}

export default ChangePassword;
