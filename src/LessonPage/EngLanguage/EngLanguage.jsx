import React, { useState , useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./EngLanguage.module.css";

const EnglanguagePage = () => {
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

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem("engScores")) || {};
        setScores(savedScores);
    }, []);

    useEffect(() => {
        const allScores = JSON.parse(localStorage.getItem("engScores")) || {};
        const userScores = allScores[userId] || {};
        setScores(userScores);
    }, [userId]);

    useEffect(() => {
        const { lessonIndex, contentIndex, score } = location.state || {};
        if (typeof score === "number") {
            const key = `${lessonIndex}-${contentIndex}`;
            setScores(prevScores => {
                const updatedScores = { ...prevScores, [key]: score };
                const allScores = JSON.parse(localStorage.getItem("engScores")) || {};
                allScores[userId] = { ...(allScores[userId] || {}), ...updatedScores };
                localStorage.setItem("engScores", JSON.stringify(allScores));
                return updatedScores;
            });
        }
    }, [location.state, userId]);
    
    const handleLessonClick = (index) => {
        setSelectedLesson(prev => (prev === index ? null : index));
    };

    const handleContentClick = (lessonIndex, contentIndex) => {
        navigate(`/english/quiz?lesson=${lessonIndex}&content=${contentIndex}`);
    };

    const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);

    return (
        <div className={styles.engpageContainer}>
            <div className={styles.engpageBgTopLeft}></div>
            <div className={styles.engpageBgBottomRight}></div>
            <div className={styles.engpageHeader}>
                <span>ภาษาอังกฤษ</span>
                <span className={styles.engpageScore}>คะแนนรวมวิชา {totalScore}/90</span>
            </div>

            {lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className={styles.engpageSection}>
                    <div className={styles.engpageTitle} onClick={() => handleLessonClick(lessonIndex)}>
                        {lesson.title}
                    </div>
                    {selectedLesson === lessonIndex && (
                        <div className={`${styles.engpageItems} slide-down`}>
                            {lesson.contents.map((content, contentIndex) => {
                                const key = `${lessonIndex}-${contentIndex}`;
                                return (
                                    <div
                                        key={contentIndex}
                                        className={styles.engpageItem}
                                        onClick={() => handleContentClick(lessonIndex, contentIndex)}
                                    >
                                        <span>{content}</span>
                                        <span className={styles.engpageItemScore}>คะแนน {scores[key] || 0}/10</span>
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

export default EnglanguagePage;
