import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MiniGame.module.css";

const MiniGameSelection = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.miniGameContainer}>
      <h1 className={styles.miniGametitle}>🎮 เลือเกมที่คุณต้องการเล่น 🎮</h1>
      <div className={styles.miniGameGrid}> 
        <button className={styles.gameButton} onClick={() => navigate("/memorygame")}>
          🃏 เกมจับคู่การ์ด
        </button>
        <button className={styles.gameButton} onClick={() => navigate("/wordmatchinggame")}>
          🔗 เกมลากเส้นเชื่อมโยง 
        </button>
        <button className={styles.gameButton} onClick={() => navigate("/numbersortgame")}>
          🔢 เกมเรียงลำดับตัวเลข 
        </button>
        <button className={styles.gameButton} onClick={() => navigate("/wordcompletiongame")}>
          🔤 เกมสร้างคำศัพท์ (ให้ตัวอักษรมาแล้วเรียงเป็นคำที่ถูกต้อง)
        </button>
        <button className={styles.gameButton} onClick={() => navigate("/rockpaperscissors")}>
        ✊ ✌️ ✋ เกมเป่ายิ้งฉุบ
        </button>
      </div>
    </div>
  );
};

export default MiniGameSelection;
