import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Forgotpassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError("❌ รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }

    setEmailError("");
    setShowMessage(true);

    let timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.forgotPasswordBox}>
        <h1>🔑 ลืมรหัสผ่าน</h1>
        <p className={styles.forgotPasswordDescription}>
          กรุณากรอกอีเมลของคุณเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่
        </p>

        <form onSubmit={handleSubmit}>
          <input
            className={styles.forgotPasswordInput}
            type="email"
            placeholder="📩 กรอกอีเมลของคุณ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className={styles.forgotPasswordError}>{emailError}</p>}
          
          <button className={styles.forgotPasswordButton} type="submit">
            🚀 ส่ง
          </button>
        </form>

        {showMessage && (
          <div className={styles.forgotPasswordMessage}>
            <p>✅ ลิงก์รีเซ็ตรหัสผ่านถูกส่งไปยังอีเมลของคุณแล้ว</p>
            <p className={styles.forgotPasswordCountdown}>กำลังเปลี่ยนไปยังหน้าล็อกอินใน {countdown} วินาที...</p>
          </div>
        )}

        <div className={styles.forgotPasswordBack}>
          <a href="/login">🔙 กลับไปยังหน้าเข้าสู่ระบบ</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
