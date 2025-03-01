import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubjectClick = (subject) => {
    setActiveSubject(subject);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
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
          <li><Link to="/settings" className={`${styles.homePageSidebarButton}`}>ตั้งค่า</Link></li>
          <li><button onClick={handleLogout} className={`${styles.homePageSidebarButton}`}>ออกจากระบบ</button></li>
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
    </div>
  );
};

export default HomePage;
