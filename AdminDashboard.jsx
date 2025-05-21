import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import { UserOutlined, HomeOutlined, MessageOutlined } from "@ant-design/icons";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPGs: 0,
    totalMessages: 0,
  });
    const [users, setUsers] = useState([]);
  const [pgs, setPg] = useState([]);
  const [contact, setContact] = useState([]);
  
console.log("AdminDashboard stats:", pgs);
  useEffect(() => {
      const fetchStats = async () => {
      try {
        const [usersRes, pgsRes, messagesRes] = await Promise.all([
          axios.get("http://localhost:3000/api/auth/users"), 
          axios.get("http://localhost:3000/api/pgs/count"),         
          axios.get("http://localhost:3000/api/contact/count"),    
        ]);
        setStats({
          totalUsers: usersRes,
          totalPGs: pgsRes.data.count,
          totalMessages: messagesRes.data.count,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
     
      }
    };

    fetchStats();
  }, []);
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/users");
      const res1 = await axios.get("http://localhost:3000/api/pgs");
      const res2 = await axios.get("http://localhost:3000/api/contact/messages");
      console.log("Fetched users:", res1);
      setUsers(res.data);
      setPg(res1.data);
      setContact(res2.data);
    } catch (err) {
      console.error("User fetch error", err);
      alert("Failed to fetch users");
    }
  };
    useEffect(() => {
     fetchUsers();
    }, []);
  return (
    <div>
      {/* <h1>Welcome to Admin Dashboard</h1> */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={users.count}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total PG Listings"
              value={pgs.count}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Contact Messages"
              value={contact.count}
              prefix={<MessageOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;



