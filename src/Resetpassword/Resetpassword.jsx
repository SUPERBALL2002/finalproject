import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Resetpassword.module.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (message === "รีเซ็ตรหัสผ่านสำเร็จแล้ว!") {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [message]);

  useEffect(() => {
    if (countdown === 0 && message === "รีเซ็ตรหัสผ่านสำเร็จแล้ว!") {
      navigate("/login");
    }
  }, [countdown, message, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("รีเซ็ตรหัสผ่านสำเร็จแล้ว!");
        setCountdown(5);
      } else {
        setMessage(data.error || "เกิดข้อผิดพลาดบางอย่าง");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      setMessage("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className={styles.resetPasswordBg}>
      <div className={styles.resetPasswordCard}>
        <h2 className={styles.resetPasswordTitle}>รีเซ็ตรหัสผ่าน</h2>
        <form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
          <div>
            <label htmlFor="email" className={styles.resetPasswordLabel}>
              อีเมล
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.resetPasswordInput}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className={styles.resetPasswordLabel}>
              รหัสผ่านใหม่
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.resetPasswordInput}
              required
            />
          </div>
          <button type="submit" className={styles.resetPasswordBtn}>
            รีเซ็ตรหัสผ่าน
          </button>
        </form>
        {message && (
          <p className={styles.resetPasswordMessage}>
            {message}
            {message === "รีเซ็ตรหัสผ่านสำเร็จแล้ว!" && (
              <span> กำลังกลับไปหน้าเข้าสู่ระบบใน {countdown} วินาที...</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
