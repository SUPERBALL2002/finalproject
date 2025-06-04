import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

const UserProfile = () => {
  const [status, setStatus] = useState("⏳ กำลังโหลด...");
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => setShowPopup(true);
  const confirmLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setShowPopup(false);
    navigate("/login");
  };
  const cancelLogout = () => setShowPopup(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("userToken");
      const decoded = jwtDecode(token);
      const userId = decoded.userID;
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("ไม่พบข้อมูลผู้ใช้", error);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const updateStatus = () => setStatus(navigator.onLine ? "🟢 ออนไลน์" : "🔴 ออฟไลน์");
    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return (
    <div className={styles.userProfilePage}>
      <header className={styles.userProfileHeader}>
        <button className={styles.userProfileBackButton} onClick={() => navigate("/homepage")}>
          🔙
        </button>
        <h1 className={styles.userProfileTitle}>โปรไฟล์ของฉัน</h1>
      </header>

      <main className={styles.userProfileMain}>
        <section className={styles.userProfileCard}>
          <div className={styles.userProfileAvatarSection}>
            <img
              src={userData?.avatarUrl ? userData.avatarUrl : "./circle-user-regular.svg"}
              alt=""
              className={styles.userProfileAvatar}
            />
            {/* ลบวงกลมเปอร์เซ็นต์ออก */}
          </div>
          <div className={styles.userProfileInfo}>
            {userData ? (
              <>
                <h2 className={styles.userProfileName}>
                  {userData.FirstName} {userData.Lastname}
                </h2>
                <div className={styles.userProfileDetailList}>
                  <div><span>📧</span> {userData.email}</div>
                  <div><span>📞</span> {userData.phone_number}</div>
                  <div><span>🎂</span> {new Date(userData.date_of_birth).toLocaleDateString("en-GB")}</div>
                  <div><span>🏡</span> {userData.Address}</div>
                </div>
              </>
            ) : (
              <p>⏳ กำลังโหลดข้อมูลผู้ใช้...</p>
            )}
            <div className={styles.userProfileStatusRow}>
              <span className={styles.userProfileStatusLabel}>สถานะ:</span>
              <span className={styles.userProfileStatus}>{status}</span>
            </div>
          </div>
        </section>

        <section className={styles.userProfileStatsSection}>
          <div className={styles.userProfileSubjectProgressRow}>
            {userData?.subject && Object.entries(userData.subject).map(([subject, percentage]) => (
              <div key={subject} className={styles.userProfileSubjectProgressItem}>
                <div className={styles.userProfileSubjectLabel}>{subject}</div>
                <div className={styles.userProfileSubjectPercent}>{percentage}%</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.userProfileActions}>
          <Link to="/account-settings">
            <button className={styles.userProfileEditButton}>
              ⚙️ แก้ไขข้อมูลส่วนตัว
            </button>
          </Link>
          <button className={styles.userProfileLogoutButton} onClick={handleLogout}>
            🚪 ออกจากระบบ
          </button>
        </section>
      </main>

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