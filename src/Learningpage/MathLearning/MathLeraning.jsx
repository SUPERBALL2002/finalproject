import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MathLearning.module.css";

const videoList = [
  {
    title: "การบวก ลบ คูณ หาร",
    src: "https://www.youtube.com/embed/wMNrMCG1C00",
    desc: "วิดีโอนี้สอนเรื่องจำนวนนับ การบวก การลบ การคูณ และการหาร",
  },
  {
    title: "การบวก ลบ คูณ หาร เศษส่วน",
    src: "https://www.youtube.com/embed/sJ4VepRwNVQ",
    desc: "คลิปนี้อธิบายพื้นฐานการบวก ลบ คูณ หาร เศษส่วนอย่างละเอียด ซึ่งสามารถเป็นประโยชน์สำหรับเด็กที่ต้องการเสริมความเข้าใจ",
  },
  {
    title: "เลขยกกำลัง",
    src: "https://www.youtube.com/embed/2I5_lXHDK1I",
    desc: "วิดีโอนี้สอนเรื่องเลขยกกำลัง โดยใช้ตัวอย่างที่เข้าใจง่าย เหมาะสำหรับเด็กประถมที่เริ่มเรียนรู้เรื่องนี้",
  },
];

const MathLearning = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mathLearningMainContainer}>
      {/* Container ซ้าย: คลิปสอน */}
      <div className={styles.mathLearningLeftContainer}>
        {videoList.map((video, idx) => (
          <div key={idx} style={{ width: "100%", marginBottom: 28 }}>
            <div className={styles.mathLearningVideoTitle}>{video.title}</div>
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
            <div className={styles.mathLearningVideoDesc}>{video.desc}</div>
          </div>
        ))}
        <button
          className={styles.mathLearningBackButton}
          onClick={() => navigate(-1)}
        >
          <span className={styles.mathLearningBackIcon}>🔙</span> <span>กลับ</span>
        </button>
      </div>

      {/* Container ขวา: เนื้อหา */}
      <div className={styles.mathLearningRightContainer}>
        <h1 className={styles.mathLearningTitle}>บทเรียนคณิตศาสตร์</h1>
        <section className={styles.mathLearningSection}>
          <h2>🧠 บทที่ 1: การบวก ลบ คูณ หาร เบื้องต้น</h2>
          <ol>
            <li>
              <strong>การบวกเลข</strong>
              <br />
              <u>ตัวอย่าง:</u> 2 + 3 = ?
              <br />
              <u>วิธีคิด:</u> เริ่มจากเลขที่มากกว่า (3) แล้วนับเพิ่มอีก 2 หน่วย: 4, 5
              <br />
              <u>ดังนั้น</u> 2 + 3 = 5
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การนับต่อจากเลขที่มากกว่าช่วยให้คำนวณได้เร็วขึ้น
              </span>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การลบเลข</strong>
              <br />
              <u>ตัวอย่าง:</u> 5 - 2 = ?
              <br />
              <u>วิธีคิด:</u> เริ่มจากเลข 5 แล้วนับถอยหลัง 2 หน่วย: 4, 3
              <br />
              <u>ดังนั้น</u> 5 - 2 = 3
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การนับถอยหลังเป็นวิธีที่ง่ายและรวดเร็วในการลบเลข
              </span>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การคูณเลข</strong>
              <br />
              <u>ตัวอย่าง:</u> 3 × 2 = ?
              <br />
              <u>วิธีคิด:</u> คิดว่า 3 กลุ่ม ๆ ละ 2: 2 + 2 + 2 = 6 หรือ 2 กลุ่ม ๆ ละ
              3: 3 + 3 = 6
              <br />
              <u>ดังนั้น</u> 3 × 2 = 6
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การเข้าใจความหมายของการคูณช่วยให้คำนวณได้แม่นยำขึ้น
              </span>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การหารเลข</strong>
              <br />
              <u>ตัวอย่าง:</u> 9 ÷ 3 = ?
              <br />
              <u>วิธีคิด:</u> แบ่ง 9 ออกเป็น 3 กลุ่มเท่า ๆ กัน: 3 + 3 + 3 แต่ละกลุ่มมี
              3 หน่วย
              <br />
              <u>ดังนั้น</u> 9 ÷ 3 = 3
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การนึกภาพการแบ่งกลุ่มช่วยให้เข้าใจการหารได้ดีขึ้น
              </span>
            </li>
          </ol>
        </section>

        <section className={styles.mathLearningSection}>
          <h2>🧠 บทที่ 2: การคำนวณขั้นสูงขึ้น</h2>
          <ol>
            <li>
              <strong>การบวกเลขสองหลัก</strong>
              <br />
              <u>ตัวอย่าง:</u> 15 + 6 = ?
              <br />
              <u>วิธีคิด:</u> แยกเลข 15 เป็น 10 + 5, บวก 10 + 6 = 16 แล้วบวกอีก 5:
              16 + 5 = 21
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การแยกเลขเป็นส่วนช่วยให้คำนวณได้ง่ายขึ้น
              </span>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การลบเลขสองหลัก</strong>
              <br />
              <u>ตัวอย่าง:</u> 25 - 10 = ?
              <br />
              <u>วิธีคิด:</u> เริ่มจาก 25 แล้วนับถอยหลัง 10 หน่วย หรือแยกเป็น 20 + 5
              แล้วลบ 10: 20 - 10 = 10, แล้วบวก 5: 10 + 5 = 15
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การแยกเลขช่วยให้การลบเลขสองหลักง่ายขึ้น
              </span>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การคูณเลขสองหลัก</strong>
              <br />
              <u>ตัวอย่าง:</u> 4 × 3 = ?
              <br />
              <u>วิธีคิด:</u> คิดว่า 4 กลุ่ม ๆ ละ 3: 3 + 3 + 3 + 3 = 12
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การท่องสูตรคูณช่วยให้คำนวณได้รวดเร็ว
              </span>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การหารเลขสองหลัก</strong>
              <br />
              <u>ตัวอย่าง:</u> 18 ÷ 6 = ?
              <br />
              <u>วิธีคิด:</u> แบ่ง 18 ออกเป็น 6 กลุ่มเท่า ๆ กัน แต่ละกลุ่มมี 3 หน่วย
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การนึกภาพการแบ่งกลุ่มช่วยให้เข้าใจการหารได้ดีขึ้น
              </span>
            </li>
          </ol>
        </section>

        <section className={styles.mathLearningSection}>
          <h2>🧠 บทที่ 3: เทคนิคการคิดเลขเร็ว</h2>
          <ol>
            <li>
              <strong>การบวกเลขสามหลัก</strong>
              <br />
              <u>ตัวอย่าง:</u> 763 + 854 = ?
              <br />
              <u>วิธีคิด:</u> แยกเป็น: 700 + 800 = 1,500, 60 + 50 = 110, 3 + 4 = 7
              รวมทั้งหมด: 1,500 + 110 + 7 = 1,617
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การแยกเลขตามหลักช่วยให้คำนวณได้ง่ายและแม่นยำ
              </span>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การลบเลขโดยใช้การปัด</strong>
              <br />
              <u>ตัวอย่าง:</u> 857 - 192 = ?
              <br />
              <u>วิธีคิด:</u> ปัด 192 ขึ้นเป็น 200: 857 - 200 = 657 แล้วบวกกลับ 8 ที่ลบเกินไป:
              657 + 8 = 665
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การปัดเลขช่วยให้การลบเลขซับซ้อนง่ายขึ้น
              </span>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การคูณเลขสองหลัก</strong>
              <br />
              <u>ตัวอย่าง:</u> 13 × 14 = ?
              <br />
              <u>วิธีคิด:</u> แยกเป็น: 13 × 10 = 130, 13 × 4 = 52, รวมทั้งหมด: 130 + 52 = 182
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การแยกเลขช่วยให้การคูณเลขสองหลักง่ายขึ้น
              </span>
            </li>
            <li style={{ marginTop: 16 }}>
              <strong>การยกกำลังสอง</strong>
              <br />
              <u>ตัวอย่าง:</u> 23² = ?
              <br />
              <u>วิธีคิด:</u> ปัด 23 ขึ้นเป็น 25 และลงเป็น 20, คูณ 25 × 20 = 500, แล้วบวก 3² = 9,
              รวมทั้งหมด: 500 + 9 = 529
              <br />
              <span className={styles.mathLearningTipBox}>
                เคล็ดลับ: การปัดเลขและใช้สูตรช่วยให้การยกกำลังสองง่ายขึ้น
              </span>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default MathLearning;