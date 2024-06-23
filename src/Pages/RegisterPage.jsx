import { useState } from "react";
import { Form, Input, Button, Select, Typography, message } from "antd";

const { Option } = Select;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Registration values:", values);
      setLoading(false);
      form.resetFields();
      message.success("Registration successful!");
    }, 1000);
  };

  const formContainerStyle = {
    maxWidth: "500px",
    margin: "50px 750px",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  };

  const passwordValidator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter a password"));
    }
    if (value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters")
      );
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one uppercase letter")
      );
    }
    if (!/\d/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one number")
      );
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one special character")
      );
    }
    return Promise.resolve();
  };

  return (
    <div style={formContainerStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography.Title level={2} style={{ marginBottom: 0 }}>
          Sign Up
        </Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: "16px" }}>
          or <a href="/">sign in</a> to your account
        </Typography.Text>
      </div>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        data-testid="register-form"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter a username!" }]}
        >
          <Input data-testid="username-input" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter an email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input data-testid="email-input" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ validator: passwordValidator }]}
        >
          <Input.Password data-testid="password-input" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password data-testid="confirm-password-input" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select data-testid="role-select">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            data-testid="submit-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
