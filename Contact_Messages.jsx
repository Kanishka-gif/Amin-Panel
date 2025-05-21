import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import axios from "axios";

const Contact_Messages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/contact/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching contact messages:", err);
      alert("Failed to load contact messages");
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Message", dataIndex: "message", key: "message" },
    // {
    //   title: "Date",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (text) => new Date(text).toLocaleString(),
    // },
  ];

  return (
    <>
      <h2>Contact Messages</h2>
      <Table
        columns={columns}
        dataSource={messages.contact}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default Contact_Messages;



