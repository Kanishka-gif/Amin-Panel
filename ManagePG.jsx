// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   Modal,
//   Button,
//   Form,
//   Input,
//   Upload,
//   message,
//   Image,
// } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";

// const ManagePG = () => {
//   const [pgs, setPgs] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     fetchPGs();
//   }, []);

//   const fetchPGs = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/pgs");
//       console.log("PGs fetched:", res.data);
//       setPgs(res.data);
//       //alert("PGs fetched successfully!");
//     } catch (err) {
//       alert("Failed to fetch PGs");
//     }
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//     setSelectedFile(null);
//   };

//   const onFinish = async (values) => {
//     if (!selectedFile) {
//       alert("Please upload an image");
//       return;
//     }

//     const formData = new FormData();
//     Object.entries(values).forEach(([key, value]) =>
//       formData.append(key, value)
//     );
//     formData.append("image", selectedFile);

//     try {
//       await axios.post("http://localhost:3000/api/pgs/add", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("PG added successfully!");
//       fetchPGs();
//       setIsModalVisible(false);
//       form.resetFields();
//       setSelectedFile(null);
//     } catch (err) {
//       alert("Error adding PG");
//     }
//   };

//   const deletePG = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this PG?"
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:3000/api/pgs/${id}`);
//         fetchPGs(); 
//         alert("PG deleted successfully!");
//       } catch (err) {
//         alert("Error deleting PG");
//       }
//     }
//   };

//   const columns = [
//     { title: "PG Name", dataIndex: "name", key: "name" },
//     { title: "Location", dataIndex: "location", key: "location" },
//     { title: "Rent", dataIndex: "rent", key: "rent" },
//     { title: "Security", dataIndex: "security", key: "security" },
//     { title: "Facilities", dataIndex: "facilities", key: "facilities" },
//     { title: "Contact", dataIndex: "contact", key: "contact" },
// {
//   title: "Image",
//   dataIndex: "image",
//   key: "image",
//   render: (image) =>
//     image ? (
//       <Image width={100} src={`data:image/jpeg;base64,${image}`} />
//     ) : (
//       "No Image"
//     ),
// }
// ,
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Button type="primary" danger onClick={() => deletePG(record._id)}>
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "20px" }}>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <h2>PG Listings</h2>
//         <Button type="primary" onClick={showModal}>
//           Add PG
//         </Button>
//       </div>

//       <Table columns={columns} dataSource={pgs.pgs} rowKey="_id" />

//       <Modal
//         title="Add New PG"
//         open={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form form={form} onFinish={onFinish} layout="vertical">
//           <Form.Item name="name" label="PG Name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="location"
//             label="Location"
//             rules={[{ required: true }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item name="rent" label="Rent" rules={[{ required: true }]}>
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item name="facilities" label="Facilities">
//             <Input />
//           </Form.Item>
//           <Form.Item name="security" label="Security">
//             <Input />
//           </Form.Item>
//           <Form.Item name="contact" label="Contact">
//             <Input />
//           </Form.Item>
//           <Form.Item label="Upload PG Image" required>
//             <Upload
//               beforeUpload={(file) => {
//                 setSelectedFile(file);
//                 return false;
//               }}
//               showUploadList={{ showRemoveIcon: true }}
//               maxCount={1}
//             >
//               <Button icon={<UploadOutlined />}>Click to Upload</Button>
//             </Upload>
//           </Form.Item>
//           <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
//             Submit
//           </Button>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ManagePG;


import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  Upload,
  message,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ManagePG = () => {
  const [pgs, setPgs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingPG, setEditingPG] = useState(null); // NEW

  useEffect(() => {
    fetchPGs();
  }, []);

  const fetchPGs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/pgs");
      setPgs(res.data);
    } catch (err) {
      alert("Failed to fetch PGs");
    }
  };

  const showModal = (pg = null) => {
    setIsModalVisible(true);
    if (pg) {
      setEditingPG(pg);
      form.setFieldsValue(pg);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedFile(null);
    setEditingPG(null);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      if (editingPG) {
        await axios.put(`http://localhost:3000/api/pgs/${editingPG._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("PG updated successfully!");
      } else {
        if (!selectedFile) {
          alert("Please upload an image");
          return;
        }
        await axios.post("http://localhost:3000/api/pgs/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("PG added successfully!");
      }

      fetchPGs();
      setIsModalVisible(false);
      form.resetFields();
      setSelectedFile(null);
      setEditingPG(null);
    } catch (err) {
      alert("Error submitting form");
    }
  };

  const deletePG = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this PG?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/pgs/${id}`);
        fetchPGs();
        alert("PG deleted successfully!");
      } catch (err) {
        alert("Error deleting PG");
      }
    }
  };

  const columns = [
    { title: "PG Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Rent", dataIndex: "rent", key: "rent" },
    { title: "Security", dataIndex: "security", key: "security" },
    { title: "Facilities", dataIndex: "facilities", key: "facilities" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <Image width={100} src={`data:image/jpeg;base64,${image}`} />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deletePG(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>PG Listings</h2>
        <Button type="primary" onClick={() => showModal()}>
          Add PG
        </Button>
      </div>

      <Table columns={columns} dataSource={pgs.pgs} rowKey="_id" />

      <Modal
        title={editingPG ? "Edit PG" : "Add New PG"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="PG Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="rent" label="Rent" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="facilities" label="Facilities">
            <Input />
          </Form.Item>
          <Form.Item name="security" label="Security">
            <Input />
          </Form.Item>
          <Form.Item name="contact" label="Contact">
            <Input />
          </Form.Item>
          <Form.Item label="Upload PG Image" required={!editingPG}>
            <Upload
              beforeUpload={(file) => {
                setSelectedFile(file);
                return false;
              }}
              showUploadList={{ showRemoveIcon: true }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
            {editingPG ? "Update" : "Submit"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagePG;
