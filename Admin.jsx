// import React, { useState, useEffect } from "react";
// import {
//   PieChartOutlined,
//   UserOutlined,
//   FileOutlined,
//   TeamOutlined,
//   HomeOutlined,
// } from "@ant-design/icons";
// import {
//   Breadcrumb,
//   Layout,
//   Menu,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Input,
//   theme,
//   Select,
// } from "antd";
// import axios from "axios";
// import "./index.css";
// import Contact_Messages from "./components/Contact_Messages";
// import ManagePG from "./components/ManagePG";
// import AdminDashboard from "./components/AdminDashboard";

// const storedUser = JSON.parse(localStorage.getItem("user"));
// const username = storedUser?.username || "Not logged in";
// const role = storedUser?.role || "";

// const { Header, Content, Footer, Sider } = Layout;

// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

// const items = [
//   getItem("Dashboard", "dashboard", <PieChartOutlined />),
//   getItem("Users", "users", <UserOutlined />),
//   getItem("PG Listings", "pgs", <HomeOutlined />),
//  // getItem("Bookings", "bookings", <FileOutlined />),
//   getItem("Contact_Messages", "contact_msg", <TeamOutlined />),
// ];

// const Admin = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedKey, setSelectedKey] = useState("dashboard");
//   const [users, setUsers] = useState([]);
//   const [form] = Form.useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/auth/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("User fetch error", err);
//       alert("Failed to fetch users");
//     }
//   };

//   useEffect(() => {
//     if (selectedKey === "users") fetchUsers();
//   }, [selectedKey]);

//   const handleFormSubmit = async (values) => {
//     try {
//       if (editingUser) {
//         await axios.put(
//           `http://localhost:3000/api/auth/users/${editingUser._id}`,
//           values
//         );
//         alert("User updated successfully");
//       } else {
//         await axios.post("http://localhost:3000/api/auth/register", values);
//         alert("User added successfully");
//       }
//       setIsModalOpen(false);
//       form.resetFields();
//       fetchUsers();
//       setEditingUser(null);
//     } catch (err) {
//       console.error("Failed to save user:", err);
//       alert("Failed to save user");
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:3000/api/auth/users/${id}`);
//         setUsers(users.filter((user) => user._id !== id));
//         alert("User deleted successfully");
//       } catch (err) {
//         console.error("Delete failed:", err);
//         alert("Failed to delete user");
//       }
//     }
//   };

//   const openEditModal = (user) => {
//     setEditingUser(user);
//     form.setFieldsValue(user);
//     setIsModalOpen(true);
//   };

//   const userColumns = [
//     { title: "Username", dataIndex: "username", key: "username" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },
//     { title: "Country", dataIndex: "country", key: "country" },
//     { title: "Role", dataIndex: "role", key: "role" },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <div style={{ display: "flex", gap: "10px" }}>
//           {role === "admin" && (
//             <>
//               <Button
//                 type="primary"
//                 size="small"
//                 onClick={() => openEditModal(record)}
//               >
//                 Edit
//               </Button>
//               <Button danger size="small" onClick={() => handleDelete(record._id)}>
//                 Delete
//               </Button>
//             </>
//           )}
//           {role === "editor" && (
//             <Button
//               type="primary"
//               size="small"
//               onClick={() => openEditModal(record)}
//             >
//               Edit
//             </Button>
//           )}
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//       >
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           selectedKeys={[selectedKey]}
//           mode="inline"
//           items={items}
//           onClick={({ key }) => setSelectedKey(key)}
//         />
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: "0 20px",
//             background: colorBgContainer,
//             textAlign: "right",
//           }}
//         >
//           <div>
//             <strong>{username}</strong>{" "}
//             {role && <span style={{ color: "black" }}>({role})</span>}
//           </div>
//         </Header>

//         <Content style={{ margin: "0 16px" }}>
//           <Breadcrumb style={{ margin: "16px 0" }}>
//             <Breadcrumb.Item>Admin</Breadcrumb.Item>
//             <Breadcrumb.Item>
//               {selectedKey.charAt(0).toUpperCase() + selectedKey.slice(1)}
//             </Breadcrumb.Item>
//           </Breadcrumb>
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             {selectedKey === "dashboard" && <h2>Welcome to Admin Dashboard</h2>}

//             {selectedKey === "users" && (
//               <>
//                 {(role === "admin" || role === "editor") && (
//                   <div style={{ textAlign: "right", marginBottom: 10 }}>
//                     {role === "admin" && (
//                       <Button
//                         type="primary"
//                         onClick={() => {
//                           setIsModalOpen(true);
//                           setEditingUser(null);
//                           form.resetFields();
//                         }}
//                       >
//                         Add User
//                       </Button>
//                     )}
//                   </div>
//                 )}

//                 <Table
//                   dataSource={users.map((u, i) => ({ ...u, key: u._id || i }))}
//                   columns={userColumns}
//                 />
//               </>
//             )}
//                 {selectedKey === "dashboard" && <AdminDashboard />}
//               {selectedKey === "contact_msg" && <Contact_Messages />}
//               {selectedKey === "pgs" && <ManagePG />}
//             {selectedKey !== "dashboard" && selectedKey !== "users" && selectedKey !== "contact_msg" &&  selectedKey !=="pgs" &&(
//               <p>Feature coming soon for: {selectedKey}</p>
//             )}

//           </div>
//         </Content>
//         <Footer style={{ textAlign: "center" }}>
//           Admin Panel ©{new Date().getFullYear()} Created by Kanishka Gupta UED
//         </Footer>
//       </Layout>

//       <Modal
//         title={editingUser ? "Edit User" : "Add User"}
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         onOk={() => form.submit()}
//         okText={editingUser ? "Update" : "Add"}
//       >
//         <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
//           <Form.Item
//             name="username"
//             label="Username"
//             rules={[{ required: true }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item name="email" label="Email" rules={[{ required: true }]}>
//             <Input type="email" />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: "Please input the password!" }]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="country"
//             label="Country"
//             rules={[{ required: true }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Role"
//             name="role"
//             rules={[{ required: true, message: "Please select a role!" }]}
//           >
//             <Select placeholder="Select role">
//               <Select.Option value="admin">Admin</Select.Option>
//               <Select.Option value="editor">Editor</Select.Option>
//               <Select.Option value="viewer">Viewer</Select.Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Layout>
//   );
// };

// export default Admin;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // react-router-dom ka use karo redirect ke liye
import {
  PieChartOutlined,
  UserOutlined,
  FileOutlined,
  TeamOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Table,
  Button,
  Modal,
  Form,
  Input,
  theme,
  Select,
} from "antd";
import axios from "axios";
import "./index.css";
import Contact_Messages from "./components/Contact_Messages";
import ManagePG from "./components/ManagePG";
import AdminDashboard from "./components/AdminDashboard";

const storedUser = JSON.parse(localStorage.getItem("user"));
const username = storedUser?.username || "";
const role = storedUser?.role || "";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem("Users", "users", <UserOutlined />),
  getItem("PG Listings", "pgs", <HomeOutlined />),
  // getItem("Bookings", "bookings", <FileOutlined />),
  getItem("Contact_Messages", "contact_msg", <TeamOutlined />),
];

const Admin = () => {
  const navigate = useNavigate(); // redirect ke liye hook
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/users");
      console.log("Fetched users:", res);
      setUsers(res.data);
    } catch (err) {
      console.error("User fetch error", err);
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    if (selectedKey === "users") fetchUsers();
  }, [selectedKey]);

  const handleFormSubmit = async (values) => {
    try {
      if (editingUser) {
        await axios.put(
          `http://localhost:3000/api/auth/users/${editingUser._id}`,
          values
        );
        alert("User updated successfully");
      } else {
        await axios.post("http://localhost:3000/api/auth/register", values);
        alert("User added successfully");
      }
      setIsModalOpen(false);
      form.resetFields();
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      console.error("Failed to save user:", err);
      alert("Failed to save user");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/auth/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        alert("User deleted successfully");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete user");
      }
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  // Logout button pe click hone par confirm modal show karna
  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  // Logout confirm hone par localStorage clear karke login pe redirect karna
  const handleLogoutConfirm = () => {
    localStorage.removeItem("user");
    setLogoutModalVisible(false);
    navigate("/login"); // login page ka route yahan daalo
  };

  const handleLogoutCancel = () => {
    setLogoutModalVisible(false);
  };

  const userColumns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {role === "admin" && (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => openEditModal(record)}
              >
                Edit
              </Button>
              <Button
                danger
                size="small"
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </Button>
            </>
          )}
          {role === "editor" && (
            <Button
              type="primary"
              size="small"
              onClick={() => openEditModal(record)}
            >
              Edit
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={({ key }) => setSelectedKey(key)}
        />
      </Sider>
      <Layout>
        <Header
          //   style={{
          //     padding: "0 20px",
          //     background: colorBgContainer,
          //     textAlign: "right",
          //     display: "flex",
          //     justifyContent: "flex-end",
          //     alignItems: "center",
          //     gap: "15px",
          //   }}
          // >
          style={{
            padding: "0 20px",
            background:"#f0f2f5",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "15px",
            height: 48, // Reduce height (default is ~64px)
            lineHeight: "48px", // Align text vertically
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)", // subtle shadow for separation
            borderBottom: "1px solid #f0f0f0", // subtle bottom border
          }}
        >
          {username ? (
            <>
              <div>
                <strong>{username}</strong>{" "}
                {role && <span style={{ color: "black" }}>({role})</span>}
              </div>
              <Button type="primary" danger onClick={showLogoutModal}>
                Logout
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>
              {selectedKey.charAt(0).toUpperCase() + selectedKey.slice(1)}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedKey === "dashboard" && <h2>Welcome to Admin Dashboard</h2>}

            {selectedKey === "users" && (
              <>
                {(role === "admin" || role === "editor") && (
                  <div style={{ textAlign: "right", marginBottom: 10 }}>
                    {role === "admin" && (
                      <Button
                        type="primary"
                        onClick={() => {
                          setIsModalOpen(true);
                          setEditingUser(null);
                          form.resetFields();
                        }}
                      >
                        Add User
                      </Button>
                    )}
                  </div>
                )}

                <Table
                  dataSource={users.users?.[0]}
                  columns={userColumns}
                />
              </>
            )}
            {selectedKey === "dashboard" && <AdminDashboard />}
            {selectedKey === "contact_msg" && <Contact_Messages />}
            {selectedKey === "pgs" && <ManagePG />}
            {selectedKey !== "dashboard" &&
              selectedKey !== "users" &&
              selectedKey !== "contact_msg" &&
              selectedKey !== "pgs" && (
                <p>Feature coming soon for: {selectedKey}</p>
              )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Admin Panel ©{new Date().getFullYear()} Created by Kanishka Gupta UED
        </Footer>
      </Layout>

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText={editingUser ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select placeholder="Select role">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="editor">Editor</Select.Option>
              <Select.Option value="viewer">Viewer</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={logoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Layout>
  );
};

export default Admin;
