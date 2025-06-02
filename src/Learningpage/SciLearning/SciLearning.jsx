import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SciLearning.module.css";

const videoList = [
  {
    title: "คลิปสอนวิทยาศาสตร์ 1",
    src: "https://www.youtube.com/embed/jeW3KC1_gjI",
    desc: "คลิปสอนพื้นฐานวิทยาศาสตร์ 1",
  },
  {
    title: "คลิปสอนวิทยาศาสตร์ 2",
    src: "https://www.youtube.com/embed/HN2uZY6Q0Ao",
    desc: "คลิปสอนพื้นฐานวิทยาศาสตร์ 2",
  },
  {
    title: "คลิปสอนวิทยาศาสตร์ 3",
    src: "https://www.youtube.com/embed/jBbkhvDXsrQ",
    desc: "คลิปสอนพื้นฐานวิทยาศาสตร์ 3",
  },
  {
    title: "คลิปสอนวิทยาศาสตร์ 4",
    src: "https://www.youtube.com/embed/teg3kpdnPeM",
    desc: "คลิปสอนพื้นฐานวิทยาศาสตร์ 4",
  },
  {
    title: "คลิปสอนวิทยาศาสตร์ 5",
    src: "https://www.youtube.com/embed/WY9M-CIGn2I",
    desc: "คลิปสอนพื้นฐานวิทยาศาสตร์ 5",
  },
  {
    title: "คลิปสอนวิทยาศาสตร์ 6",
    src: "https://www.youtube.com/embed/K9kQOUYkqMI",
    desc: "คลิปสอนพื้นฐานวิทยาศาสตร์ 6",
  },
  {
    title: "คลิปสอนวิทยาศาสตร์ 7",
    src: "https://www.youtube.com/embed/QkI5R--lj_s",
    desc: "คลิปสอนพื้นฐานวิทยาศาสตร์ 7",
  },
];

const SciLearning = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.sciLearningMainContainer}>
      {/* Container ซ้าย: คลิปสอน (6 วีดิโอ) */}
      <div className={styles.sciLearningLeftContainer}>
        {videoList.map((video, idx) => (
          <div key={idx} style={{ width: "100%", marginBottom: 28 }}>
            <div className={styles.sciLearningVideoTitle}>{video.title}</div>
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
            <div className={styles.sciLearningVideoDesc}>{video.desc}</div>
          </div>
        ))}
        <button
          className={styles.sciLearningBackButton}
          onClick={() => navigate(-1)}
        >
          <span className={styles.sciLearningBackIcon}>🔙</span> <span>กลับ</span>
        </button>
      </div>

      {/* Container ขวา: เนื้อหา */}
      <div className={styles.sciLearningRightContainer}>
        <h1 className={styles.sciLearningTitle}>บทเรียนวิทยาศาสตร์</h1>

        {/* หมวด 1 */}
        <section className={styles.sciLearningSection}>
          <h2>หมวด 1: สิ่งมีชีวิตและสิ่งไม่มีชีวิต</h2>
          <ul>
            <li>
              <strong>ความแตกต่างของสิ่งมีชีวิตและสิ่งไม่มีชีวิต</strong>
              <br />
              <span>
                <b>สิ่งมีชีวิต</b> คือสิ่งที่สามารถเจริญเติบโต เคลื่อนไหว หายใจ กินอาหาร ขับถ่าย สืบพันธุ์ และตอบสนองต่อสิ่งเร้าได้ เช่น คน สัตว์ พืช เห็ด แบคทีเรีย
                <br />
                <b>สิ่งไม่มีชีวิต</b> ไม่สามารถทำสิ่งเหล่านี้ได้ เช่น หิน น้ำ ดิน อากาศ แก้ว โต๊ะ
              </span>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>ประเภทของสิ่งมีชีวิต</strong>
              <ul>
                <li>พืช: สร้างอาหารเองได้โดยการสังเคราะห์แสง เช่น ต้นมะม่วง ต้นถั่ว</li>
                <li>สัตว์: กินพืชหรือสัตว์อื่นเป็นอาหาร เคลื่อนไหวได้ เช่น ปลา สุนัข</li>
                <li>เห็ด: ไม่ใช่พืชหรือสัตว์ ไม่สามารถสังเคราะห์แสง แต่เป็นสิ่งมีชีวิต</li>
              </ul>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>ลักษณะเฉพาะของสัตว์</strong>
              <ul>
                <li>สัตว์เลี้ยงลูกด้วยนม: มีขน ให้นมลูก เช่น สุนัข แมว คน</li>
                <li>สัตว์บางชนิดหายใจด้วยเหงือก เช่น ปลา</li>
                <li>สัตว์บางชนิดหายใจด้วยปอด เช่น ม้า</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* หมวด 2 */}
        <section className={styles.sciLearningSection}>
          <h2>หมวด 2: ห่วงโซ่อาหารและระบบนิเวศ</h2>
          <ul>
            <li>
              <strong>ห่วงโซ่อาหาร</strong>
              <ul>
                <li>ผู้ผลิต: พืชที่สร้างอาหารเองได้จากแสงแดด</li>
                <li>ผู้บริโภค: สัตว์ที่กินพืชหรือสัตว์อื่น เช่น กวาง (กินพืช), เหยี่ยว (กินสัตว์)</li>
                <li>ผู้ย่อยสลาย: เห็ด แบคทีเรีย ย่อยซากพืช ซากสัตว์ให้เป็นสารอาหารกลับสู่ธรรมชาติ</li>
                <li>
                  <u>ตัวอย่างห่วงโซ่อาหาร:</u> หญ้า (ผู้ผลิต) → กระต่าย (ผู้บริโภคระดับแรก) → หมาป่า (ผู้บริโภคระดับสูง)
                </li>
              </ul>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>พลังงานในห่วงโซ่อาหาร</strong>
              <ul>
                <li>แสงแดดเป็นพลังงานเริ่มต้นที่พืชใช้ในการสังเคราะห์แสง</li>
                <li>พลังงานส่งต่อจากพืช → สัตว์กินพืช → สัตว์กินเนื้อ</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* หมวด 3 */}
        <section className={styles.sciLearningSection}>
          <h2>หมวด 3: การปรับตัวของสิ่งมีชีวิต</h2>
          <ul>
            <li>
              <strong>การอยู่รอดในสภาพแวดล้อมต่างๆ</strong>
              <ul>
                <li>อูฐ: กักเก็บน้ำไว้ในร่างกาย อยู่ในทะเลทรายได้</li>
                <li>กระบองเพชร: มีรากยาวและตื้น เก็บน้ำได้</li>
                <li>หมีขั้วโลก: ขนสีขาวพรางตัวจากศัตรู</li>
              </ul>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การปรับตัวในฤดูกาล</strong>
              <ul>
                <li>สัตว์บางชนิดจำศีล: เช่น หมีนอนหลับยาวในฤดูหนาว</li>
                <li>สัตว์บางชนิดอพยพ: เช่น ปลาแซลมอนว่ายทวนน้ำเพื่อวางไข่</li>
              </ul>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การป้องกันตัว</strong>
              <ul>
                <li>เม่นมีหนามป้องกันตัว</li>
                <li>แมลงปอบินเร็วหนีศัตรู</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* หมวด 4 */}
        <section className={styles.sciLearningSection}>
          <h2>หมวด 4: สสารและการเปลี่ยนแปลงสถานะ</h2>
          <ul>
            <li>
              <strong>สถานะของน้ำ</strong>
              <ul>
                <li>ของแข็ง: น้ำแข็ง</li>
                <li>ของเหลว: น้ำ</li>
                <li>ก๊าซ: ไอน้ำ</li>
              </ul>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>กระบวนการเปลี่ยนสถานะ</strong>
              <ul>
                <li>หลอมเหลว: น้ำแข็ง → น้ำ</li>
                <li>ระเหย: น้ำ → ไอน้ำ</li>
                <li>ควบแน่น: ไอน้ำ → น้ำ</li>
                <li>แข็งตัว: น้ำ → น้ำแข็ง</li>
              </ul>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>ฝนเกิดได้อย่างไร?</strong>
              <br />
              น้ำระเหยขึ้นฟ้า → กลายเป็นไอน้ำ → ควบแน่นเป็นเมฆ → กลายเป็นฝน
            </li>
          </ul>
        </section>

        {/* หมวด 5 */}
        <section className={styles.sciLearningSection}>
          <h2>หมวด 5: แหล่งน้ำและสิ่งมีชีวิตในน้ำ</h2>
          <ul>
            <li>
              <strong>แหล่งน้ำ</strong>
              <ul>
                <li>น้ำจืด: แม่น้ำ ทะเลสาบ น้ำใต้ดิน ใช้ในการเกษตรและอุปโภค</li>
                <li>น้ำเค็ม: มหาสมุทร ทะเล มีเกลือละลายอยู่</li>
              </ul>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>สิ่งมีชีวิตในน้ำ</strong>
              <ul>
                <li>น้ำจืด: ปลาดุก กบ</li>
                <li>น้ำเค็ม: ฉลาม วาฬ ปะการัง</li>
                <li>อยู่ได้ทั้งบนบกและน้ำ: กบ</li>
                <li>หายใจด้วยเหงือก: ปลา</li>
                <li>หายใจด้วยปอดในน้ำ: เต่าทะเล</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* หมวด 6 */}
        <section className={styles.sciLearningSection}>
          <h2>หมวด 6: พลังงาน</h2>
          <ul>
            <li>
              <strong>ประเภทของพลังงาน</strong>
              <ul>
                <li>พลังงานแสง: จากดวงอาทิตย์ ใช้ในการสังเคราะห์แสง</li>
                <li>พลังงานไฟฟ้า: ใช้เปิดพัดลม หลอดไฟ</li>
                <li>พลังงานความร้อน: จากไฟ ไอน้ำจากกาต้มน้ำ</li>
                <li>พลังงานเคมี: เก็บอยู่ในอาหารและแบตเตอรี่</li>
                <li>พลังงานกล: การเคลื่อนที่ เช่น พัดลมหมุน</li>
                <li>พลังงานเสียง: มาจากการสั่นสะเทือน เช่น เสียงดนตรี</li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SciLearning;