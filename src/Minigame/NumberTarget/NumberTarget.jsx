import React, { useState } from "react";
import styles from "./NumberTarget.module.css";

const NumberTarget = () => {
  const [target, setTarget] = useState(generateTarget());
  const [numbers, setNumbers] = useState(generateNumbers());
  const [selectedNumbers, setSelectedNumbers] = useState([null, null]); // เก็บตัวเลขที่เลือก
  const [operation, setOperation] = useState("+"); // เก็บตัวดำเนินการ
  const [message, setMessage] = useState("");

  function generateTarget() {
    return Math.floor(Math.random() * 50) + 10; // เป้าหมายระหว่าง 10-60
  }

  function generateNumbers() {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 1); // ตัวเลขระหว่าง 1-20
  }

  const handleNumberClick = (number) => {
    const newSelectedNumbers = [...selectedNumbers];

    // ใส่ตัวเลขในช่องว่างแรกที่ยังไม่มีค่า
    const emptyIndex = newSelectedNumbers.findIndex((num) => num === null);
    if (emptyIndex !== -1) {
      newSelectedNumbers[emptyIndex] = number;
      setSelectedNumbers(newSelectedNumbers);

      // ตรวจสอบผลลัพธ์เมื่อเลือกครบ 2 ตัว
      if (newSelectedNumbers[0] !== null && newSelectedNumbers[1] !== null) {
        let result;
        switch (operation) {
          case "+":
            result = newSelectedNumbers[0] + newSelectedNumbers[1];
            break;
          case "-":
            result = newSelectedNumbers[0] - newSelectedNumbers[1];
            break;
          case "*":
            result = newSelectedNumbers[0] * newSelectedNumbers[1];
            break;
          case "/":
            result = newSelectedNumbers[1] !== 0 ? newSelectedNumbers[0] / newSelectedNumbers[1] : null;
            break;
          default:
            result = null;
        }

        if (result === target) {
          setMessage("🎉 คุณชนะ!");
        } else {
          setMessage("❌ คำตอบไม่ถูกต้อง! ลองใหม่");
        }
      }
    }
  };

  const resetGame = () => {
    setTarget(generateTarget());
    setNumbers(generateNumbers());
    setSelectedNumbers([null, null]);
    setOperation("+");
    setMessage("");
  };

  return (
    <div className={styles.numberTargetContainer}>
      <div className={styles.numberTargetBgMain}></div>
      <h1>🎯 เกม Number Target</h1>
      <p>เป้าหมาย: <strong>{target}</strong></p>

      {/* วิธีการเล่น */}
      <div className={styles.numberTargetHowto}>
        เลือกตัวเลข 2 ตัว และเลือกเครื่องหมายคำนวณ<br />
        ให้ได้ผลลัพธ์ตรงกับเป้าหมายด้านบน<br />
        (แต่ละตัวเลขเลือกได้เพียง 1 ครั้ง)
      </div>

      {/* แสดงช่องสี่เหลี่ยมสำหรับคำตอบ */}
      <div className={styles.answerContainer}>
        <div className={styles.answerBox}>{selectedNumbers[0] ?? "_"}</div>
        <div className={styles.operator}>{operation}</div>
        <div className={styles.answerBox}>{selectedNumbers[1] ?? "_"}</div>
        <div className={styles.operator}>=</div>
        <div className={styles.answerBox}>{target}</div>
      </div>

      {/* ตัวเลือกการดำเนินการ */}
      <div className={styles.operationContainer}>
        <label>เลือกการดำเนินการ: </label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="+">บวก</option>
          <option value="-">ลบ</option>
          <option value="*">คูณ</option>
          <option value="/">หาร</option>
        </select>
      </div>

      {/* แสดงตัวเลขที่เลือกได้ */}
      <div className={styles.numberTargetNumbersContainer}>
        {numbers.map((number, index) => (
          <button
            key={index}
            className={styles.numberTargetButton}
            onClick={() => handleNumberClick(number)}
            disabled={selectedNumbers.includes(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <p>{message}</p>
      <button className={styles.numberTargetResetButton} onClick={resetGame}>เริ่มใหม่</button>
    </div>
  );
};

export default NumberTarget;