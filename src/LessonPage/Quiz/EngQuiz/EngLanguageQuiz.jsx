import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./EngLanguageQuiz.module.css";

const engQuestions = {
        0: { // บทที่ 1: คำศัพท์พื้นฐาน (Basic Vocabulary)
            0: [ // ส่วนที่ 1: สัตว์ (Animals)
                { question: "What animal says 'meow'?", options: ["Dog", "Cat", "Bird", "Fish"], answer: "Cat" },
                { question: "Which animal can fly?", options: ["Dog", "Cat", "Bird", "Fish"], answer: "Bird" },
                { question: "What animal lives in water?", options: ["Elephant", "Lion", "Fish", "Tiger"], answer: "Fish" },
                { question: "Which animal is the king of the jungle?", options: ["Elephant", "Tiger", "Lion", "Giraffe"], answer: "Lion" },
                { question: "What animal has a long trunk?", options: ["Tiger", "Elephant", "Monkey", "Rabbit"], answer: "Elephant" },
                { question: "Which animal jumps and has long ears?", options: ["Rabbit", "Dog", "Cat", "Horse"], answer: "Rabbit" },
                { question: "What is the biggest land animal?", options: ["Elephant", "Rhino", "Horse", "Cow"], answer: "Elephant" },
                { question: "Which of these is a farm animal?", options: ["Dog", "Cow", "Fox", "Wolf"], answer: "Cow" },
                { question: "Which animal loves bananas?", options: ["Monkey", "Cat", "Dog", "Horse"], answer: "Monkey" },
                { question: "Which bird is known for hooting?", options: ["Parrot", "Owl", "Eagle", "Sparrow"], answer: "Owl" }
            ],
            1: [ // ส่วนที่ 2: สิ่งของรอบตัว (Objects Around Us)
                { question: "What do you use to write?", options: ["Pen", "Chair", "Table", "Shoes"], answer: "Pen" },
                { question: "Where do you sleep?", options: ["Bed", "Chair", "Table", "Door"], answer: "Bed" },
                { question: "What do you wear on your feet?", options: ["Shoes", "Hat", "Shirt", "Pants"], answer: "Shoes" },
                { question: "What do you sit on?", options: ["Table", "Chair", "TV", "Clock"], answer: "Chair" },
                { question: "Which one tells time?", options: ["Chair", "Clock", "Door", "Bag"], answer: "Clock" },
                { question: "What do you use to read a story?", options: ["Book", "TV", "Tablet", "Radio"], answer: "Book" },
                { question: "What do you open to enter a room?", options: ["Door", "Window", "Table", "Bed"], answer: "Door" },
                { question: "Where do you keep your books at school?", options: ["Bag", "Table", "Chair", "Socks"], answer: "Bag" },
                { question: "What do you wear on your head?", options: ["Hat", "Gloves", "Socks", "Jacket"], answer: "Hat" },
                { question: "What do you use to drink water?", options: ["Cup", "Spoon", "Plate", "Pillow"], answer: "Cup" }
            ],
            2: [ // ส่วนที่ 3: สีและตัวเลข (Colors and Numbers)
                { question: "What color is the sky?", options: ["Red", "Green", "Blue", "Yellow"], answer: "Blue" },
                { question: "What color is a banana?", options: ["Red", "Green", "Yellow", "Purple"], answer: "Yellow" },
                { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
                { question: "What is the color of grass?", options: ["Blue", "Green", "Red", "Black"], answer: "Green" },
                { question: "How many legs does a spider have?", options: ["4", "6", "8", "10"], answer: "8" },
                { question: "What color is an apple?", options: ["Pink", "Black", "Red", "Gray"], answer: "Red" },
                { question: "What number comes after 5?", options: ["4", "6", "7", "8"], answer: "6" },
                { question: "What is 10 - 3?", options: ["5", "6", "7", "8"], answer: "7" },
                { question: "What color is the sun?", options: ["Blue", "Yellow", "Red", "White"], answer: "Yellow" },
                { question: "What number comes before 10?", options: ["8", "9", "10", "11"], answer: "9" }
            ]
    },
    1: {
        0: [ // ส่วนที่ 1: คำสรรพนาม (Pronouns)
            { question: "Which word is a pronoun?", options: ["Apple", "He", "Run", "Big"], answer: "He" },
            { question: "Which pronoun replaces 'John'?", options: ["She", "It", "He", "They"], answer: "He" },
            { question: "What pronoun would you use for a group of people?", options: ["I", "He", "They", "She"], answer: "They" },
            { question: "Which pronoun is for a girl?", options: ["He", "She", "They", "It"], answer: "She" },
            { question: "What pronoun replaces 'The cat'?", options: ["He", "She", "It", "They"], answer: "It" },
            { question: "Which pronoun is for yourself?", options: ["He", "She", "I", "They"], answer: "I" },
            { question: "What pronoun replaces 'Tom and Jerry'?", options: ["He", "She", "They", "It"], answer: "They" },
            { question: "Which pronoun is used for a book?", options: ["He", "She", "It", "They"], answer: "It" },
            { question: "Which pronoun would replace 'Mom'?", options: ["He", "She", "They", "It"], answer: "She" },
            { question: "Which pronoun is used for a single boy?", options: ["She", "It", "They", "He"], answer: "He" }
        ],
        1: [ // ส่วนที่ 2: คำกริยา (Verbs)
            { question: "Which word is a verb?", options: ["Run", "Happy", "Table", "Green"], answer: "Run" },
            { question: "What is the past tense of 'go'?", options: ["Goed", "Went", "Gone", "Go"], answer: "Went" },
            { question: "Which verb means to eat quickly?", options: ["Jump", "Run", "Devour", "Write"], answer: "Devour" },
            { question: "Which action is done with the hands?", options: ["Swim", "Clap", "Run", "Jump"], answer: "Clap" },
            { question: "What verb means to move fast?", options: ["Walk", "Run", "Sit", "Cry"], answer: "Run" },
            { question: "Which verb means to express happiness?", options: ["Cry", "Laugh", "Sit", "Stand"], answer: "Laugh" },
            { question: "What is the past tense of 'eat'?", options: ["Eaten", "Ate", "Eating", "Eats"], answer: "Ate" },
            { question: "What verb describes what birds do?", options: ["Swim", "Fly", "Run", "Clap"], answer: "Fly" },
            { question: "Which verb means to make sound with your mouth?", options: ["Write", "Sing", "Jump", "Dance"], answer: "Sing" },
            { question: "Which verb describes resting at night?", options: ["Run", "Sing", "Sleep", "Talk"], answer: "Sleep" }
        ],
        2: [ // ส่วนที่ 3: คำคุณศัพท์ (Adjectives)
            { question: "Which word is an adjective?", options: ["Happy", "Run", "Dog", "Eat"], answer: "Happy" },
            { question: "What adjective describes the sun?", options: ["Hot", "Cold", "Dark", "Small"], answer: "Hot" },
            { question: "Which adjective describes a baby?", options: ["Big", "Small", "Old", "Tall"], answer: "Small" },
            { question: "Which adjective describes ice?", options: ["Hot", "Cold", "Soft", "Dry"], answer: "Cold" },
            { question: "Which adjective describes honey?", options: ["Salty", "Sweet", "Bitter", "Sour"], answer: "Sweet" },
            { question: "Which adjective describes an elephant?", options: ["Small", "Big", "Fast", "Thin"], answer: "Big" },
            { question: "What adjective describes a turtle?", options: ["Fast", "Slow", "Strong", "Big"], answer: "Slow" },
            { question: "What adjective describes a ghost?", options: ["Scary", "Funny", "Bright", "Soft"], answer: "Scary" },
            { question: "Which adjective describes a diamond?", options: ["Soft", "Hard", "Heavy", "Slow"], answer: "Hard" },
            { question: "Which adjective describes a rainbow?", options: ["Dark", "Colorful", "Cold", "Loud"], answer: "Colorful" }
        ]
    },
    2: {
        0: [ // ส่วนที่ 1: การทักทาย (Greetings)
            { question: "What do you say when you meet someone in the morning?", options: ["Good night", "Hello", "Good morning", "Bye"], answer: "Good morning" },
            { question: "What do you say when you leave?", options: ["Hello", "Bye", "Thank you", "Good evening"], answer: "Bye" },
            { question: "Which greeting is used at night?", options: ["Good night", "Good morning", "Good afternoon", "Hello"], answer: "Good night" },
            { question: "What do you say to be polite?", options: ["Thank you", "Bye", "Hello", "See you"], answer: "Thank you" },
            { question: "Which greeting is used in the afternoon?", options: ["Good night", "Good afternoon", "Good evening", "Hi"], answer: "Good afternoon" },
            { question: "What do you say when meeting a friend?", options: ["Hi", "Bye", "See you", "Good night"], answer: "Hi" },
            { question: "What do you say after someone helps you?", options: ["Sorry", "Thank you", "Hello", "Bye"], answer: "Thank you" },
            { question: "Which greeting is formal?", options: ["Hi", "Hey", "Hello", "Good evening"], answer: "Good evening" },
            { question: "What do you say when you see a teacher?", options: ["Bye", "Good morning", "Hey", "See you"], answer: "Good morning" },
            { question: "Which greeting is casual?", options: ["Good afternoon", "Hey", "Hello", "Good morning"], answer: "Hey" }
        ],
        1: [ // ส่วนที่ 2: การถามและตอบเกี่ยวกับตัวเอง (Asking and Answering About Yourself)
            { question: "What question asks for someone’s name?", options: ["How old are you?", "What is your name?", "Where are you from?", "How are you?"], answer: "What is your name?" },
            { question: "How do you answer 'What is your name?'", options: ["I am fine.", "My name is Anna.", "I am ten years old.", "I am from Thailand."], answer: "My name is Anna." },
            { question: "Which question asks about age?", options: ["Where do you live?", "What color do you like?", "How old are you?", "What is your name?"], answer: "How old are you?" },
            { question: "How do you answer 'How old are you?'", options: ["I am fine.", "I like apples.", "I am 10 years old.", "My name is Tom."], answer: "I am 10 years old." },
            { question: "Which question asks about nationality?", options: ["Where are you from?", "What is your favorite food?", "How are you?", "What do you do?"], answer: "Where are you from?" },
            { question: "How do you answer 'Where are you from?'", options: ["I am from England.", "I like reading.", "I am 9 years old.", "My favorite color is blue."], answer: "I am from England." },
            { question: "Which question asks about someone’s well-being?", options: ["What is your name?", "How are you?", "Where do you live?", "What do you like?"], answer: "How are you?" },
            { question: "How do you answer 'How are you?'", options: ["I am fine, thank you.", "I am 11 years old.", "I like pizza.", "My name is Alex."], answer: "I am fine, thank you." },
            { question: "Which question asks about hobbies?", options: ["What do you like to do?", "Where do you live?", "How old are you?", "What is your favorite color?"], answer: "What do you like to do?" },
            { question: "How do you answer 'What do you like to do?'", options: ["I like to draw.", "I am from Canada.", "I am 8 years old.", "My name is Lisa."], answer: "I like to draw." }
        ],
        2: [ // ส่วนที่ 3: การซื้อของและขอความช่วยเหลือ (Shopping and Asking for Help)
            { question: "What do you say when you want to buy something?", options: ["How much is this?", "Where are you from?", "What time is it?", "Can I help you?"], answer: "How much is this?" },
            { question: "How do you ask for the price?", options: ["What color is it?", "How much is it?", "Where is it from?", "What is your name?"], answer: "How much is it?" },
            { question: "Which phrase asks for help?", options: ["Can you help me?", "I like apples.", "What is this?", "See you later."], answer: "Can you help me?" },
            { question: "What do you say when you don’t understand something?", options: ["I don’t understand.", "I like it.", "It is mine.", "What color is it?"], answer: "I don’t understand." },
            { question: "How do you ask for something politely?", options: ["Give me that!", "I want that!", "Can I have that, please?", "I don’t like that."], answer: "Can I have that, please?" },
            { question: "What do you say when someone helps you?", options: ["Sorry.", "Thank you.", "What is this?", "Good night."], answer: "Thank you." },
            { question: "Which phrase is used to offer help?", options: ["What time is it?", "Do you need help?", "I like blue.", "How old are you?"], answer: "Do you need help?" },
            { question: "What do you say if something is too expensive?", options: ["That’s too expensive.", "I like it.", "It is cheap.", "What time is it?"], answer: "That’s too expensive." },
            { question: "What do you say when you are lost?", options: ["Where am I?", "I am happy.", "It is big.", "How old are you?"], answer: "Where am I?" },
            { question: "How do you ask for directions?", options: ["Where is the bathroom?", "What time is it?", "Do you like it?", "Can I have some?"], answer: "Where is the bathroom?" }
        ]
    }
};

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const EngQuiz = () => {
    const [searchParams] = useSearchParams();
    const lessonIndex = parseInt(searchParams.get("lesson"), 10);
    const contentIndex = parseInt(searchParams.get("content"), 10);

    // เรียก Hook ทั้งหมดไว้ด้านบน
    const [lessonFromDB, setLessonFromDB] = useState(null);
    const user = { UserID: localStorage.getItem("userId") };
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [timerRunning, setTimerRunning] = useState(true);

    // เรียก Hook เสร็จแล้วค่อยเช็คค่าพารามิเตอร์
    const isInvalidParam = isNaN(lessonIndex) || isNaN(contentIndex);

    useEffect(() => {
        if (isInvalidParam) return;
        async function fetchLesson() {
            try {
                const res = await fetch(`http://localhost:3001/api/lessons/${lessonIndex + 1}`);
                if (!res.ok) throw new Error('ไม่พบข้อมูลบทเรียน');
                const data = await res.json();
                setLessonFromDB(data);
            } catch (error) {
                console.error('โหลดบทเรียนล้มเหลว', error);
                setLessonFromDB(null);
            }
        }
        fetchLesson();
    }, [lessonIndex, isInvalidParam]);

    useEffect(() => {
        if (isInvalidParam) return;
        if (engQuestions[lessonIndex]?.[contentIndex]) {
            setShuffledQuestions(shuffleArray([...engQuestions[lessonIndex][contentIndex]]));
            setAnswers(Array(10).fill(null));
        }
    }, [lessonIndex, contentIndex, isInvalidParam]);

    useEffect(() => {
        if (isInvalidParam) return;
        if (timerRunning) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(timer);
                        setIsTimeUp(true);
                        handleSubmit();
                        return 0;
                    }
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    // eslint-disable-next-line
    }, [timerRunning, isInvalidParam]);

    // ฟังก์ชันเปลี่ยนคำตอบที่เลือก
    const handleAnswerChange = (option) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = option;
        setAnswers(newAnswers);
    };

    // ฟังก์ชันไปยังคำถามถัดไป
    const handleNext = () => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // ฟังก์ชันย้อนกลับไปยังคำถามก่อนหน้า
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // ฟังก์ชันตรวจสอบคำตอบและคำนวณคะแนน
    const handleSubmit = async () => {
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

        const SubjectID = lessonIndex + 1;  // กำหนด SubjectID จาก lessonIndex

        try {
            await fetch('http://localhost:3001/api/exams/exam', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    SubjectID: 4,
                    examscore: newScore,
                    testat: new Date().toISOString().slice(0, 10),
                    UserID: user.UserID,  // ต้องมีการเก็บรหัสผู้ใช้
                    lesson_ID: lessonFromDB ? lessonFromDB.lesson_ID : null,
                }),
            });
  } catch (error) {
    console.error('บันทึกผลสอบล้มเหลว', error);
  }
        // บันทึกคะแนนลง localStorage ตาม userId
    if (user.UserID) {
        const allScores = JSON.parse(localStorage.getItem("engScores")) || {};
        const userScores = allScores[user.UserID] || {};
        const key = `${lessonIndex}-${contentIndex}`;
        userScores[key] = newScore;
        allScores[user.UserID] = userScores;
        localStorage.setItem("engScores", JSON.stringify(allScores));
    }
    };

    // ฟังก์ชันเริ่มต้นแบบทดสอบใหม่
    const handleRestart = () => {
        setAnswers([]);
        setScore(null);
        setIsTimeUp(false);
        setTimeLeft(60);
        setCurrentQuestionIndex(0);
        setWrongAnswers([]);
        setTimerRunning(true);

        const shuffled = shuffleArray([...engQuestions[lessonIndex][contentIndex]]);
        setShuffledQuestions(shuffled);
    };
    if (isInvalidParam) {
        return <p>ไม่พบข้อมูลบทเรียนหรือเนื้อหา</p>;
    }

    return (
        <div className={styles.engQuizLayout}>
            <div className={styles.engQuizBgRight}></div>
            <div className={styles.engQuizMain}>
                <h2>แบบทดสอบวิชาภาษาอังกฤษ</h2>
                <p className={styles.engQuizSubtitle}>บทที่ {lessonIndex + 1} - เนื้อหาส่วนที่ {contentIndex + 1}</p>
                <p className={styles.engQuizTimer}>เวลาที่เหลือ: {timeLeft} วินาที</p>

                {/* แสดงคำถามทีละข้อ */}
                <div className={styles.engQuizQuestion}>
                    <h3>{currentQuestionIndex + 1}. {shuffledQuestions[currentQuestionIndex]?.question || ""}</h3>
                    <div className={styles.engQuizOptions}>
                        {shuffledQuestions[currentQuestionIndex]?.options?.map((option) => (
                            <button
                                key={option}
                                className={`${styles.engQuizOption} ${answers[currentQuestionIndex] === option ? styles.selected : ""}`}
                                onClick={() => handleAnswerChange(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ปุ่มควบคุม */}
                <div className={styles.engQuizButtons}>
                    <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>ย้อนกลับ</button>
                    {currentQuestionIndex < shuffledQuestions.length - 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={answers[currentQuestionIndex] === null}
                        >
                            ถัดไป
                        </button>
                    ) : (
                        <button onClick={handleSubmit} disabled={isTimeUp}>ส่งคำตอบ</button>
                    )}
                </div>

                {/* แสดงคะแนนเมื่อทำครบทุกข้อ */}
                {score !== null && (
                    <div className={styles.engQuizResult}>
                        <h3>คะแนนของคุณ: {score} / {shuffledQuestions.length}</h3>
                        {isTimeUp && <p>⏳ หมดเวลาแล้ว!</p>}

                        <div className={styles.engQuizWrong}>
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
                        <div className={styles.engQuizButtons}>
                            <button onClick={() => navigate("/englanguage", {
                                state: {
                                    lessonIndex,
                                    contentIndex,
                                    score
                                }
                            })}>
                                กลับหน้าวิชา
                            </button>
                            <button onClick={handleRestart}>เริ่มใหม่</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EngQuiz;