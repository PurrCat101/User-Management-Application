# React + Vite User Management Application with Filtering and Authentication

This project demonstrates a user management dashboard built with React, Vite, and Ant Design.

## Features

- **Filter Feature**: Easily search and filter users based on role, plan, and status.
- **Session Management**: Securely manage user sessions using localStorage.
- **Protected Routes**: Restrict access to specific routes (e.g., `/user-management`, `/add-user`) to logged-in users.
- **Authentication**:
  - Login page with username/password validation.
  - Logout functionality to clear sessions.
- **User Editing**: Allows editing of existing user data. When a user is selected for editing, the form is prefilled with the user's current data.
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
│   ├── EditUserPage.jsx   
├── Components/
│   ├── Header.jsx
└── usersData.js
```
### How to use
- **Clone the Repository**
```git clone https://github.com/your-username/user-management-system.git
cd user-management-system```
- **Install Dependencies**
``` npm install ```
- **Run the Application**
``` npm run dev ```


