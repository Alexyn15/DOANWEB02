import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './routes/Login';
import Register from './routes/Register';
import Logout from './routes/Logout';
import User from './routes/Users';
import Admin from './routes/admin';
import LoginAdmin from './routes/login_admin'; // Import LoginAdmin
import ProjectUser from './routes/project_user'; // Import ProjectUser

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="Login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="logout" element={<Logout />}/>
        <Route path="user" element={<User />}/>
        <Route path="admin" element={<Admin />}/>
        <Route path="login_admin" element={<LoginAdmin />}/> {/* Route cho LoginAdmin */}
        <Route path="/project_user" element={<ProjectUser />} /> {/* Định nghĩa route cho ProjectUser */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();