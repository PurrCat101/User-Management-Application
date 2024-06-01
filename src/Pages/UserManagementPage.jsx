import { useState, useEffect } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Table,
  Button,
  Select,
  Tag,
  Avatar,
  Space,
  Popconfirm,
} from "antd";
import usersData from "../usersData";
import Typography from "antd/es/typography/Typography";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

const UserManagementPage = () => {
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("users")) || usersData
  );
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filters, setFilters] = useState({ role: "", plan: "", status: "" });
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/");
    }

    // Store initial usersData in localStorage if it's not already there
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(usersData));
    }
  }, [navigate]);
  const handleAddUser = () => {
    navigate("/add-user");
  };

  const handleSearch = () => {
    const { role, plan, status } = filters;
    const filtered = users.filter((user) => {
      return (
        (role ? user.role === role : true) &&
        (plan ? user.plan === plan : true) &&
        (status ? user.status === status : true)
      );
    });
    setFilteredUsers(filtered);
  };

  const handleClear = () => {
    setFilters({ role: "", plan: "", status: "" });
    setFilteredUsers(users);
  };

  const handleFilterChange = (value, key) => {
    setFilters({ ...filters, [key]: value });
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const handleEdit = (record) => {
    // Add your edit logic here
    console.log("Edit", record);
  };

  const handleDelete = (record) => {
    const newUsers = users.filter((user) => user.email !== record.email);
    setUsers(newUsers);
    setFilteredUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Avatar src={avatar} />,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "geekblue";
        if (status === "Inactive") {
          color = "volcano";
        } else if (status === "Active") {
          color = "green";
        } else if (status === "Pending") {
          color = "gold";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Header />
      <Content
        style={{
          margin: "24px 16px",
          paddingLeft: 24,
          paddingRight: 24,
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <Typography.Title level={4}>Search Filters</Typography.Title>
        <div className="search-filters">
          <div style={{ display: "flex", marginBottom: 1 }}>
            <Select
              placeholder="Select Role"
              style={{ flex: 1, marginRight: 8 }}
              size="large"
              onChange={(value) => handleFilterChange(value, "role")}
              value={filters.role}
            >
              <Option value="">All Roles</Option>
              <Option value="Editor">Editor</Option>
              <Option value="Author">Author</Option>
              <Option value="Maintainer">Maintainer</Option>
              <Option value="Subscriber">Subscriber</Option>
            </Select>
            <Select
              placeholder="Select Plan"
              style={{ flex: 1, marginRight: 8 }}
              size="large"
              onChange={(value) => handleFilterChange(value, "plan")}
              value={filters.plan}
            >
              <Option value="">All Plans</Option>
              <Option value="Enterprise">Enterprise</Option>
              <Option value="Team">Team</Option>
              <Option value="Company">Company</Option>
            </Select>
            <Select
              placeholder="Select Status"
              style={{ flex: 1 }}
              size="large"
              onChange={(value) => handleFilterChange(value, "status")}
              value={filters.status}
            >
              <Option value="">All Statuses</Option>
              <Option value="Active">Active</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: 12,
              paddingBottom: 12,
            }}
          >
            <Button style={{ marginRight: 10 }} onClick={handleClear}>
              Clear
            </Button>
            <Button type="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </Content>
      <Content
        style={{
          margin: "12px 16px",
          padding: 24,
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="primary"
            onClick={handleAddUser}
            style={{ marginBottom: 16 }}
          >
            Add User
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            onShowSizeChange: handlePageSizeChange,
          }}
        />
      </Content>
    </Layout>
  );
};

export default UserManagementPage;
