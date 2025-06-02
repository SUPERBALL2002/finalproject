import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MiniGame.module.css";

const MiniGameSelection = () => {
  const navigate = useNavigate();

  const games = [
    {
      icon: "🃏",
      label: "เกมจับคู่การ์ด",
      path: "/memorygame",
    },
    {
      icon: "🔢",
      label: "เกมเรียงลำดับตัวเลข",
      path: "/numbersortgame",
    },
    {
      icon: "✊ ✌️ ✋",
      label: "เกมเป่ายิ้งฉุบ",
      path: "/rockpaperscissors",
    },
    {
      icon: "🎯",
      label: "เกม Number Target",
      path: "/numbertarget",
    },
  ];

  return (
    <div className={styles.miniGameContainer}>
      <header className={styles.miniGameHeader}>
        <h1 className={styles.miniGametitle}>🎮 เลือกเกมที่คุณต้องการเล่น 🎮</h1>
      </header>
      <main className={styles.miniGameGrid}>
        {games.map((game) => (
          <button
            key={game.path}
            className={styles.gameButton}
            onClick={() => navigate(game.path)}
          >
            <span className={styles.gameIcon}>{game.icon}</span>
            <span className={styles.gameLabel}>{game.label}</span>
          </button>
        ))}
      </main>
    </div>
  );
};

export default MiniGameSelection;
