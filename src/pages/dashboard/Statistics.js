import { Statistic, Card, Row, Col, Button } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import "../../assets/css/dashboard/dashboard.css";
//import {withRouter} from 'react-router-dom'
import { useNavigate} from "react-router-dom";
const Statistics = (data_statistik) => {
  const navigate = useNavigate();
  if (data_statistik.data_statistik) {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
    };
    // console.log(
    //   "data statistik sub dashboard",
    //   data_statistik.data_statistik.num_of_registered_users
    // );

    const goToDetail = (event) => {
      const path = `/${event.target.value}`;
      //alert(e.target.value);
      navigate(path);
    };
    return (
      <>
        <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={12}>
              <Card
                extra={
                  <button className="ant-btn" onClick={goToDetail} value="list_registered_user">
                    Detail
                  </button>
                }
              >
                <Statistic
                  title="Jumlah User terdaftar"
                  value={data_statistik.data_statistik.num_of_registered_users}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="Orang"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                extra={
                  <button className="ant-btn" onClick={goToDetail} value="list_registered_user_on_today">
                    Detail
                  </button>
                }
              >
                <Statistic
                  title="Jumlah User Terdaftar Di hari ini"
                  value={
                    data_statistik.data_statistik
                      .num_of_registered_users_on_today
                  }
                  precision={0}
                  valueStyle={{ color: "blue" }}
                  prefix={<ArrowDownOutlined />}
                  suffix="Orang"
                />
              </Card>
            </Col>
          </Row>
        </div>

        <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={12}>
              <Card
                extra={
                  <button className="ant-btn" onClick={goToDetail} value="list_visitors">
                    Detail
                  </button>
                }
              >
                <Statistic
                  title="Jumlah Pengunjung"
                  value={data_statistik.data_statistik.num_of_visitors}
                  precision={0}
                  valueStyle={{ color: "yellow" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="Orang"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                extra={
                  <Button onClick={goToDetail} href="#">
                    Detail
                  </Button>
                }
              >
                <Statistic
                  title="Jumlah Pengunjung Di hari ini"
                  value={
                    data_statistik.data_statistik
                      .num_of_registered_user_on_today
                  }
                  precision={0}
                  valueStyle={{ color: "magenta" }}
                  prefix={<ArrowDownOutlined />}
                  suffix="Orang"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  } else {
    return "Sedang Memuat Data..";
  }
};

export default Statistics;
