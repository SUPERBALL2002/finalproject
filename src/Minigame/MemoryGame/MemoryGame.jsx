import React, { useState, useEffect } from "react";
import styles from "./MemoryGame.module.css";

const cardIcons = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐯", "🐵"];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffledCards = [...cardIcons, ...cardIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon, flipped: false, matched: false, fadeOut: false }));
    setCards(shuffledCards);
    setSelectedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameFinished(false);
  };

  const handleCardClick = (id) => {
    if (selectedCards.length === 2 || matchedCards.includes(id)) return;

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);
    setSelectedCards([...selectedCards, id]);

    if (selectedCards.length === 1) {
      setMoves(moves + 1);
      const firstCard = cards.find((card) => card.id === selectedCards[0]);
      const secondCard = newCards.find((card) => card.id === id);

      if (firstCard.icon === secondCard.icon) {
        setMatchedCards([...matchedCards, firstCard.id, secondCard.id]);
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, fadeOut: true } // ✅ การ์ดที่จับคู่ถูกต้องจะเริ่มจางหาย
                : card
            )
          );
        }, 1000); // ✅ รอให้การ์ดหงายก่อนแล้วค่อยๆ จางหาย
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              selectedCards.includes(card.id) || card.id === id
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 700);
      }
      setSelectedCards([]);
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setTimeout(() => {
        setGameFinished(true);
      }, 500);
    }
  }, [matchedCards, cards.length]);

  return (
    <div className={styles.memoryGameBackground}>
      <div className={styles.memoryGameBgMain}></div>
      <div className={styles.memoryGameContainer}>
        <h1>🃏 เกมจับคู่การ์ด 🃏</h1>
        <p>จำนวนครั้งที่เล่น: {moves}</p>
        <div className={styles.memoryGameGrid}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${styles.memoryGameCard} ${card.flipped ? styles.flipped : ""} ${card.fadeOut ? styles.fadeOut : ""}`}
              onClick={() => handleCardClick(card.id)}
            >
              {card.flipped || card.fadeOut ? (
                <span>{card.icon}</span>
              ) : (
                <span className={styles.memoryGameCover}>❓</span>
              )}
            </div>
          ))}
        </div>
        <button className={styles.memoryGameResetButton} onClick={startNewGame}>
          🔄 เล่นใหม่
        </button>
      </div>

      {gameFinished && (
        <div className={styles.memoryGamePopup}>
          <div className={styles.memoryGamePopupContent}>
            <h2>🎉 ยินดีด้วย! 🎉</h2>
            <p>เก่งมากเลย! คุณจับคู่การ์ดทั้งหมดได้สำเร็จใน {moves} ครั้ง</p>
            <button className={styles.memoryGamePopupButton} onClick={startNewGame}>
              🔄 เล่นอีกครั้ง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
