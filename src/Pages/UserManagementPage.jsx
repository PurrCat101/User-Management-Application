import { useState, useEffect } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { Layout, Table, Button, Select, Tag, Avatar } from "antd";
import usersData from "../usersData";
import Typography from "antd/es/typography/Typography";

const { Content } = Layout;
const { Option } = Select;

const UserManagementPage = () => {
  const [users, setUsers] = useState(usersData);
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [filters, setFilters] = useState({ role: "", plan: "", status: "" });
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate(); // Get navigate function

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/"); // Redirect to login if not logged in
    }
  }, [navigate]);
  const handleAddUser = () => {
    // Handle adding a new user
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
