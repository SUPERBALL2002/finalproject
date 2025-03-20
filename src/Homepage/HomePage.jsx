import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // state สำหรับ popup
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubjectClick = (subject) => {
    setActiveSubject(subject);
    if (subject === "คณิตศาสตร์") {
      navigate("/math");
    } else if (subject === "วิทยาศาสตร์") {
      navigate("/science");
    }
    else if (subject === "ภาษาไทย"){
      navigate("/thailanguage")
    }
    else if (subject === "ภาษาอังกฤษ"){
      navigate("/englanguage")
    }

  };

  const handleLogoutClick = () => {
    setShowPopup(true); // แสดง popup เมื่อคลิกออกจากระบบ
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowPopup(false); // ซ่อน popup
  };

  return (
    <div className={styles.homePageWrapper}>
      <header className={styles.homePageHeader}>
        <h1>📚 เรียนสนุก ไปกับเรา!</h1>
        <p>เรียนง่าย สนุก ได้ความรู้ พร้อมกิจกรรมที่ทำให้เด็ก ๆ เพลิดเพลิน</p>
        <nav className={styles.homePageNavbar}>
          <div className={styles.navLeft}>
            <Link to="/about" className={styles.navLink}>ℹ️ เกี่ยวกับเรา</Link>
          </div>
          <div className={styles.navRight}>
            <div className={styles.profileSection} onClick={toggleSidebar}>
              <img src="avatar.png" alt="Profile" className={styles.profileIcon} />
              <span className={styles.profileName}> </span>
            </div>
          </div>
        </nav>
      </header>

      {/* ✅ Sidebar */}
      <div className={`${styles.homePageSidebar} ${sidebarOpen ? styles.homePageSidebarOpen : ""}`} style={{ zIndex: 1100 }}>
        <button className={styles.homePageCloseBtn} onClick={toggleSidebar}>✖</button>
        <ul>
          <li><Link to="/profile" className={`${styles.homePageSidebarButton}`}>โปรไฟล์</Link></li>
          <li><Link to="/account-settings" className={`${styles.homePageSidebarButton}`}>ตั้งค่าบัญชี</Link></li>
          <li><Link to="/minigame" className={`${styles.homePageSidebarButton}`}>เกมส์</Link></li>
          <li><button onClick={handleLogoutClick} className={`${styles.homePageSidebarButton}`}>ออกจากระบบ</button></li>
        </ul>
      </div>

      {/* ✅ Grid วิชา */}
      <div className={styles.homePageGridContainer}>
        {[{ icon: "📏", name: "คณิตศาสตร์" }, { icon: "🔬", name: "วิทยาศาสตร์" }, { icon: "📖", name: "ภาษาไทย" }, { icon: "🌍", name: "ภาษาอังกฤษ" }].map((subject) => (
          <button
            key={subject.name}
            className={`${styles.homePageSubject} ${activeSubject === subject.name ? styles.active : ""}`}
            onClick={() => handleSubjectClick(subject.name)}
          >
            {subject.icon} {subject.name}
          </button>
        ))}
      </div>

      {/* ✅ Popup ออกจากระบบ */}
      {showPopup && (
        <div className={styles.homePagePopupBackground}>
          <div className={styles.homePagePopupContainer}>
            <p>คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?</p>
            <div className={styles.homePagePopupButtons}>
              <button onClick={handleLogout} className={styles.homePagePopupConfirmButton}>ตกลง</button>
              <button onClick={cancelLogout} className={styles.homePagePopupCancelButton}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
