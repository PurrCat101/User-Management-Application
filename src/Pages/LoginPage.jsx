import { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import Playground from "../assets/QA Playground.png";

const { Title } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("Password1234!");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check username and password
    if (username === "username" && password === "Password1234!") {
      // Successful login
      message.success("Logged in successfully!");
      navigate("/user-management");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
    } else {
      // Failed login
      message.error("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={Playground}
          alt="Login"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "0 20px" }}
      >
        <div style={{ maxWidth: 600 }}>
          <Title level={2}>Welcome to playground</Title>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={handleLogin}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: false,
                  // bypass login change to true when doesn't bypass
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                onChange={(e) => setUsername(e.target.value)}
                defaultValue={"username"}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: false,
                  // bypass login change to true when doesn't bypass
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                defaultValue={"Password1234!"}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
