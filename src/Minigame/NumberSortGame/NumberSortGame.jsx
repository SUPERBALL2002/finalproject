import React, { useState } from "react";
import styles from "./NumberSortGame.module.css";

const NumberSortGame = () => {
  const [numbers, setNumbers] = useState(shuffleArray([1, 2, 3, 4, 5, 6,]));
  const [message, setMessage] = useState("");
  const [lockedNumbers, setLockedNumbers] = useState([]);

  function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const handleSort = () => {
    if (JSON.stringify(numbers) === JSON.stringify([1, 2, 3, 4, 5, 6,])) {
      setMessage("🎉 คุณเรียงตัวเลขถูกต้อง! 🎉");
      setLockedNumbers([...numbers]); // ล็อกตัวเลขทั้งหมดเมื่อเรียงถูกต้อง
    } else {
      setMessage("❌ ผิดพลาด! ลองใหม่อีกครั้ง ❌");
    }
  };

  const handleShuffle = () => {
    setNumbers(shuffleArray([1, 2, 3, 4, 5, 6,]));
    setMessage("");
    setLockedNumbers([]); // รีเซ็ตตัวเลขที่ล็อกไว้
  };

  return (
    <div className={styles.numberSortGameBackground}>
      <div className={styles.numberSortGameBgMain}></div>
        <div className={styles.numberSortGameContainer}>
            <h1 className={styles.numberSortGameTitle}>🔢 เกมเรียงลำดับตัวเลข 🔢</h1>
                <p className={styles.numberSortGameInstructions}>กดปุ่มตัวเลขตามลำดับจากน้อยไปมาก จากนั้นกด "ตรวจสอบ" เพื่อดูว่าถูกต้องหรือไม่!</p>
                    <div className={styles.numberSortGameNumberList}>
                        {numbers.map((num, index) => (
                        <button
                            key={index}
                            className={`${styles.numberSortGameButton} ${lockedNumbers.includes(num) ? styles.locked : ""}`}
                            onClick={() => {
                            if (!lockedNumbers.includes(num)) {
                                setNumbers(shuffleArray([...numbers]));
                            }
                            }}
                            disabled={lockedNumbers.includes(num)}
                        >
                            {num}
                        </button>
                    ))}
            </div>
                <button className={styles.numberSortGameCheckButton} onClick={handleSort}>
                ✅ ตรวจสอบ
                </button>
                <button className={styles.numberSortGameShuffleButton} onClick={handleShuffle}>
                🔄 สับเปลี่ยนตัวเลข
                </button>
                <p className={styles.numberSortGameMessage}>{message}</p>
            </div>
        </div>
  );
};

export default NumberSortGame;
