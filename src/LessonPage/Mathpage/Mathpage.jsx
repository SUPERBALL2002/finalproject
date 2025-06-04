import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MathPage.module.css";

const MathPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [scores, setScores] = useState({});
  const userId = localStorage.getItem("userId");

  const lessons = [
    { title: "บทที่ 1", contents: ["เนื้อหาส่วนที่ 1", "เนื้อหาส่วนที่ 2", "เนื้อหาส่วนที่ 3"] },
    { title: "บทที่ 2", contents: ["เนื้อหาส่วนที่ 1", "เนื้อหาส่วนที่ 2", "เนื้อหาส่วนที่ 3"] },
    { title: "บทที่ 3", contents: ["เนื้อหาส่วนที่ 1", "เนื้อหาส่วนที่ 2", "เนื้อหาส่วนที่ 3"] },
  ];

  // โหลดคะแนนของ userId ปัจจุบัน
  useEffect(() => {
    const allScores = JSON.parse(localStorage.getItem("mathScores")) || {};
    const userScores = allScores[userId] || {};
    setScores(userScores);
  }, [userId]);

  // ถ้า location.state มีการส่งคะแนนกลับมา ให้บันทึกคะแนนใหม่
  useEffect(() => {
    const { lessonIndex, contentIndex, score } = location.state || {};
    if (typeof score === "number") {
      const key = `${lessonIndex}-${contentIndex}`;

      setScores(prevScores => {
        const updatedScores = { ...prevScores, [key]: score };

        // อัปเดตใน localStorage
        const allScores = JSON.parse(localStorage.getItem("mathScores")) || {};
        allScores[userId] = { ...(allScores[userId] || {}), ...updatedScores };
        localStorage.setItem("mathScores", JSON.stringify(allScores));

        return updatedScores;
      });
    }
  }, [location.state, userId]);

  const handleLessonClick = (index) => {
    setSelectedLesson(prev => (prev === index ? null : index));
  };

  const handleContentClick = (lessonIndex, contentIndex) => {
    navigate(`/math/Quiz?lesson=${lessonIndex}&content=${contentIndex}`);
  };

  const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);

  return (
    <div className={styles.mathpageContainer}>
      <div className={styles.mathpageBgTopLeft}></div>
      <div className={styles.mathpageBgBottomRight}></div>
      <div className={styles.mathpageHeader}>
        <span>คณิตศาสตร์</span>
        <span className={styles.mathpageScore}>คะแนนรวมวิชา {totalScore}/90</span>
      </div>

      {lessons.map((lesson, lessonIndex) => (
        <div key={lessonIndex} className={styles.mathpageSection}>
          <div
            className={styles.mathpageTitle}
            onClick={() => handleLessonClick(lessonIndex)}
          >
            {lesson.title}
          </div>
          {selectedLesson === lessonIndex && (
            <div className={`${styles.mathpageItems} slide-down`}>
              {lesson.contents.map((content, contentIndex) => {
                const key = `${lessonIndex}-${contentIndex}`;
                return (
                  <div
                    key={contentIndex}
                    className={styles.mathpageItem}
                    onClick={() => handleContentClick(lessonIndex, contentIndex)}
                  >
                    <span>{content}</span>
                    <span className={styles.mathpageItemScore}>
                      คะแนน {scores[key] || 0}/10
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MathPage;
