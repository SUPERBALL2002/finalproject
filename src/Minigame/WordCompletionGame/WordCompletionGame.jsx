import React, { useState } from "react";
import styles from "./WordCompletionGame.module.css";

const words = [
  "APPLE", "BANANA", "ORANGE", "GRAPE", "MANGO"
];

const getRandomWords = () => {
  let selectedWords = [];
  while (selectedWords.length < 5) {
    let newWord = words[Math.floor(Math.random() * words.length)];
    if (!selectedWords.includes(newWord)) {
      selectedWords.push(newWord);
    }
  }
  return selectedWords;
};

const WordCompletionGame = () => {
  const [wordList, setWordList] = useState(getRandomWords());
  const [filledList, setFilledList] = useState(wordList.map(word => Array(word.length).fill("_")));
  const [showPopup, setShowPopup] = useState(false);

  const letters = wordList.join(" ").split("").sort(() => Math.random() - 0.5);

  const handleLetterClick = (letter) => {
    let newFilledList = [...filledList];
    for (let i = 0; i < newFilledList.length; i++) {
      const index = newFilledList[i].indexOf("_");
      if (index !== -1) {
        newFilledList[i][index] = letter;
        break;
      }
    }
    setFilledList(newFilledList);
    if (newFilledList.every((word, i) => word.join("") === wordList[i])) {
      setTimeout(() => setShowPopup(true), 500);
    }
  };

  const restartGame = () => {
    const newWordList = getRandomWords();
    setWordList(newWordList);
    setFilledList(newWordList.map(word => Array(word.length).fill("_")));
    setShowPopup(false);
  };

  return (
        <div className={styles.WordCompletionGameBackground}>
            <div className={styles.WordCompletionGameContainer}>
            <h2>🔤 เกมเติมคำ 🔤</h2>
            <p className={styles.WordCompletionGameInstructions}>
                เลือกตัวอักษรจากด้านล่างเพื่อเติมให้ครบโดยมีคำว่า APPLE BANANA ORANGE GRAPE MANGO มาเรียงตามลำดับให้ถูก
            </p>
            <div className={styles.WordCompletionGameWordList}>
                {filledList.map((filled, index) => (
                <div key={index} className={styles.WordCompletionGameWord}>
                    {filled.map((char, i) => (
                    <span key={i} className={styles.WordCompletionGameLetter}>{char}</span>
                    ))}
                </div>
                ))}
            </div>
            <div className={styles.WordCompletionGameChoices}>
                {letters.map((letter, index) => (
                <button
                    key={index}
                    className={styles.WordCompletionGameButton}
                    onClick={() => handleLetterClick(letter)}
                >
                    {letter}
                </button>
                ))}
            </div>
            <button className={styles.WordCompletionGameRestartButton} onClick={restartGame}>🔄 เริ่มใหม่</button>
            {showPopup && (
                <div className={styles.WordCompletionGamePopup}>
                <div className={styles.WordCompletionGamePopupContent}>
                    <h2>🎉 เก่งมาก! 🎉</h2>
                    <p>คุณเติมคำได้ถูกต้องทั้งหมด!</p>
                    <button className={styles.WordCompletionGamePopupButton} onClick={restartGame}>🔄 เล่นอีกครั้ง</button>
                </div>
                </div>
            )}
            </div>
        </div>
  );
};

export default WordCompletionGame;
