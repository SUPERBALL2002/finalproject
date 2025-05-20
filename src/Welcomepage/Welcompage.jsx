import React from "react";
import { Link , useNavigate } from "react-router-dom";
import styles from "./Welcomepage.module.css";

const Welcompage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.background}>
      <div className={styles.contentBox}>
        <header className={styles.header}>
          <h1 className={styles.title}>ยินดีต้อนรับเข้าสู่เว็บไซต์</h1>
          <p className={styles.subtitle}>เตรียมพร้อมเรียนรู้สิ่งใหม่ๆ รึยังเด็กๆ?</p>
        </header>

        <section className={styles.intro}>
          <h2 className={styles.sectionTitle}>เสริมสร้างพัฒนาการเด็ก 6-12 ปี ผ่านการเรียนรู้ที่สนุกและสร้างสรรค์</h2>
          <p className={styles.description}>
            วัย 6-12 ปี เป็นช่วงวัยที่เด็กมีพัฒนาการทางร่างกาย อารมณ์ สังคม และสติปัญญาอย่างต่อเนื่อง
            เว็บไซต์ของเราออกแบบมาเพื่อช่วยให้เด็กได้เรียนรู้ผ่าน
            <strong> กิจกรรมเชิงคำถาม </strong>
            ที่กระตุ้นการคิดอย่างสร้างสรรค์ และพัฒนาทักษะสำคัญ เช่น
            <em> ตรรกะ การแก้ปัญหา ความคิดสร้างสรรค์ และการสื่อสาร </em>
            ผ่านวิธีที่สนุกสนานและเข้าใจง่าย
          </p>

          <ul className={styles.list}>
            <li>✅ กิจกรรมเสริมสร้างพัฒนาการผ่านเกมและคำถาม</li>
            <li>✅ กระตุ้นความคิดวิเคราะห์และการแก้ปัญหา</li>
            <li>✅ ส่งเสริมความมั่นใจและการเรียนรู้ด้วยตนเอง</li>
            <li>✅ เนื้อหาปรับให้เหมาะกับช่วงวัย 6-12 ปี</li>
          </ul>
        </section>

        <div className={styles.buttons}>
          <Link to="/login">
            <button className={styles.loginButton}>ไปยังหน้าเข้าสู่ระบบ</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcompage;
