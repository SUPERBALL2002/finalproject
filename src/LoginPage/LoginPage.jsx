import React, { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ ใช้ axios สำหรับเรียก API

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/users/login", {
        Username: username,
        Password: password,
      });

      const { token } = response.data;

      // ✅ เก็บ token ลง localStorage
      localStorage.setItem("userToken", token);

      // ✅ นำทางไปหน้า homepage
      navigate("/homepage");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  // ตรวจสอบ token ใน localStorage เมื่อโหลดหน้า
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      navigate("/homepage");
    }
  }, [navigate]);

  return (
    <div className={styles.LoginPage}>
      <div className={styles.background}></div>

      <div className={styles.loginContainer}>
        <h1>Welcome Kid</h1>
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
        <button className={styles.loginBtn} onClick={handleLogin}>
          เข้าสู่ระบบ
        </button>
        <Link to="/register" className={styles.signupBtn}>
          สมัครสมาชิก
        </Link>
        <Link to="/reset-password" className={styles.forgotPasswordLink}>
          ลืมรหัสผ่าน?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
