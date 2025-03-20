import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lessonspage.css";

const ThlanguagePage = () => {
    const navigate = useNavigate();
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [scores, setScores] = useState({}); // เก็บคะแนนของแต่ละเนื้อหา

    const lessons = [
        { title: "บทที่ 1", contents: ["เนื้อหาส่วนที่ 1", "เนื้อหาส่วนที่ 2", "เนื้อหาส่วนที่ 3"] },
        { title: "บทที่ 2", contents: ["เนื้อหาส่วนที่ 1", "เนื้อหาส่วนที่ 2", "เนื้อหาส่วนที่ 3"] },
        { title: "บทที่ 3", contents: ["เนื้อหาส่วนที่ 1", "เนื้อหาส่วนที่ 2", "เนื้อหาส่วนที่ 3"] },
    ];

    const handleLessonClick = (index) => {
        setSelectedLesson((prev) => (prev === index ? null : index)); // เปิด/ปิดเนื้อหาของบทเรียน
    };

    const handleContentClick = (lessonIndex, contentIndex) => {
        const path = `/thai/quiz?lesson=${lessonIndex}&content=${contentIndex}`;
        navigate(path);
    };

    const updateScore = (lessonIndex, contentIndex, score) => {
        const key = `${lessonIndex}-${contentIndex}`;
        setScores((prevScores) => ({ ...prevScores, [key]: score }));
      };

    // คำนวณคะแนนรวมของทุกเนื้อหา
    const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0) || 0;

    return (
        <div className="lesson-container">
            <div className="lesson-header">
                <span>ภาษาไทย</span>
                <span className="lesson-score">คะแนนรวมวิชา {totalScore}/90</span>
            </div>

            {lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="lesson-section">
                    <div className="lesson-title" onClick={() => handleLessonClick(lessonIndex)}>
                        {lesson.title}
                    </div>
                    {selectedLesson === lessonIndex && (
                        <div className="lesson-items">
                            {lesson.contents.map((content, contentIndex) => {
                                const key = `${lessonIndex}-${contentIndex}`;
                                return (
                                    <div key={contentIndex} className="lesson-item" onClick={() => handleContentClick(lessonIndex, contentIndex)}>
                                        <span>{content}</span>
                                        <span className="score">คะแนน {scores[key] || 0}/10</span>
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

export default ThlanguagePage;
