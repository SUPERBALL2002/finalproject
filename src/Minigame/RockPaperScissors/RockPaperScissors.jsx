import React, { useState } from "react";
import styles from "./RockPaperScissors.module.css";

const choices = [
  { name: "rock", emoji: "✊" },
  { name: "paper", emoji: "✋" },
  { name: "scissors", emoji: "✌️" },
];

const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ win: 0, draw: 0, lose: 0 });
  const [playing, setPlaying] = useState(false);
  const [animating, setAnimating] = useState(false);

  const determineWinner = (player, computer) => {
    if (player === computer) return "🔄 เสมอ";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      setScore((prev) => ({ ...prev, win: prev.win + 1 }));
      return "🏆 ชนะ!";
    } else {
      setScore((prev) => ({ ...prev, lose: prev.lose + 1 }));
      return "❌ แพ้!";
    }
  };

  const handleChoice = (choice) => {
    if (playing) return;
    setPlaying(true);
    setAnimating(true);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("⏳ กำลังเลือก...");

    setTimeout(() => {
      setAnimating(false);
      setPlayerChoice(choice);
      const computer = getRandomChoice();
      setComputerChoice(computer);
      const gameResult = determineWinner(choice, computer.name);
      setResult(gameResult);
      setPlaying(false);
    }, 1500);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setScore({ win: 0, draw: 0, lose: 0 });
  };


  return (
        <div className={styles.rockPaperScissorsBackground}>
            <div className={styles.rockPaperScissorsContainer}>
            <h2>✊✋✌️ เป่ายิ้งฉุบ! ✌️✋✊</h2>
            <p>เลือกอันใดอันหนึ่ง</p>
            <div className={styles.rockPaperScissorsChoices}>
                {choices.map((choice) => (
                <button
                    key={choice.name}
                    className={styles.rockPaperScissorsChoiceButton}
                    onClick={() => handleChoice(choice.name)}
                    disabled={playing}
                >
                    {choice.emoji}
                </button>
                ))}
            </div>
        </div>       
      <div className={styles.rockPaperScissorsResultBox}>
        <p>👤 คุณเลือก: <span className={animating ? styles.rockPaperScissorsHand : ""}>{playerChoice ? choices.find(c => c.name === playerChoice).emoji : "❓"}</span></p>
        <p>🤖 คอมพิวเตอร์: <span className={animating ? styles.rockPaperScissorsHand : ""}>{computerChoice ? computerChoice.emoji : "❓"}</span></p>
        <h3>{result}</h3>
      </div>

      <div className={styles.rockPaperScissorsScoreBox}>
        <p>🏆 ชนะ: {score.win} | 🔄 เสมอ: {score.draw} | ❌ แพ้: {score.lose}</p>
      </div>

      <button className={styles.rockPaperScissorsResetButton} onClick={resetGame}>🔄 เริ่มใหม่</button>
    </div>
  );
};

export default RockPaperScissors;
