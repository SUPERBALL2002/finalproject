import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { mockUsers } from "../mockData_user"; // Import the updated mock users

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      navigate("/homepage"); // เปลี่ยนเส้นทางไปยังหน้าหลักหลังล็อกอินสำเร็จ
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

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
        {error && <p className={`${styles.error} ${styles.errorRed}`}>{error}</p>}
        
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
