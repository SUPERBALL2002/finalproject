import React, { useState } from "react";
import styles from "./Resetpassword.module.css"; // import CSS module

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ฟังก์ชันตรวจสอบความปลอดภัยของรหัสผ่าน
  const validatePassword = (password) => {
    const minLength = 8;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return password.length >= minLength && regex.test(password);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    // Clear previous error messages
    setError("");
  
    if (!validatePassword(newPassword)) {
      setError("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร ประกอบด้วยตัวเลข ตัวอักษร และสัญลักษณ์พิเศษ");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
  
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });
  
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "บางสิ่งผิดพลาด");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาด โปรดลองใหม่ภายหลัง");
    }
  };

  return (
    <div className={styles.resetpasswordcontainer}>
      <div className={styles["reset-password-wrapper"]}>
        <h2>เปลี่ยนรหัสผ่านใหม่</h2>
        {success ? (
          <div className={styles["reset-password-success"]}>
            Password has been reset successfully!
          </div>
        ) : (
          <form onSubmit={handlePasswordReset}>
            <div className={styles["reset-password-group"]}>
              <label htmlFor="newPassword">New Password</label>
              <div className={styles["password-input-container"]}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles["toggle-password-btn"]}
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <div className={styles["reset-password-group"]}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={styles["password-input-container"]}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles["toggle-password-btn"]}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

              <p className={styles["password-guidelines"]}>
                รหัสผ่านควรประกอบไปด้วย:
                <ul>
                  <li>ความยาวอย่างน้อย 8 ตัวอักษร</li>
                  <li>ตัวอักษรใหญ่และตัวอักษรเล็ก</li>
                  <li>ตัวเลขและสัญลักษณ์พิเศษ เช่น ! @ # $</li>
                </ul>
              </p>
            

            {error && <div className={styles["reset-password-error"]}>{error}</div>}
            <button type="submit" className={styles["reset-password-btn"]}>
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
