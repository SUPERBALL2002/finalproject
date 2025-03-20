import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UserProfile = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("⏳ กำลังโหลด...");
  const [showPopup, setShowPopup] = useState(false); // state สำหรับ popup
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowPopup(true); // แสดง popup
  };

  const confirmLogout = () => {
    setShowPopup(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowPopup(false);
  };

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
      let completedFields = 5;
      let totalFields = 6;
      setProgress((completedFields / totalFields) * 100);
    };
    calculateProgress();
  }, []);

  const subjectProgress = {
    คณิตศาสตร์: 80,
    วิทยาศาสตร์: 65,
    ภาษาไทย: 80,
    ภาษาอังกฤษ: 90,
  };

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
          <h3>👦 การัณยภาส พิศาลสาสน์ </h3>
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

        <div className={styles.userProfileStatsCard}>
          <h3>🏆 สถิติการเล่น</h3>
          <p><strong>🎮 เกมที่เล่น:</strong> 50</p>
          <p><strong>🏅 คะแนนสูงสุด:</strong> 9800</p>
          <p><strong>🥇 ชนะ:</strong> 25 ครั้ง</p>
          <div className={styles.userProfileChart}>
            <h3>📊 ความสำเร็จในแต่ละวิชา</h3>
            <div className={styles.userProfileSubjectProgressRow}>
              {Object.entries(subjectProgress).map(([subject, percentage]) => (
                <div key={subject} className={styles.userProfileSubjectProgressItem}>
                  <div className={styles.userProfileCircularProgressContainer}>
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        textSize: "14px",
                        pathColor: "var(--circular-path-color, #4caf50)",
                        textColor: "var(--circular-text-color, #333)",
                        trailColor: "var(--circular-trail-color, #d6d6d6)",
                      })}
                    />
                  </div>
                  <p className={styles.userProfileSubjectLabel}>{subject}</p>
                </div>
              ))}
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
          <button className={styles.userProfileLogoutButton} onClick={handleLogout}>
            🚪 ออกจากระบบ
          </button>
        </div>
      </div>

      {showPopup && (
        <div className={styles.userProfileLogoutPopup}>
          <div className={styles.userProfilePopupContent}>
            <p>คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?</p>
            <button onClick={confirmLogout} className={styles.userProfileConfirmButton}>ตกลง</button>
            <button onClick={cancelLogout} className={styles.userProfileCancelButton}>ยกเลิก</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
