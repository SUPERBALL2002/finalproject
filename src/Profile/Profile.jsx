import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const UserProfile = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("⏳ กำลังโหลด...");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔍 คุณอยู่ที่หน้าโปรไฟล์");
  }, []);

  useEffect(() => {
    const updateStatus = () => {
      setStatus(navigator.onLine ? "🟢 ออนไลน์" : "🔴 ออฟไลน์");
    };
    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  useEffect(() => {
    const calculateProgress = () => {
      let completedFields = 4;
      let totalFields = 5;
      setProgress((completedFields / totalFields) * 100);
    };
    calculateProgress();
  }, []);

  return (
    <div className={styles.userProfileContainer}>
      <header className={styles.userProfileHeader}>
        <button className={styles.userProfileBackButton} onClick={() => navigate("/homepage")}>
          🔙
        </button>
        <h1>โปรไฟล์ของฉัน</h1>
      </header>
  
      <div className={styles.userProfileMainContainer}>
        <div className={styles.userProfileInfoCard}>
          <h3>👦 ชื่อของฉัน</h3>
          <p><strong>📧 อีเมล:</strong> example@email.com</p>
          <p><strong>📞 เบอร์โทร:</strong> 098-7654321</p>
          <p><strong>🎂 วันเกิด:</strong> 1 มกราคม 2012</p>
          <p><strong>🏡 ที่อยู่:</strong> กรุงเทพฯ, ไทย</p>
          <p><strong>🦸 สถานะ:</strong> <span className={styles.userProfileStatus}>{status}</span></p>
          <div className={styles.userProfileProgressContainer}>
            <div className={styles.userProfileProgressLabel}>📊 โปรไฟล์สมบูรณ์: <span>{progress}%</span></div>
            <div className={styles.userProfileProgressBar}>
              <div className={styles.userProfileProgress} style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
  
        <div className={styles.userProfileSettingsCard}>
          <Link to="/account-settings">
            <button className={`${styles.userProfileButton} ${styles.userProfileEditButton}`}>
              ⚙️ ตั้งค่าบัญชี
            </button>
          </Link>
          <Link to="/score">
            <button className={`${styles.userProfileButton} ${styles.userProfileViewScore}`}>
              🌟 คะแนนของฉัน
            </button>
          </Link>
        </div>
      </div>
    </div>
  );  
};

export default UserProfile;
