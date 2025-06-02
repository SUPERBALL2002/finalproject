import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ThaiLearning.module.css";

const videoList = [
  {
    title: "เรียนรู้ภาษาไทย",
    src: "https://www.youtube.com/embed/CYQ0EbgGlY0",
    desc: "คลิปนี้สอนเกี่ยวกับพยัญชนะไทย 44 ตัว และการผันเสียงวรรณยุกต์",
  },
  {
    title: "ภาษาไทย : เรื่อง สระ",
    src: "https://www.youtube.com/embed/FqvRQ1qTwBs",
    desc: "คลิปนี้สอนเกี่ยวกับสระอา โดยมีการอ่านและฝึกสะกดคำอย่างชัดเจน",
  },
  {
    title: "ภาษาไทย : การเตรียมความพร้อม",
    src: "https://www.youtube.com/embed/BZts7cSwYa4",
    desc: "คลิปนี้เน้นการเตรียมความพร้อมก่อนเรียนภาษาไทย",
  },
  {
    title: "ภาษาไทย : อ่านสะกดคำ",
    src: "https://www.youtube.com/embed/_Aj6IqawVU8",
    desc: "คลิปนี้สอนการอ่านสะกดคำและการผันเสียงวรรณยุกต์อักษรกลาง เหมาะสำหรับการฝึกอ่านออกเสียง",
  },
];

const ThaiLearning = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.thaiLearningMainContainer}>
      {/* Container ซ้าย: คลิปสอน */}
      <div className={styles.thaiLearningLeftContainer}>
        {videoList.map((video, idx) => (
          <div key={idx} style={{ width: "100%", marginBottom: 28 }}>
            <div className={styles.thaiLearningVideoTitle}>{video.title}</div>
            <div style={{ width: "100%", aspectRatio: "16/9", marginBottom: 12 }}>
              <iframe
                width="100%"
                height="100%"
                src={video.src}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "12px", width: "100%", height: "100%" }}
              ></iframe>
            </div>
            <div className={styles.thaiLearningVideoDesc}>{video.desc}</div>
          </div>
        ))}
        <button
          className={styles.thaiLearningBackButton}
          onClick={() => navigate(-1)}
        >
          <span className={styles.thaiLearningBackIcon}>🔙</span> <span>กลับ</span>
        </button>
      </div>

      {/* Container ขวา: เนื้อหา */}
      <div className={styles.thaiLearningRightContainer}>
        <h1 className={styles.thaiLearningTitle}>บทเรียนภาษาไทย</h1>

        {/* 🅰 หมวดพยัญชนะ สระ และวรรณยุกต์ */}
        <section className={styles.thaiLearningSection}>
          <h2>🅰 หมวดพยัญชนะ สระ และวรรณยุกต์</h2>
          <ul>
            <li>
              <b>1. พยัญชนะไทย</b>
              <br />
              - พยัญชนะไทยมีทั้งหมด 44 ตัว
              <br />
              - แบ่งเป็น พยัญชนะต้น (ใช้ขึ้นต้นคำ) และพยัญชนะท้าย (ใช้สะกดคำ)
              <br />
              - ตัวอย่างพยัญชนะต้น: ก ข ค ฆ / ตัวอย่างพยัญชนะท้าย: น ม ง ด ก บ
            </li>
            <li style={{ marginTop: 12 }}>
              <b>2. สระ</b>
              <br />
              - สระแบ่งเป็น สระเดี่ยว และ สระประสม
              <br />
              - ตัวอย่างสระเดี่ยว: อะ อิ อึ อุ เอ โอ ฯลฯ
              <br />
              - ตัวอย่างสระประสม: เอีย เอือ อัว ฯลฯ
              <br />
              - สระเกิน คือสระที่เขียนเกินมา เช่น “เปีย” ใช้สระเกิน “เ-ีย”
              <br />
              - สระเสียงสั้น: อะ อิ อึ อุ ฯลฯ
              <br />
              - สระเสียงยาว: อา อี อู เอ โอ ฯลฯ
            </li>
            <li style={{ marginTop: 12 }}>
              <b>3. วรรณยุกต์</b>
              <br />
              - วรรณยุกต์มี 5 รูป 4 เสียง
              <br />
              - ไม้เอก (่) – เสียงต่ำ
              <br />
              - ไม้โท (้) – เสียงกลาง
              <br />
              - ไม้ตรี (๊) – เสียงสูง
              <br />
              - ไม้จัตวา (๋) – เสียงสูงมาก
              <br />
              - ไม่มีวรรณยุกต์ – เสียงสามัญ
            </li>
          </ul>
        </section>

        {/* 🅱 หมวดชนิดของคำ */}
        <section className={styles.thaiLearningSection}>
          <h2>🅱 หมวดชนิดของคำ</h2>
          <ul>
            <li>
              <b>1. คำนาม</b> — หมายถึงชื่อของคน สัตว์ สิ่งของ สถานที่
              <br />
              <i>ตัวอย่าง:</i> เด็ก ดินสอ โรงเรียน
            </li>
            <li style={{ marginTop: 12 }}>
              <b>2. คำสรรพนาม</b> — ใช้แทนคำนาม เช่น ฉัน เขา เธอ คุณ
            </li>
            <li style={{ marginTop: 12 }}>
              <b>3. คำกริยา</b> — แสดงการกระทำ เช่น วิ่ง กิน นอน พูด อ่าน
            </li>
            <li style={{ marginTop: 12 }}>
              <b>4. คำวิเศษณ์</b> — ขยายคำนาม กริยา หรือคำวิเศษณ์อื่น เช่น เร็ว มาก สวย อร่อย
            </li>
          </ul>
        </section>

        {/* 🅲 หมวดประโยค */}
        <section className={styles.thaiLearningSection}>
          <h2>🅲 หมวดประโยค</h2>
          <ul>
            <li>
              <b>1. ประโยคบอกเล่า</b> — ใช้บอกเล่าข้อเท็จจริง เช่น “ฉันไปโรงเรียน”
            </li>
            <li style={{ marginTop: 12 }}>
              <b>2. ประโยคคำถาม</b> — ใช้ถาม เช่น “คุณชื่ออะไร?”
            </li>
            <li style={{ marginTop: 12 }}>
              <b>3. ประโยคปฏิเสธ</b> — มีคำว่า “ไม่” หรือ “ไม่มี” เช่น “ฉันไม่ชอบกินเผ็ด”
            </li>
            <li style={{ marginTop: 12 }}>
              <b>4. ประโยคคำสั่ง/ขอร้อง</b> — ใช้สั่งหรือร้องขอ เช่น “อย่าทำเสียงดัง”
            </li>
          </ul>
        </section>

        {/* 🅳 หมวดการอ่านและการเขียน */}
        <section className={styles.thaiLearningSection}>
          <h2>🅳 หมวดการอ่านและการเขียน</h2>
          <ul>
            <li>
              <b>1. พยางค์</b> — หน่วยเสียงที่เปล่งออกมาในครั้งเดียว
              <br />
              คำหนึ่งอาจมีหลายพยางค์ เช่น “โรง-เรียน” = 2 พยางค์
            </li>
            <li style={{ marginTop: 12 }}>
              <b>2. พยางค์เปิด-พยางค์ปิด</b>
              <br />
              - พยางค์เปิด: ไม่มีตัวสะกด เช่น ไป มา ดี
              <br />
              - พยางค์ปิด: มีตัวสะกด เช่น กิน นอน สวย
            </li>
            <li style={{ marginTop: 12 }}>
              <b>3. การใช้ตัวการันต์ (๎)</b>
              <br />
              - ตัวการันต์ใช้บอกว่าตัวอักษรนั้นไม่ต้องออกเสียง
              <br />
              - เช่น พัฒนา (พัด-ทะ-นา) ตัว “ฒ” ไม่ออกเสียง
            </li>
            <li style={{ marginTop: 12 }}>
              <b>4. มาตราตัวสะกด</b>
              <br />
              - มาตราแม่ กก กด กม กน กบ กง เกย เกอว ฯลฯ
              <br />
              - เช่น “รัก” อยู่ในแม่กก, “นม” อยู่ในแม่กม
            </li>
          </ul>
        </section>

        {/* 🅴 หมวดวรรณคดีและการอ่านเชิงวิเคราะห์ */}
        <section className={styles.thaiLearningSection}>
          <h2>🅴 หมวดวรรณคดีและการอ่านเชิงวิเคราะห์</h2>
          <ul>
            <li>
              <b>1. วรรณคดีไทยที่ควรรู้จัก</b>
              <br />
              - พระอภัยมณี – แต่งโดยสุนทรภู่
              <br />
              - อิเหนา – นางเอกคือ “บุษบา”
              <br />
              - ขุนช้างขุนแผน – ประเภทเสภา
              <br />
              - รามเกียรติ์ – พระราชนิพนธ์ในรัชกาลที่ 1
              <br />
              - ไตรภูมิพระร่วง – วรรณคดีธรรมะ
            </li>
            <li style={{ marginTop: 12 }}>
              <b>2. การอ่านเชิงพินิจ</b> — คือการอ่านเพื่อเข้าใจ วิเคราะห์ สรุปใจความ
              <br />
              ฝึกจับใจความสำคัญ และตีความความรู้สึกของตัวละคร
            </li>
            <li style={{ marginTop: 12 }}>
              <b>3. ประเภทของบทความ</b>
              <br />
              - ข่าว – ข้อเท็จจริง
              <br />
              - ไดอารี่ – บอกความรู้สึก
              <br />
              - สารคดี – ให้ความรู้
              <br />
              - นิทาน – เรื่องแต่งให้ความบันเทิงและสอนใจ
            </li>
            <li style={{ marginTop: 12 }}>
              <b>4. ข้อความโน้มน้าว</b> — เป็นข้อความที่กระตุ้นให้ผู้อ่านเห็นด้วย เช่น “กินผักดีต่อสุขภาพ”
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ThaiLearning;