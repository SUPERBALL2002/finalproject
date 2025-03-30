import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Quiz.css";

const mathQuestions = {
    0: { // บทที่ 1
        0: [
            { question: "2 + 3 = ?", options: ["4", "5", "6", "7"], answer: "5" },
            { question: "5 - 2 = ?", options: ["1", "2", "3", "4"], answer: "3" },
            { question: "6 + 4 = ?", options: ["8", "9", "10", "11"], answer: "10" },
            { question: "3 × 2 = ?", options: ["5", "6", "7", "8"], answer: "6" },
            { question: "9 ÷ 3 = ?", options: ["2", "3", "4", "5"], answer: "3" },
            { question: "10 - 7 = ?", options: ["1", "2", "3", "4"], answer: "3" },
            { question: "8 + 1 = ?", options: ["7", "8", "9", "10"], answer: "9" },
            { question: "4 × 2 = ?", options: ["6", "7", "8", "9"], answer: "8" },
            { question: "12 ÷ 4 = ?", options: ["2", "3", "4", "5"], answer: "3" },
            { question: "7 + 3 = ?", options: ["9", "10", "11", "12"], answer: "10" }
        ],
        1: [
            { question: "15 - 6 = ?", options: ["8", "9", "10", "11"], answer: "9" },
            { question: "4 × 3 = ?", options: ["9", "10", "11", "12"], answer: "12" },
            { question: "18 ÷ 6 = ?", options: ["2", "3", "4", "5"], answer: "3" },
            { question: "10 + 5 = ?", options: ["13", "14", "15", "16"], answer: "15" },
            { question: "20 - 7 = ?", options: ["11", "12", "13", "14"], answer: "13" },
            { question: "9 × 2 = ?", options: ["16", "17", "18", "19"], answer: "18" },
            { question: "21 ÷ 3 = ?", options: ["6", "7", "8", "9"], answer: "7" },
            { question: "5 + 9 = ?", options: ["12", "13", "14", "15"], answer: "14" },
            { question: "6 × 4 = ?", options: ["22", "23", "24", "25"], answer: "24" },
            { question: "25 - 10 = ?", options: ["12", "13", "14", "15"], answer: "15" }
        ],
        2: [
            { question: "7 × 2 = ?", options: ["12", "13", "14", "15"], answer: "14" },
            { question: "18 ÷ 2 = ?", options: ["8", "9", "10", "11"], answer: "9" },
            { question: "20 - 8 = ?", options: ["10", "11", "12", "13"], answer: "12" },
            { question: "3 × 5 = ?", options: ["12", "13", "14", "15"], answer: "15" },
            { question: "40 ÷ 5 = ?", options: ["7", "8", "9", "10"], answer: "8" },
            { question: "6 × 3 = ?", options: ["16", "17", "18", "19"], answer: "18" },
            { question: "50 - 25 = ?", options: ["22", "23", "24", "25"], answer: "25" },
            { question: "11 + 9 = ?", options: ["18", "19", "20", "21"], answer: "20" },
            { question: "9 × 3 = ?", options: ["26", "27", "28", "29"], answer: "27" },
            { question: "36 ÷ 4 = ?", options: ["7", "8", "9", "10"], answer: "9" }
        ]
    },
    1: { // บทที่ 2
        0: [
            { question: "50 ÷ 5 = ?", options: ["8", "9", "10", "11"], answer: "10" },
            { question: "12 × 2 = ?", options: ["22", "23", "24", "25"], answer: "24" },
            { question: "100 - 45 = ?", options: ["52", "54", "55", "57"], answer: "55" },
            { question: "5 × 9 = ?", options: ["43", "44", "45", "46"], answer: "45" },
            { question: "81 ÷ 9 = ?", options: ["8", "9", "10", "11"], answer: "9" },
            { question: "36 ÷ 6 = ?", options: ["5", "6", "7", "8"], answer: "6" },
            { question: "11 × 3 = ?", options: ["32", "33", "34", "35"], answer: "33" },
            { question: "55 - 20 = ?", options: ["32", "33", "34", "35"], answer: "35" },
            { question: "9 × 8 = ?", options: ["70", "71", "72", "73"], answer: "72" },
            { question: "144 ÷ 12 = ?", options: ["11", "12", "13", "14"], answer: "12" }
        ],
        1: [
            { question: "60 ÷ 6 = ?", options: ["9", "10", "11", "12"], answer: "10" },
            { question: "20 × 2 = ?", options: ["30", "40", "50", "60"], answer: "40" },
            { question: "45 - 19 = ?", options: ["23", "24", "25", "26"], answer: "26" },
            { question: "72 ÷ 8 = ?", options: ["8", "9", "10", "11"], answer: "9" },
            { question: "33 + 27 = ?", options: ["55", "56", "57", "60"], answer: "60" },
            { question: "8 × 7 = ?", options: ["54", "55", "56", "57"], answer: "56" },
            { question: "99 ÷ 9 = ?", options: ["10", "11", "12", "13"], answer: "11" },
            { question: "22 × 3 = ?", options: ["64", "65", "66", "67"], answer: "66" },
            { question: "150 - 75 = ?", options: ["72", "73", "74", "75"], answer: "75" },
            { question: "81 ÷ 9 = ?", options: ["8", "9", "10", "11"], answer: "9" }
        ],
        2: [
            { question: "200 ÷ 4 = ?", options: ["48", "49", "50", "51"], answer: "50" },
            { question: "25 × 4 = ?", options: ["98", "99", "100", "101"], answer: "100" },
            { question: "144 ÷ 12 = ?", options: ["10", "11", "12", "13"], answer: "12" },
            { question: "15 × 6 = ?", options: ["88", "89", "90", "91"], answer: "90" },
            { question: "330 ÷ 3 = ?", options: ["109", "109", "110", "111"], answer: "110" },
            { question: "20 × 5 = ?", options: ["90", "95", "100", "105"], answer: "100" },
            { question: "81 ÷ 9 = ?", options: ["7", "8", "9", "10"], answer: "9" },
            { question: "12 × 12 = ?", options: ["142", "143", "144", "145"], answer: "144" },
            { question: "250 - 125 = ?", options: ["122", "123", "124", "125"], answer: "125" },
            { question: "175 ÷ 5 = ?", options: ["34", "35", "36", "37"], answer: "35" }
        ]
    },
    2: { // บทที่ 3
        0: [
            { question: "100 ÷ 4 = ?", options: ["22", "24", "25", "26"], answer: "25" },
            { question: "15 × 3 = ?", options: ["44", "45", "46", "47"], answer: "45" },
            { question: "250 - 75 = ?", options: ["172", "173", "174", "175"], answer: "175" },
            { question: "60 ÷ 5 = ?", options: ["10", "11", "12", "13"], answer: "12" },
            { question: "13 × 7 = ?", options: ["90", "91", "92", "93"], answer: "91" },
            { question: "200 ÷ 10 = ?", options: ["18", "19", "20", "21"], answer: "20" },
            { question: "16 × 4 = ?", options: ["62", "63", "64", "65"], answer: "64" },
            { question: "88 ÷ 8 = ?", options: ["9", "10", "11", "12"], answer: "11" },
            { question: "99 ÷ 9 = ?", options: ["10", "11", "12", "13"], answer: "11" },
            { question: "175 - 75 = ?", options: ["95", "96", "97", "98"], answer: "100" }
        ],
        1: [
            { question: "99 × 2 = ?", options: ["197", "198", "199", "200"], answer: "198" },
            { question: "500 ÷ 5 = ?", options: ["99", "100", "101", "102"], answer: "100" },
            { question: "16 × 6 = ?", options: ["94", "95", "96", "97"], answer: "96" },
            { question: "180 ÷ 6 = ?", options: ["28", "29", "30", "31"], answer: "30" },
            { question: "450 - 225 = ?", options: ["220", "221", "222", "225"], answer: "225" },
            { question: "12 × 11 = ?", options: ["130", "131", "132", "133"], answer: "132" },
            { question: "990 ÷ 9 = ?", options: ["109", "109", "110", "111"], answer: "110" },
            { question: "144 × 1 = ?", options: ["141", "142", "143", "144"], answer: "144" },
            { question: "250 - 150 = ?", options: ["99", "100", "101", "102"], answer: "100" },
            { question: "36 ÷ 3 = ?", options: ["10", "11", "12", "13"], answer: "12" }
        ],
        2: [
            { question: "72 ÷ 6 = ?", options: ["10", "11", "12", "13"], answer: "12" },
            { question: "99 × 3 = ?", options: ["296", "297", "298", "299"], answer: "297" },
            { question: "400 ÷ 4 = ?", options: ["98", "99", "100", "101"], answer: "100" },
            { question: "30 × 7 = ?", options: ["208", "209", "210", "211"], answer: "210" },
            { question: "225 ÷ 5 = ?", options: ["44", "45", "46", "47"], answer: "45" },
            { question: "88 × 2 = ?", options: ["174", "175", "176", "177"], answer: "176" },
            { question: "500 ÷ 5 = ?", options: ["98", "99", "100", "101"], answer: "100" },
            { question: "144 × 2 = ?", options: ["286", "287", "288", "289"], answer: "288" },
            { question: "330 ÷ 3 = ?", options: ["109", "109", "110", "111"], answer: "110" },
            { question: "100 × 1 = ?", options: ["97", "98", "99", "100"], answer: "100" }
        ]
    }
};

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const MathQuiz = () => {
    const [searchParams] = useSearchParams();
    const lessonIndex = parseInt(searchParams.get("lesson"), 10);
    const contentIndex = parseInt(searchParams.get("content"), 10);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
        const [answers, setAnswers] = useState([]);
        const [score, setScore] = useState(null);
        const [shuffledQuestions, setShuffledQuestions] = useState([]);
        const [timeLeft, setTimeLeft] = useState(60);
        const [isTimeUp, setIsTimeUp] = useState(false);
        const [wrongAnswers, setWrongAnswers] = useState([]);
        const [timerRunning, setTimerRunning] = useState(true);

    useEffect(() => {
            if (mathQuestions[lessonIndex]?.[contentIndex]) {
                setShuffledQuestions(shuffleArray([...mathQuestions[lessonIndex][contentIndex]]));
                setAnswers(Array(10).fill(null));
            }
        }, [lessonIndex, contentIndex]);

    useEffect(() => {
            if (timerRunning) {
                const timer = setInterval(() => {
                    setTimeLeft((prev) => {
                        if (prev > 0) {
                            return prev - 1;
                        } else {
                            clearInterval(timer);
                            setIsTimeUp(true);
                            handleSubmit(); // หมดเวลาให้ส่งคำตอบทันที
                            return 0;
                        }
                    });
                }, 1000);
                return () => clearInterval(timer);
            }
        }, [timerRunning]);
        
        const handleAnswerChange = (option) => {
            const newAnswers = [...answers];
            newAnswers[currentQuestionIndex] = option;
            setAnswers(newAnswers);
        };

    const handleNext = () => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        setTimerRunning(false); // หยุดจับเวลา
        let newScore = 0;
        let newWrongAnswers = [];

        shuffledQuestions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                newScore += 1;
            } else {
                newWrongAnswers.push({
                    question: q.question,
                    correctAnswer: q.answer,
                    selectedAnswer: answers[index] || "ไม่ได้ตอบ",
                });
            }
        });
        setScore(newScore);
        setWrongAnswers(newWrongAnswers);
    };

    const handleRestart = () => {
        setAnswers([]);
        setScore(null);
        setIsTimeUp(false);
        setTimeLeft(60);
        setCurrentQuestionIndex(0);
        setWrongAnswers([]);
        setTimerRunning(true);

        // รีเซ็ตคำถามใหม่โดยการสุ่ม
        const shuffled = [...mathQuestions[lessonIndex][contentIndex]].sort(() => Math.random() - 0.5);
        setShuffledQuestions(shuffled);
    };

    return (
        <div className="quiz-container">
            <h2>แบบทดสอบวิชาคณิตศาสตร์</h2>
            <h3>บทที่ {lessonIndex + 1} - เนื้อหาส่วนที่ {contentIndex + 1}</h3>
            <h3>เวลาที่เหลือ: {timeLeft} วินาที</h3>

            <div className="question">
                <p>{currentQuestionIndex + 1}. {shuffledQuestions[currentQuestionIndex]?.question || ""}</p>
                <div className="options">
                    {shuffledQuestions[currentQuestionIndex]?.options?.map((option) => (
                        <button
                            key={option}
                            className={`option ${answers[currentQuestionIndex] === option ? "selected" : ""}`}
                            onClick={() => handleAnswerChange(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* ปุ่มควบคุม */}
            <div className="buttons">
    <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>ย้อนกลับ</button>
    {currentQuestionIndex < shuffledQuestions.length - 1 ? (
        <button
            onClick={handleNext}
            disabled={answers[currentQuestionIndex] === null} // ✅ ป้องกันไม่ให้ไปต่อถ้ายังไม่ตอบ
        >
            ถัดไป
        </button>
    ) : (
        <button onClick={handleSubmit} disabled={isTimeUp}>ส่งคำตอบ</button>
    )}
</div>

            {/* แสดงคะแนนเมื่อหมดเวลา */}
            {score !== null && (
                <div className="result">
                    <h3 className="score">คะแนนของคุณ: {score} / {shuffledQuestions.length}</h3>
                    {isTimeUp && <p className="time-up">⏳ หมดเวลาแล้ว!</p>}

                    <div className="wrong-answers">
                        {wrongAnswers.length > 0 && (
                            <>
                                <h4>คำตอบที่ผิด:</h4>
                                <ul>
                                    {wrongAnswers.map((item, index) => (
                                        <li key={index}>
                                            <p><strong>คำถาม:</strong> {item.question}</p>
                                            <p><strong>✅ คำตอบที่ถูกต้อง:</strong> {item.correctAnswer}</p>
                                            <p><strong>❌ คำตอบที่เลือก:</strong> {item.selectedAnswer}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    <button onClick={handleRestart} className="restart">เริ่มใหม่</button>
                </div>
            )}
        </div>
    );
};

export default MathQuiz;