import React from "react";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={styles.LoginPage}>
      <div className={styles.background}></div>

      <div className={styles.loginContainer}>
        <h1>RYZEN</h1>
        <input className={styles.inputField} type="text" placeholder="อีเมลหรือชื่อผู้ใช้" />
        <input className={styles.inputField} type="password" placeholder="รหัสผ่าน" />

        <Link to="/forgotpassword" className={styles.forgotPassword}>Forgot password</Link>
        <button className={styles.loginBtn}>เข้าสู่ระบบ</button>
        <Link to="/register" className={styles.signupBtn}>สมัครสมาชิก</Link>

        <div className={styles.socialLogin}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
