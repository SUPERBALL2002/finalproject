import React, { useState , useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Science.module.css";

const SciPage = () => {
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
        const savedScores = JSON.parse(localStorage.getItem("SciScores")) || {};
        setScores(savedScores);
    }, []);
  
    useEffect(() => {
        const allScores = JSON.parse(localStorage.getItem("SciScores")) || {};
        const userScores = allScores[userId] || {};
        setScores(userScores);
    }, [userId]);
    
    useEffect(() => {
        const { lessonIndex, contentIndex, score } = location.state || {};
        if (typeof score === "number") {
            const key = `${lessonIndex}-${contentIndex}`;
            setScores(prevScores => {
                const updatedScores = { ...prevScores, [key]: score };
                const allScores = JSON.parse(localStorage.getItem("SciScores")) || {};
                allScores[userId] = { ...(allScores[userId] || {}), ...updatedScores };
                localStorage.setItem("SciScores", JSON.stringify(allScores));
                return updatedScores;
            });
        }
    }, [location.state, userId]);

    const handleLessonClick = (index) => {
        setSelectedLesson((prev) => (prev === index ? null : index));
    };

    const handleContentClick = (lessonIndex, contentIndex) => {
        const path = `/science/quiz?lesson=${lessonIndex}&content=${contentIndex}`;
        navigate(path);
    };

    const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);

    return (
        <div className={styles.sciencepageContainer}>
            <div className={styles.sciencepageBgTopLeft}></div>
            <div className={styles.sciencepageBgBottomRight}></div>
            <div className={styles.sciencepageHeader}>
                <span>วิทยาศาสตร์</span>
                <span className={styles.sciencepageScore}>คะแนนรวมวิชา {totalScore}/90</span>
            </div>

            {lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className={styles.sciencepageSection}>
                    <div className={styles.sciencepageTitle} onClick={() => handleLessonClick(lessonIndex)}>
                        <p>{lesson.title}</p>
                       
                    </div>
                    {selectedLesson === lessonIndex && (
                        <div className={`${styles.sciencepageItems} slide-down`}>
                            {lesson.contents.map((content, contentIndex) => {
                                const key = `${lessonIndex}-${contentIndex}`;
                                return (
                                    <div key={contentIndex} className={styles.sciencepageItem} onClick={() => handleContentClick(lessonIndex, contentIndex)}>
                                        <span>{content}</span>
                                        <span className={styles.sciencepageItemScore}>คะแนน {scores[key] || 0}/10</span>
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

export default SciPage;
