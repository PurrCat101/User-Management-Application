import usersData from "../usersData";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const ComponentHeader = () => {
  const navigate = useNavigate(); // Get the navigate function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    // Reset user data to default
    localStorage.setItem("users", JSON.stringify(usersData));

    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        backgroundColor: "#fff",
        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="logo" />
      <Menu mode="horizontal" defaultSelectedKeys={["1"]} style={{ flex: 1 }}>
        <Menu.Item key="1">User Management</Menu.Item>
      </Menu>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Avatar
          style={{ backgroundColor: "#87d068", cursor: "pointer" }}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </Header>
  );
};

export default ComponentHeader;
