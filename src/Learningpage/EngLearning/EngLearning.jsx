import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EngLearning.module.css";

const videoList = [
  {
    title: "Kids English คอร์สเรียนภาษาอังกฤษสำหรับเด็ก ครบระดับ ต้น-กลาง-สูง",
    src: "https://www.youtube.com/embed/VZNmRSAR2O0",
    desc: "คลิปนี้เป็นคอร์สเรียนภาษาอังกฤษสำหรับเด็กที่ครอบคลุมทุกระดับ ตั้งแต่ระดับต้น กลาง ไปจนถึงสูง โดยเน้นการสอนคำศัพท์และประโยคพื้นฐานที่เด็กสามารถนำไปใช้ในชีวิตประจำวันได้อย่างง่ายดาย",
  },
  {
    title: "Learn English for Kids – Useful Phrases for Beginners",
    src: "https://www.youtube.com/embed/7HUW_aukApo",
    desc: "วิดีโอนี้สอนวลีภาษาอังกฤษที่ใช้ในชีวิตประจำวัน เช่น การทักทาย การขอความช่วยเหลือ และการแนะนำตัว เหมาะสำหรับเด็กที่เริ่มต้นเรียนภาษาอังกฤษ",
  },
  {
    title: "Basic English Conversation Practice for Kids | Chapter 1 to 20",
    src: "https://www.youtube.com/embed/w_ysxZqQoXg",
    desc: "ชุดวิดีโอนี้ประกอบด้วยบทสนทนาพื้นฐาน 20 บท ที่ช่วยให้เด็กฝึกพูดและฟังภาษาอังกฤษในสถานการณ์ต่างๆ เช่น การแนะนำตัว การถามทาง และการซื้อของ",
  },
  {
    title: "My Day - Daily Routine - Kids vocabulary - English educational video",
    src: "https://www.youtube.com/embed/qD1pnquN_DM",
    desc: "วิดีโอนี้สอนคำศัพท์และวลีที่เกี่ยวข้องกับกิจวัตรประจำวัน เช่น การตื่นนอน การแปรงฟัน และการไปโรงเรียน ผ่านการ์ตูนที่สนุกสนาน",
  },
];

const EngLearning = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.engLearningMainContainer}>
      {/* Container ซ้าย: คลิปสอน */}
      <div className={styles.engLearningLeftContainer}>
        {videoList.map((video, idx) => (
          <div key={idx} style={{ width: "100%", marginBottom: 28 }}>
            <div className={styles.engLearningVideoTitle}>{video.title}</div>
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
            <div className={styles.engLearningVideoDesc}>{video.desc}</div>
          </div>
        ))}
        <button
          className={styles.engLearningBackButton}
          onClick={() => navigate(-1)}
        >
          <span className={styles.engLearningBackIcon}>🔙</span> <span>กลับ</span>
        </button>
      </div>

      {/* Container ขวา: เนื้อหา */}
      <div className={styles.engLearningRightContainer}>
        <h1 className={styles.engLearningTitle}>บทเรียนภาษาอังกฤษ</h1>

        {/* บทที่ 1: ตัวอักษรภาษาอังกฤษ */}
        <section className={styles.engLearningSection}>
          <h2>บทที่ 1: ตัวอักษรภาษาอังกฤษ (The Alphabet)</h2>
          <p>🔤 <b>A-Z พร้อมการอ่าน</b></p>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
            <thead>
              <tr>
                <th>ตัวอักษร</th>
                <th>คำอ่าน (ไทย)</th>
                <th>ตัวอย่างคำ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>A</td><td>เอ</td><td>Apple (แอ๊ป-เพิล) = แอปเปิล</td></tr>
              <tr><td>B</td><td>บี</td><td>Ball (บอล) = ลูกบอล</td></tr>
              <tr><td>C</td><td>ซี</td><td>Cat (แคท) = แมว</td></tr>
              <tr><td>D</td><td>ดี</td><td>Dog (ดอก) = สุนัข</td></tr>
              <tr><td>E</td><td>อี</td><td>Elephant (เอ๊ล-ละ-เฟินทฺ) = ช้าง</td></tr>
              <tr><td>F</td><td>เอฟ</td><td>Fish (ฟิช) = ปลา</td></tr>
              <tr><td>G</td><td>จี</td><td>Goat (โกท) = แพะ</td></tr>
              <tr><td>H</td><td>เอช</td><td>Hat (แฮท) = หมวก</td></tr>
              <tr><td>I</td><td>ไอ</td><td>Ice cream (ไอซฺ-ครีม) = ไอศกรีม</td></tr>
              <tr><td>J</td><td>เจ</td><td>Juice (จูซ) = น้ำผลไม้</td></tr>
              <tr><td>K</td><td>เค</td><td>Kite (ไคท) = ว่าว</td></tr>
              <tr><td>L</td><td>แอล</td><td>Lion (ไล-เอิน) = สิงโต</td></tr>
              <tr><td>M</td><td>เอ็ม</td><td>Monkey (มัน-คี) = ลิง</td></tr>
              <tr><td>N</td><td>เอ็น</td><td>Nest (เนสทฺ) = รังนก</td></tr>
              <tr><td>O</td><td>โอ</td><td>Orange (ออ-เรินจฺ) = ส้ม</td></tr>
              <tr><td>P</td><td>พี</td><td>Pen (เพน) = ปากกา</td></tr>
              <tr><td>Q</td><td>คิว</td><td>Queen (ควีน) = ราชินี</td></tr>
              <tr><td>R</td><td>อาร์</td><td>Rabbit (แร๊บ-บิท) = กระต่าย</td></tr>
              <tr><td>S</td><td>เอส</td><td>Sun (ซัน) = ดวงอาทิตย์</td></tr>
              <tr><td>T</td><td>ที</td><td>Tiger (ไท-เกอะ) = เสือ</td></tr>
              <tr><td>U</td><td>ยู</td><td>Umbrella (อัม-เบรล-ละ) = ร่ม</td></tr>
              <tr><td>V</td><td>วี</td><td>Violin (ไว-อะ-ลิน) = ไวโอลิน</td></tr>
              <tr><td>W</td><td>ดับเบิลยู</td><td>Water (วอ-เทอะ) = น้ำ</td></tr>
              <tr><td>X</td><td>เอ็กซ์</td><td>X-ray (เอ็กซฺ-เรย์) = เอกซเรย์</td></tr>
              <tr><td>Y</td><td>วาย</td><td>Yo-yo (โย-โย) = ของเล่นโยโย่</td></tr>
              <tr><td>Z</td><td>แซด</td><td>Zebra (ซี-บร้า) = ม้าลาย</td></tr>
            </tbody>
          </table>
          <ul>
            <li>📚 <b>วิธีฝึกอ่าน</b></li>
            <li>อ่านตัวอักษรทีละตัววันละ 5 ตัว พร้อมออกเสียงตาม</li>
            <li>ทบทวนเสียงตัวอักษรโดยจับคู่กับคำศัพท์</li>
            <li>เปิดเสียงอ่านภาษาอังกฤษจากแหล่งเรียนรู้ (เช่น YouTube Kids) เพื่อฝึกฟังและเลียนเสียง</li>
            <li>ฝึกเขียนตัวอักษรควบคู่กันไป</li>
          </ul>
        </section>

        {/* บทที่ 2: คำศัพท์พื้นฐาน */}
        <section className={styles.engLearningSection}>
          <h2>บทที่ 2: คำศัพท์พื้นฐาน (Basic Vocabulary)</h2>
          <h3>🐶 กลุ่มสัตว์ (Animals)</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
            <thead>
              <tr>
                <th>คำศัพท์</th>
                <th>คำอ่าน (ไทย)</th>
                <th>ความหมาย</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Cat</td><td>แคท</td><td>แมว</td></tr>
              <tr><td>Dog</td><td>ดอก</td><td>สุนัข</td></tr>
              <tr><td>Fish</td><td>ฟิช</td><td>ปลา</td></tr>
              <tr><td>Bird</td><td>เบิร์ด</td><td>นก</td></tr>
              <tr><td>Cow</td><td>คาว</td><td>วัว</td></tr>
            </tbody>
          </table>
          <ul>
            <li>✅ <b>ฝึกอ่าน:</b></li>
            <li>อ่านคำศัพท์พร้อมออกเสียงช้าๆ</li>
            <li>เน้นเสียงพยางค์ต้น เช่น “CAT” = เสียง C + AT</li>
            <li>พูดตามคลิปเสียงแล้วฝึกออกเสียงเอง</li>
            <li>ใช้ภาพประกอบช่วยให้จำง่าย</li>
          </ul>
        </section>

        {/* บทที่ 3: สีและตัวเลข */}
        <section className={styles.engLearningSection}>
          <h2>บทที่ 3: สีและตัวเลข (Colors and Numbers)</h2>
          <h3>🎨 สี</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
            <thead>
              <tr>
                <th>สี</th>
                <th>คำอ่าน (ไทย)</th>
                <th>คำศัพท์ภาษาอังกฤษ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>แดง</td><td>แรด</td><td>Red</td></tr>
              <tr><td>น้ำเงิน</td><td>บลู</td><td>Blue</td></tr>
              <tr><td>เหลือง</td><td>เยล-โลว์</td><td>Yellow</td></tr>
              <tr><td>เขียว</td><td>กรีน</td><td>Green</td></tr>
              <tr><td>ดำ</td><td>แบล็ค</td><td>Black</td></tr>
            </tbody>
          </table>
          <h3>🔢 ตัวเลข 1-10</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
            <thead>
              <tr>
                <th>ตัวเลข</th>
                <th>คำอ่าน (ไทย)</th>
                <th>คำศัพท์ภาษาอังกฤษ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>วัน</td><td>One</td></tr>
              <tr><td>2</td><td>ทู</td><td>Two</td></tr>
              <tr><td>3</td><td>ทรี</td><td>Three</td></tr>
              <tr><td>4</td><td>โฟร์</td><td>Four</td></tr>
              <tr><td>5</td><td>ไฟว์</td><td>Five</td></tr>
              <tr><td>6</td><td>ซิกซ์</td><td>Six</td></tr>
              <tr><td>7</td><td>เซเว่น</td><td>Seven</td></tr>
              <tr><td>8</td><td>เอท</td><td>Eight</td></tr>
              <tr><td>9</td><td>ไนน์</td><td>Nine</td></tr>
              <tr><td>10</td><td>เท็น</td><td>Ten</td></tr>
            </tbody>
          </table>
          <ul>
            <li>✅ <b>วิธีฝึกจำตัวเลขและสี</b></li>
            <li>ใช้แฟลชการ์ดภาพประกอบ (ภาพ + คำ)</li>
            <li>ฝึกพูดซ้ำๆ วันละ 5 คำ</li>
            <li>เล่นเกมจับคู่สี-คำศัพท์ หรือ เกมจับคู่ตัวเลข-คำอ่าน</li>
          </ul>
        </section>

        {/* บทที่ 4: คำทักทายและแนะนำตัว */}
        <section className={styles.engLearningSection}>
          <h2>บทที่ 4: คำทักทายและแนะนำตัว (Greetings & Introductions)</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
            <thead>
              <tr>
                <th>ประโยค</th>
                <th>คำอ่าน</th>
                <th>ความหมาย</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Hello!</td><td>เฮล-โล</td><td>สวัสดี</td></tr>
              <tr><td>Hi!</td><td>ไฮ</td><td>หวัดดี</td></tr>
              <tr><td>My name is…</td><td>มาย เนม อีส…</td><td>ฉันชื่อ…</td></tr>
              <tr><td>What’s your name?</td><td>วอทสฺ ยัวร์ เนม?</td><td>คุณชื่ออะไร</td></tr>
              <tr><td>Nice to meet you!</td><td>ไนซ์ ทู มีท ยู</td><td>ยินดีที่ได้รู้จัก</td></tr>
            </tbody>
          </table>
          <ul>
            <li>✅ <b>ฝึกพูดบทสนทนา</b></li>
            <li>ท่องบทสนทนาสั้นๆ เป็นประจำ</li>
            <li>ฝึกเป็นบทละคร เช่น เล่นบท "A" และ "B"</li>
            <li>เปิดเสียงฟังสำเนียงจริงแล้วเลียนแบบ</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default EngLearning;