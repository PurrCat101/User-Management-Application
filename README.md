# React + Vite User Management Application with Filtering and Authentication

This project demonstrates a user management dashboard built with React, Vite, and Ant Design.

## Features

- **Filter Feature**: Easily search and filter users based on role, plan, and status.
- **Session Management**: Securely manage user sessions using localStorage.
- **Protected Routes**: Restrict access to specific routes (e.g., `/user-management`, `/add-user`) to logged-in users.
- **Authentication**:
  - Login page with username/password validation.
  - Logout functionality to clear sessions.
- **User Editing**: Inline editing of user data with a modal for convenient updates. (Upcomming)
- **User Delete**: Allow deletion of user.
- **Add user**: Allow to add new users to the system.

### Project Structure
```
project-root/
├── index.html
├── main.jsx       
├── package.json
├── vite.config.js
├── Pages/
│   ├── LoginPage.jsx
│   ├── UserManagementPage.jsx
│   ├── AddUserPage.jsx   
├── Components/
│   ├── Header.jsx
└── usersData.js
```
