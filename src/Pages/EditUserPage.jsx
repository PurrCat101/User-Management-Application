import Header from "../Components/Header.jsx";
import { useEffect } from "react";
import { Form, Input, Radio, Select, Layout, Button, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const { Option } = Select;

function EditUserPage() {
  const formContainerStyle = {
    maxWidth: "500px",
    margin: "50px 750px",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  };

  const formItemStyle = {
    marginBottom: "20px",
  };

  const radioGroupStyle = {
    display: "flex",
    alignItems: "center",
  };

  const inputFieldStyle = {
    width: "100%",
  };

  const selectFieldStyle = {
    width: "100%",
  };

  const submitBtnStyle = {
    width: "100%",
    marginBottom: 10,
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};

  const [form] = Form.useForm();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/");
    }

    if (user) {
      form.setFieldsValue(user);
    }
  }, [navigate, user, form]);

  const onFinish = (values) => {
    const storedUsersDataString = localStorage.getItem("users");
    let storedUsersData = JSON.parse(storedUsersDataString) || [];

    // Find the index of the user being edited
    const userIndex = storedUsersData.findIndex((u) => u.email === user.email);

    // Update the user data
    storedUsersData[userIndex] = { ...storedUsersData[userIndex], ...values };

    // Update localStorage
    localStorage.setItem("users", JSON.stringify(storedUsersData));

    message.success("User edited successfully!");
    navigate("/user-management");
  };

  const handleBackToHome = () => {
    navigate("/user-management");
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Header />
      <div style={{ margin: "20px", textAlign: "left" }}>
        <Button type="link" icon={<LeftOutlined />} onClick={handleBackToHome}>
          Back
        </Button>
      </div>
      <div style={formContainerStyle}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            style={formItemStyle}
            name="avatar"
            label="Avatar"
            rules={[{ message: "Please input the avatar URL!" }]}
          >
            <Input style={inputFieldStyle} placeholder="Avatar URL" />
          </Form.Item>
          <Form.Item
            style={formItemStyle}
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Please input the full name!" }]}
          >
            <Input style={inputFieldStyle} placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            style={formItemStyle}
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Radio.Group style={radioGroupStyle}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            style={formItemStyle}
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input style={inputFieldStyle} placeholder="Email" />
          </Form.Item>
          <Form.Item
            style={formItemStyle}
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select style={selectFieldStyle} placeholder="Select Role">
              <Option value="Editor">Editor</Option>
              <Option value="Author">Author</Option>
              <Option value="Maintainer">Maintainer</Option>
              <Option value="Subscriber">Subscriber</Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={formItemStyle}
            name="plan"
            label="Plan"
            rules={[{ required: true, message: "Please select a plan!" }]}
          >
            <Select style={selectFieldStyle} placeholder="Select Plan">
              <Option value="Enterprise">Enterprise</Option>
              <Option value="Team">Team</Option>
              <Option value="Company">Company</Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={formItemStyle}
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select style={selectFieldStyle} placeholder="Select Status">
              <Option value="Active">Active</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button style={submitBtnStyle} type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={submitBtnStyle} onClick={handleReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}

export default EditUserPage;
