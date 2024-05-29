import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom"; // I
import Playground from "../assets/QA Playground.png";

const { Title } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Get navigate function from useNavigate

  const handleLogin = () => {
    // Check username and password
    if (username === "user" && password === "Password!1234") {
      // Successful login
      message.success("Logged in successfully!");
      navigate("/user-management");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username); // Navigate to /user-management route
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
      <div style={{ display: "flex" }}>
        <img
          src={Playground}
          alt="Login"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "0 20px" }}
      >
        <div style={{ maxWidth: 400 }}>
          <Title level={2}>Welcome to playground</Title>
          <Form name="loginForm" onFinish={handleLogin}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ message: "Please input your username!" }]}
            >
              <Input onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ message: "Please input your password!" }]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item>
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
