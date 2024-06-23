import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserManagementPage from "./Pages/UserManagementPage.jsx";
import AddUserPage from "./Pages/AddUserPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import EditUserPage from "./Pages/EditUserPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/user-management",
    element: <UserManagementPage />,
  },
  {
    path: "/add-user",
    element: <AddUserPage />,
  },
  {
    path: "/edit-user",
    element: <EditUserPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
