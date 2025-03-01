import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Score.module.css";

const Score = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState(0);
  const [scoreData, setScoreData] = useState([
    { id: 1, question: "โจทย์", correct: true },
    { id: 2, question: "โจทย์", correct: false },
    { id: 3, question: "โจทย์", correct: true },
    { id: 4, question: "โจทย์", correct: false },
    { id: 5, question: "โจทย์", correct: true },
    { id: 6, question: "โจทย์", correct: false },
    { id: 7, question: "โจทย์", correct: true },
    { id: 8, question: "โจทย์", correct: false },
    { id: 9, question: "โจทย์", correct: true },
    { id: 10, question: "โจทย์", correct: false },
  ]);

  useEffect(() => {
    fetchScoreData();
  }, []);
  
  const fetchScoreData = async () => {
    const response = await fetch("/api/score");
    const data = await response.json();
    setScoreData(data);
  };

  return (
    <div className={styles.scorePage_container}>
      {/* Sidebar วิชา */}
      <aside className={styles.scorePage_sidebar}>
        {["วิชา", "วิชา", "วิชา"].map((subject, index) => (
          <button
            key={index}
            className={`${styles.scorePage_subject} ${activeSubject === index ? styles.active : ""}`}
            onClick={() => setActiveSubject(index)}
          >
            {subject}
          </button>
        ))}
      </aside>

      {/* เนื้อหาหลัก */}
      <main className={styles.scorePage_content}>
        <header className={styles.scorePage_header}>
          <button className={styles.scorePage_backBtn} onClick={() => navigate("/profile")}>
            ➖
          </button>
          <h1>Score</h1>
          <div className={styles.scorePage_profileIcon}>👤</div>
        </header>

        {/* สรุปคะแนน */}
        <section className={styles.scorePage_summary}>
          <div>จำนวนข้อ : <span>{scoreData.length}</span></div>
          <div>คำตอบถูก : <span>{scoreData.filter(q => q.correct).length}</span></div>
        </section>

        {/* รายการคะแนน */}
        <section className={styles.scorePage_list}>
          {scoreData.map((item) => (
            <div key={item.id} className={`${styles.scorePage_item} ${item.correct ? styles.correct : styles.incorrect}`}>
              <div>{item.id}</div>
              <div>{item.question}</div>
              <div className={styles.scorePage_icon}>{item.correct ? "✔" : "✖"}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Score;
