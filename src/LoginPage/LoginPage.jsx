import React, { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const mockUser = { username: "testuser", password: "123456" };

    if (username === mockUser.username && password === mockUser.password) {
      // ตั้งค่า userToken เป็น "loggedIn"
      localStorage.setItem("userToken", "loggedIn");
      navigate("/homepage"); 
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อโหลดหน้า
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken === "loggedIn") {
      navigate("/homepage"); // หากเข้าสู่ระบบแล้ว ให้นำทางไปยังหน้า homepage
    }
  }, [navigate]);

  return (
    <div className={styles.LoginPage}>
      <div className={styles.background}></div>

      <div className={styles.loginContainer}>
        <h1>RYZEN</h1>
        <input
          className={styles.inputField}
          type="text"
          placeholder="อีเมลหรือชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        
        <Link to="/forgotpassword" className={styles.forgotPassword}>
          Forgot password
        </Link>
        <button className={styles.loginBtn} onClick={handleLogin}>
          เข้าสู่ระบบ
        </button>
        <Link to="/register" className={styles.signupBtn}>
          สมัครสมาชิก
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
