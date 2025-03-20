import React from "react";
import { useState } from "react";
import { login } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import '../App.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      console.log("API Response:", data); // Kiểm tra dữ liệu trả về từ API
      if (data.token) {
        localStorage.setItem("token", data.token); // Lưu token để xác thực
        setMessage("Đăng nhập thành công!");
        window.location.href ="/User"; // Chuyển tới trang user
      } else {
        setMessage("Đăng nhập thất bại! Không có token.");
      }
    } catch (error) {
      setMessage(error.message || "Lỗi đăng nhập! Kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="wrapper-login">
      <div className="Form-box-login">
        <h2 className="Login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="User">
            <label> UserName <FontAwesomeIcon icon={faUser} /> </label>
            <input
              type="text"
              placeholder="UserName..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="PassWord">
            <label> PassWord <FontAwesomeIcon icon={faLock} /> </label>
            <input
              type="password"
              placeholder="PassWord..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="Login-button">Login</button>

          {message && <p className="message">{message}</p>}

          <div className="Register-a">
            <p>
              Do not have an account?
              <a href="/register" className="Register-link"> Sign Up </a>
            </p>
          </div>

          <div>
             <a href="/login_admin" className="admin-login"> Admin? </a>
          </div>

        </form>
      </div>

      <div className="info-text-log">
        <h2 className="Welcom-back">Welcome Back!</h2>
        <p className="Welcom-back-content">
          Trở thành ZeziPluser <br /> Miễn phí sử dụng, dễ yêu
        </p>
      </div>
    </div>
  );
}