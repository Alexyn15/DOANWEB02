// Register.js - Form đăng ký
import "../App.css";
import { useState } from "react";
import { register } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await register(name, email, password);
      setMessage("Đăng ký thành công! Hãy đăng nhập.");
      console.log("Dữ liệu trả về:", data);
    } catch (error) {
      setMessage(error.message || "Lỗi đăng ký! Kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="wrapper-logout">
    <div className="Form-box-logout">
        <h2 className="Logout-title">Register</h2>
            <form action="" onSubmit={handleRegister}>
                <div className="User" >
                    <label> UserName <FontAwesomeIcon icon={faUser} /> </label>                    
                    <input type="text" placeholder="UserName..." required value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="Email">
                    <label> Email <FontAwesomeIcon icon={faEnvelope} /> </label>    
                    <input type="text" placeholder="Email..." required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="PassWord">
                    <label> PassWord <FontAwesomeIcon icon={faLock} /> </label>    
                    <input type="password" placeholder="PassWord..." required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit" className="Logout-button" >Register</button>
                <div className="Login-a">
                    <p>
                        Already have an account?
                        <a href="Login" className="Login-link"> Login </a>
                    </p>
                </div>
            </form>      
    </div>

    <div className="info-text-log">
        <h2 className="Welcom-back">Welcom  Back!</h2>
            <p className="Welcom-back-content">
                Trở thành ZeziPluser <br /> Miễn phí sử dụng, dễ yêu
            </p>
    </div>
</div>

  );
}