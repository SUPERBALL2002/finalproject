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
            <footer className={styles.homePageFooter}>
  <h2>เกี่ยวกับโครงการ</h2>
  <p>
    โครงการนี้พัฒนาขึ้นเพื่อส่งเสริมการเรียนรู้ของเด็ก ๆ ผ่านแบบฝึกหัดที่กระตุ้นการคิดวิเคราะห์
    โดยเน้นความสนุกสนานและการมีส่วนร่วมของเด็ก รวมถึงสนับสนุนผู้ปกครองและครูผู้สอนด้วยเครื่องมือที่ใช้งานง่าย
  </p>

  <h3>เป้าหมายของเรา</h3>
  <ul>
    <li>ส่งเสริมการคิดวิเคราะห์ผ่านคำถามที่หลากหลาย</li>
    <li>กระตุ้นความสนใจในการเรียนรู้ของเด็ก</li>
    <li>สร้างแพลตฟอร์มที่เข้าถึงง่าย</li>
    <li>พัฒนาแบบฝึกหัดให้เหมาะกับช่วงวัย</li>
  </ul>

  <h3>ติดต่อเรา</h3>
  <p>
    อีเมล: <a href="mailto:karan@gmail.com">karan@gmail.com</a> <br />
    โทร: <a href="tel:+66971234567">+66 9712 34567</a>
  </p>
</footer>

    </div>
  );
};

export default HomePage;
