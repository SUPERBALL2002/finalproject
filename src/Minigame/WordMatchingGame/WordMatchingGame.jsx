import React, { useState } from "react";
import styles from "./WordMatchingGame.module.css";

const words = [
  { english: "Apple", thai: "แอปเปิ้ล" }, { english: "Dog", thai: "สุนัข" },
  { english: "Sun", thai: "พระอาทิตย์" }, { english: "Book", thai: "หนังสือ" },
  { english: "Car", thai: "รถยนต์" }, { english: "Tree", thai: "ต้นไม้" },
  { english: "Chair", thai: "เก้าอี้" }, { english: "Table", thai: "โต๊ะ" },
  { english: "Water", thai: "น้ำ" }, { english: "Fire", thai: "ไฟ" }
];

const WordMatchingGame = () => {
  const [selected, setSelected] = useState({});
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSelect = (eng, thai) => {
    setSelected((prev) => ({ ...prev, [eng]: thai }));
  };

  const checkAnswers = () => {
    const isCorrect = words.every((word) => selected[word.english] === word.thai);
    if (isCorrect) {
      setShowPopup(true);
    } else {
      setMessage("❌ ลองอีกครั้ง ❌");
    }
  };

  const restartGame = () => {
    setSelected({});
    setMessage("");
    setShowPopup(false);
  };

  return (
    <div className={styles.WordMatchingGameBackground}>
      <div className={styles.WordMatchingGameContainer}>
        <h2>🔗 เกมจับคู่คำศัพท์ 🔗</h2>
        <div className={styles.WordMatchingGameGrid}>
          <div className={styles.WordMatchingGameColumn}>
            <h3>ภาษาอังกฤษ</h3>
            {words.map((word) => (
              <div key={word.english} className={styles.WordMatchingGameWordBox}>
                {word.english}
              </div>
            ))}
          </div>
          <div className={styles.WordMatchingGameColumn}>
            <h3>ภาษาไทย</h3>
            {words.map((word) => (
              <div
                key={word.thai}
                className={`${styles.WordMatchingGameWordBox} ${selected[word.english] === word.thai ? styles.WordMatchingGameSelected : ""}`}
                onClick={() => handleSelect(word.english, word.thai)}
              >
                {word.thai}
              </div>
            ))}
          </div>
        </div>
        <button className={styles.WordMatchingGameCheckButton} onClick={checkAnswers}>✅ ตรวจสอบ</button>
        <button className={styles.WordMatchingGameCheckButton} onClick={restartGame}>🔄 เริ่มใหม่</button>
        <p className={styles.WordMatchingGameMessage}>{message}</p>
      </div>
      {showPopup && (
        <div className={styles.WordMatchingGamePopup}>
          <div className={styles.WordMatchingGamePopupContent}>
            <h2>🎉 เก่งมาก! 🎉</h2>
            <p>คุณจับคู่คำศัพท์ได้ถูกต้องทั้งหมด!</p>
            <button className={styles.WordMatchingGamePopupButton} onClick={restartGame}>🔄 เล่นอีกครั้ง</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordMatchingGame;