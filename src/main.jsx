import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserManagementPage from "./Pages/UserManagementPage.jsx";
import AddUserPage from "./Pages/AddUserPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
