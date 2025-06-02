import React, { useState , useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./ThaiLanguageQuiz.module.css";

const thaiQuestions = {
    0: {
        0: [
            { question: "ตัวอักษรใดเป็นพยัญชนะต้น?", options: ["อา", "ก", "เ", "ใ"], answer: "ก" },
            { question: "สระเสียงสั้นคือข้อใด?", options: ["อี", "เอ", "อิ", "โอ"], answer: "อิ" },
            { question: "วรรณยุกต์มีกี่รูป?", options: ["2", "3", "4", "5"], answer: "5" },
            { question: "เสียงวรรณยุกต์ 'ไม้จัตวา' มีเสียงอย่างไร?", options: ["สูง", "ต่ำ", "กลาง", "ตก"], answer: "สูง" },
            { question: "ข้อใดเป็นพยัญชนะท้าย?", options: ["ข", "ง", "ฉ", "ฌ"], answer: "ง" },
            { question: "สระ 'อำ' เป็นสระประเภทใด?", options: ["สระประสม", "สระเดี่ยว", "สระเกิน", "สระลดรูป"], answer: "สระประสม" },
            { question: "คำที่ใช้วรรณยุกต์ 'โท' คือข้อใด?", options: ["บ้าน", "ต้นไม้", "น้ำ", "ข้าว"], answer: "ข้าว" },
            { question: "คำว่า 'กระต่าย' มีพยัญชนะต้นกี่ตัว?", options: ["1", "2", "3", "4"], answer: "2" },
            { question: "คำว่า 'ข้าวโพด' มีสระกี่ตัว?", options: ["1", "2", "3", "4"], answer: "2" },
            { question: "คำว่า 'แมว' มีตัวสะกดหรือไม่?", options: ["มี", "ไม่มี"], answer: "มี" }
        ],
        1: [
            { question: "คำว่า 'พระอาทิตย์' มีความหมายว่าอะไร?", options: ["ดวงจันทร์", "ดวงอาทิตย์", "ดวงดาว", "ฝน"], answer: "ดวงอาทิตย์" },
            { question: "ข้อใดเป็นคำกริยา?", options: ["วิ่ง", "ดินสอ", "กระดาษ", "น้ำ"], answer: "วิ่ง" },
            { question: "คำว่า 'คุณแม่' หมายถึงอะไร?", options: ["ผู้ให้กำเนิด", "คุณครู", "เพื่อน", "ตำรวจ"], answer: "ผู้ให้กำเนิด" },
            { question: "คำว่า 'ขยัน' ตรงข้ามกับคำว่าอะไร?", options: ["ตั้งใจ", "เกียจคร้าน", "อดทน", "รักเรียน"], answer: "เกียจคร้าน" },
            { question: "คำว่า 'ทะเล' มีความหมายตรงข้ามกับคำว่าอะไร?", options: ["แม่น้ำ", "ท้องฟ้า", "ภูเขา", "แผ่นดิน"], answer: "แผ่นดิน" },
            { question: "คำว่า 'ช่วยเหลือ' หมายถึงอะไร?", options: ["ให้กำลังใจ", "ช่วยทำให้ดีขึ้น", "ทำลาย", "หยุดนิ่ง"], answer: "ช่วยทำให้ดีขึ้น" },
            { question: "คำว่า 'ยิ้ม' เป็นการแสดงออกทางใด?", options: ["การพูด", "การกระทำ", "อารมณ์", "เสียง"], answer: "อารมณ์" },
            { question: "คำว่า 'ใหญ่' ตรงข้ามกับอะไร?", options: ["โต", "สูง", "เล็ก", "มาก"], answer: "เล็ก" },
            { question: "'ลูกช้าง' คือความหมายของข้อใด?", options: ["ลูกแมว", "ลูกเสือ", "ลูกช้าง", "ลูกกวาง"], answer: "ลูกช้าง" },
            { question: "คำว่า 'เสียงดัง' ตรงข้ามกับข้อใด?", options: ["เงียบ", "ร้องไห้", "เสียงก้อง", "คำพูด"], answer: "เงียบ" }
        ],
        2: [
            { question: "คำว่า 'เด็กๆ' เป็นคำประเภทใด?", options: ["คำนาม", "คำสรรพนาม", "คำกริยา", "คำวิเศษณ์"], answer: "คำนาม" },
            { question: "ข้อใดเป็นคำสรรพนาม?", options: ["ฉัน", "วิ่ง", "บ้าน", "โต๊ะ"], answer: "ฉัน" },
            { question: "ข้อใดเป็นคำกริยา?", options: ["นอน", "ห้อง", "ดินสอ", "หนังสือ"], answer: "นอน" },
            { question: "ประโยคใดเป็นประโยคคำถาม?", options: ["ฉันไปโรงเรียน", "เธอไปไหน", "ฉันชอบกินข้าว", "ฉันอ่านหนังสือ"], answer: "เธอไปไหน" },
            { question: "คำว่า 'เธอ' ใช้แทนใครได้บ้าง?", options: ["คนอื่น", "สิ่งของ", "สัตว์", "อาหาร"], answer: "คนอื่น" },
            { question: "'นักเรียนกำลังอ่านหนังสือ' ข้อใดคือคำกริยา?", options: ["นักเรียน", "กำลัง", "อ่าน", "หนังสือ"], answer: "อ่าน" },
            { question: "ประโยคใดเป็นประโยคปฏิเสธ?", options: ["ฉันไม่ชอบกินเผ็ด", "ฉันกินข้าวแล้ว", "ฉันอยากไปเที่ยว", "ฉันเรียนอยู่"], answer: "ฉันไม่ชอบกินเผ็ด" },
            { question: "คำว่า 'อร่อย' เป็นคำประเภทใด?", options: ["คำนาม", "คำกริยา", "คำวิเศษณ์", "คำสรรพนาม"], answer: "คำวิเศษณ์" },
            { question: "ข้อใดใช้คำว่า 'มาก' ถูกต้อง?", options: ["ฉันสูงมาก", "ฉันเขียนมาก", "ฉันดูมาก", "ฉันดีมาก"], answer: "ฉันสูงมาก" },
            { question: "'แมวของฉันสีขาว' คำว่า 'ของ' ทำหน้าที่อะไร?", options: ["คำเชื่อม", "คำนาม", "คำกริยา", "คำวิเศษณ์"], answer: "คำเชื่อม" }
        ]
    },
    1: { 
        0: [ 
            { question: "ข้อใดเป็นคำที่อ่านออกเสียงสั้น?", options: ["กิน", "กรีด", "ข้าว", "เขียน"], answer: "กิน" },
            { question: "พยัญชนะไทยมีกี่ตัว?", options: ["42", "44", "46", "48"], answer: "44" },
            { question: "คำว่า 'โรงเรียน' มีพยางค์กี่พยางค์?", options: ["1", "2", "3", "4"], answer: "2" },
            { question: "คำว่า 'ประเทศไทย' มีเสียงพยัญชนะต้นกี่ตัว?", options: ["3", "4", "5", "6"], answer: "3" },
            { question: "ตัวสะกดของคำว่า 'แมว' คืออะไร?", options: ["ม", "ว", "แ", "ไม่มีตัวสะกด"], answer: "ว" },
            { question: "ข้อใดเป็นคำที่ประสมด้วยสระเกิน?", options: ["กา", "เปีย", "วัว", "เมือง"], answer: "เปีย" },
            { question: "เสียงวรรณยุกต์ในคำว่า 'น้อย' คือเสียงใด?", options: ["เอก", "โท", "ตรี", "จัตวา"], answer: "โท" },
            { question: "ข้อใดเป็นพยางค์เปิด?", options: ["กิน", "นอน", "ไป", "เด็ก"], answer: "ไป" },
            { question: "ข้อใดเป็นพยางค์ปิด?", options: ["มา", "กิน", "ไป", "ดู"], answer: "กิน" },
            { question: "คำว่า 'โต๊ะ' มีเสียงพยัญชนะท้ายหรือไม่?", options: ["มี", "ไม่มี"], answer: "มี" }
        ],
        1: [ 
            { question: "ข้อใดเป็นการสะกดคำที่ถูกต้อง?", options: ["เรียน", "เรีนย", "เลียน", "เรียน"], answer: "เรียน" },
            { question: "ข้อใดเป็นคำที่มีตัวสะกดมาตราแม่กก?", options: ["ไม้", "รัก", "มือ", "เมือง"], answer: "รัก" },
            { question: "คำว่า 'หนังสือ' สะกดผิดหรือไม่?", options: ["ผิด", "ถูก"], answer: "ถูก" },
            { question: "คำว่า 'สะพาน' มีตัวสะกดอยู่ในมาตราใด?", options: ["แม่กด", "แม่กม", "แม่กบ", "แม่กน"], answer: "แม่กน" },
            { question: "ข้อใดเป็นประโยคสมบูรณ์?", options: ["ฉันไป", "แมวกระโดดสูง", "กินข้าว", "หนังสือดี"], answer: "แมวกระโดดสูง" },
            { question: "คำที่มีตัวการันต์ในตัวเลือกนี้คือคำใด?", options: ["กิน", "รัก", "พัฒนา", "พูด"], answer: "พัฒนา" },
            { question: "การใช้วรรณยุกต์ผิดส่งผลอย่างไร?", options: ["ไม่มีผล", "ทำให้คำมีความหมายเปลี่ยน", "ทำให้คำอ่านเร็วขึ้น", "ทำให้ประโยคสั้นลง"], answer: "ทำให้คำมีความหมายเปลี่ยน" },
            { question: "ข้อใดสะกดคำผิด?", options: ["กุหลาบ", "โรงแรม", "สระว่ายน้ำ", "ดินส่อ"], answer: "ดินส่อ" },
            { question: "ข้อใดใช้เครื่องหมายวรรคตอนถูกต้อง?", options: ["ไปไหนนะ?", "กินข้าว:แล้วไปนอน", "ฉันชอบ-กินข้าว", "บ้านของฉัน!"], answer: "ไปไหนนะ?" },
            { question: "การใช้คำราชาศัพท์ควรใช้กับบุคคลใด?", options: ["พระสงฆ์", "ครู", "เพื่อน", "คนทั่วไป"], answer: "พระสงฆ์" }
        ],
        2: [ 
            { question: "ข้อใดเป็นประโยคบอกเล่า?", options: ["เธอไปไหน?", "ฉันชอบอ่านหนังสือ", "อย่าเสียงดัง!", "ทำไมถึงมา"], answer: "ฉันชอบอ่านหนังสือ" },
            { question: "ข้อใดเป็นประโยคคำสั่ง?", options: ["ฉันหิวข้าว", "ไปทำการบ้าน", "คุณเป็นใคร", "แมวของฉัน"], answer: "ไปทำการบ้าน" },
            { question: "ข้อใดมีใจความชัดเจน?", options: ["ฉันไปไหนมา", "มีสิ่งหนึ่งที่ฉันรัก", "ฉันรักการอ่านเพราะให้ความรู้", "ไม่บอก"], answer: "ฉันรักการอ่านเพราะให้ความรู้" },
            { question: "ข้อใดไม่ใช่ส่วนสำคัญของประโยค?", options: ["ประธาน", "กริยา", "กรรม", "วรรคตอน"], answer: "วรรคตอน" },
            { question: "ข้อใดเป็นประโยคปฏิเสธ?", options: ["ฉันเรียนอยู่", "ฉันไม่ชอบกินเผ็ด", "ไปไหนมา", "อย่าทำอย่างนั้น"], answer: "ฉันไม่ชอบกินเผ็ด" },
            { question: "ข้อใดเป็นบทความแสดงความรู้สึก?", options: ["ข่าว", "นิทาน", "ไดอารี่", "สารคดี"], answer: "ไดอารี่" },
            { question: "ข้อใดเป็นประโยคคำถาม?", options: ["ฉันไปโรงเรียน", "เธอชื่ออะไร?", "ฝนตกหนัก", "แมวของฉัน"], answer: "เธอชื่ออะไร?" },
            { question: "ข้อใดเป็นการอ่านเชิงพินิจ?", options: ["อ่านจับใจความ", "อ่านข้ามๆ", "อ่านแบบเร่งรีบ", "อ่านแบบไม่สนใจ"], answer: "อ่านจับใจความ" },
            { question: "ข้อใดเป็นเรื่องแต่ง?", options: ["ข่าวสาร", "นิทาน", "สารคดี", "เอกสารราชการ"], answer: "นิทาน" },
            { question: "ข้อใดเป็นข้อความโน้มน้าว?", options: ["กินผักมีประโยชน์ต่อสุขภาพ", "ฉันอยากไปเที่ยว", "ฟังเพลงแล้วรู้สึกดี", "สุนัขชอบกินกระดูก"], answer: "กินผักมีประโยชน์ต่อสุขภาพ" }
        ]
    },
    2: {
        0: [ 
            { question: "วรรณคดีเรื่อง 'พระอภัยมณี' แต่งโดยใคร?", options: ["สุนทรภู่", "รัชกาลที่ 5", "ศรีปราชญ์", "รัชกาลที่ 2"], answer: "สุนทรภู่" },
            { question: "ตัวละครหลักในเรื่อง 'พระอภัยมณี' คือใคร?", options: ["สินสมุทร", "ศรีสุวรรณ", "พระอภัยมณี", "สุดสาคร"], answer: "พระอภัยมณี" },
            { question: "วรรณคดีเรื่องใดเป็นวรรณคดีมรดกของไทย?", options: ["ไตรภูมิพระร่วง", "ขุนช้างขุนแผน", "อิเหนา", "ทั้งหมดถูกต้อง"], answer: "ทั้งหมดถูกต้อง" },
            { question: "ตัวละครใดเป็นนางเอกในเรื่อง 'อิเหนา'?", options: ["บุษบา", "รจนา", "มณีเมขลา", "นางเงือก"], answer: "บุษบา" },
            { question: "เรื่อง 'ขุนช้างขุนแผน' เป็นวรรณคดีประเภทใด?", options: ["นิทาน", "นิราศ", "ลิลิต", "เสภา"], answer: "เสภา" },
            { question: "ใครเป็นผู้แต่ง 'รามเกียรติ์' ฉบับพระราชนิพนธ์?", options: ["รัชกาลที่ 1", "รัชกาลที่ 2", "รัชกาลที่ 3", "รัชกาลที่ 4"], answer: "รัชกาลที่ 1" },
            { question: "เรื่อง 'สามก๊ก' เป็นวรรณคดีที่แปลมาจากภาษาใด?", options: ["อังกฤษ", "จีน", "ฮินดี", "ญี่ปุ่น"], answer: "จีน" },
            { question: "เรื่อง 'นิทานเวตาล' เป็นวรรณคดีที่แปลมาจากภาษาใด?", options: ["สันสกฤต", "อังกฤษ", "เปอร์เซีย", "ฝรั่งเศส"], answer: "สันสกฤต" },
            { question: "ข้อใดเป็นวรรณคดีไทยที่เกี่ยวข้องกับธรรมะ?", options: ["ไตรภูมิพระร่วง", "ขุนช้างขุนแผน", "อิเหนา", "พระอภัยมณี"], answer: "ไตรภูมิพระร่วง" },
            { question: "ข้อใดเป็นวรรณคดีที่กล่าวถึงสงคราม?", options: ["อิเหนา", "สามก๊ก", "ลิลิตพระลอ", "ขุนช้างขุนแผน"], answer: "สามก๊ก" }
        ],
        1: [ 
            { question: "กลอนสุภาพมีจำนวนคำใน 1 วรรคกี่คำ?", options: ["5", "6", "7", "8"], answer: "7" },
            { question: "ข้อใดไม่ใช่ลักษณะของโคลงสี่สุภาพ?", options: ["มี 4 วรรค", "มีคำส่งสัมผัสท้ายวรรค", "มีคำบังคับเสียงเอกโท", "มี 8 คำในแต่ละวรรค"], answer: "มี 8 คำในแต่ละวรรค" },
            { question: "กลอนแปดมีสัมผัสท้ายวรรคอยู่ที่ตำแหน่งใด?", options: ["คำที่ 4 และ 8", "คำที่ 2 และ 6", "คำที่ 3 และ 7", "คำที่ 5 และ 9"], answer: "คำที่ 4 และ 8" },
            { question: "คำประพันธ์แบบใดที่ใช้ในการเล่าเรื่องราวหรือบรรยาย?", options: ["กาพย์", "กลอน", "โคลง", "ลิลิต"], answer: "ลิลิต" },
            { question: "กาพย์เห่เรือเป็นคำประพันธ์ประเภทใด?", options: ["กลอน", "กาพย์", "ลิลิต", "โคลง"], answer: "กาพย์" },
            { question: "ข้อใดเป็นกาพย์ยานี 11?", options: ["ฉันชอบเรียนภาษาไทย / สนุกดีทุกเวลา", "เขาเดินมาช้าๆ / อย่างสุขใจ"], answer: "ฉันชอบเรียนภาษาไทย / สนุกดีทุกเวลา" },
            { question: "กาพย์ฉบังมีจำนวนคำในแต่ละวรรคกี่คำ?", options: ["4-5-6", "6-7-8", "5-7-9", "7-8-10"], answer: "6-7-8" },
            { question: "ข้อใดเป็นลักษณะของโคลงสี่สุภาพ?", options: ["วรรคแรก 6 คำ", "สัมผัสระหว่างวรรค", "คำเอกโทบังคับ", "ทั้งหมดถูกต้อง"], answer: "ทั้งหมดถูกต้อง" },
            { question: "ร่ายสุภาพมีการส่งสัมผัสท้ายวรรคหรือไม่?", options: ["มี", "ไม่มี"], answer: "ไม่มี" },
            { question: "กาพย์ที่มี 11 พยางค์ต่อวรรคคือกาพย์ชนิดใด?", options: ["กาพย์ฉบัง", "กาพย์ยานี", "กาพย์เห่เรือ", "กาพย์ห่อโคลง"], answer: "กาพย์ยานี" }
        ],
        2: [ 
            { question: "ข้อใดเป็นสุภาษิตไทย?", options: ["น้ำขึ้นให้รีบตัก", "ตีงูให้หลังหัก", "ขี่ช้างจับตั๊กแตน", "ทั้งหมดถูกต้อง"], answer: "ทั้งหมดถูกต้อง" },
            { question: "สำนวน 'จับปลาสองมือ' หมายถึงอะไร?", options: ["ทำอะไรไม่สำเร็จสักอย่าง", "ขยันทำงาน", "ใจร้อน", "ใจดีเกินไป"], answer: "ทำอะไรไม่สำเร็จสักอย่าง" },
            { question: "สำนวน 'กำแพงมีหู ประตูมีตา' หมายถึงอะไร?", options: ["มีคนแอบฟัง", "ประตูเก่า", "กำแพงสูง", "บ้านแข็งแรง"], answer: "มีคนแอบฟัง" },
            { question: "สุภาษิต 'รักวัวให้ผูก รักลูกให้ตี' หมายถึงอะไร?", options: ["รักแล้วต้องดูแล", "ต้องอบรมสั่งสอน", "ต้องลงโทษ", "รักต้องให้"], answer: "ต้องอบรมสั่งสอน" },
            { question: "ข้อใดมีความหมายคล้าย 'ตีงูให้หลังหัก'?", options: ["ฆ่าคนให้ตาย", "ทำงานให้เสร็จ", "ทำให้ศัตรูหมดกำลัง", "ทำอะไรไม่รอบคอบ"], answer: "ทำให้ศัตรูหมดกำลัง" },
            { question: "สุภาษิต 'น้ำพึ่งเรือ เสือพึ่งป่า' สอนเรื่องอะไร?", options: ["การช่วยเหลือกัน", "ความโลภ", "ความขยัน", "ความฉลาด"], answer: "การช่วยเหลือกัน" },
            { question: "ข้อใดเป็นสุภาษิตเกี่ยวกับความสามัคคี?", options: ["รวมกันเราอยู่ แยกกันเราตาย", "หนีเสือปะจระเข้", "ขี่ช้างจับตั๊กแตน", "มือไม่พาย เอาเท้าราน้ำ"], answer: "รวมกันเราอยู่ แยกกันเราตาย" },
            { question: "สำนวน 'งูๆ ปลาๆ' หมายถึงอะไร?", options: ["รู้แบบครึ่งๆ กลางๆ", "เลี้ยงสัตว์", "ทำดี", "เป็นคนฉลาด"], answer: "รู้แบบครึ่งๆ กลางๆ" },
            { question: "สำนวน 'แมวไม่อยู่ หนูร่าเริง' หมายถึงอะไร?", options: ["ไม่มีคนคุม", "บ้านร้าง", "เลี้ยงสัตว์", "โชคดี"], answer: "ไม่มีคนคุม" },
            { question: "สุภาษิต 'ช้าๆ ได้พร้าเล่มงาม' สอนเรื่องอะไร?", options: ["ใจเย็นรอบคอบ", "ขยัน", "ไม่ต้องทำอะไร", "พูดน้อย"], answer: "ใจเย็นรอบคอบ" }
        ]
    }
};

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const ThaiQuiz = () => {
    const [searchParams] = useSearchParams();
    const lessonIndex = parseInt(searchParams.get("lesson"), 10);
    const contentIndex = parseInt(searchParams.get("content"), 10);
    const [lessonFromDB, setLessonFromDB] = useState(null);

    // Hooks
    const navigate = useNavigate();
    const user = { UserID: localStorage.getItem("userId") };
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [timerRunning, setTimerRunning] = useState(true);

    // ตรวจสอบ param หลังจากเรียก Hook แล้ว
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
        if (thaiQuestions[lessonIndex]?.[contentIndex]) {
            setShuffledQuestions(shuffleArray([...thaiQuestions[lessonIndex][contentIndex]]));
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

        const SubjectID = lessonIndex + 1;

        try {
                await fetch('http://localhost:3001/api/exams/exam', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        SubjectID: 3,
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
        const allScores = JSON.parse(localStorage.getItem("ThaiScores")) || {};
        const userScores = allScores[user.UserID] || {};
        const key = `${lessonIndex}-${contentIndex}`;
        userScores[key] = newScore;
        allScores[user.UserID] = userScores;
        localStorage.setItem("ThaiScores", JSON.stringify(allScores));
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
        
        const shuffled = shuffleArray([...thaiQuestions[lessonIndex][contentIndex]]);
        setShuffledQuestions(shuffled);
    };

    // ย้าย return JSX มาตรงนี้
    if (isInvalidParam) {
        return <p>ไม่พบข้อมูลบทเรียนหรือเนื้อหา</p>;
    }

    return (
        <div className={styles.thaiQuizLayout}>
            <div className={styles.thaiQuizMain}>
                <div className={styles.thaiQuizBgRight}></div>
                <h2>แบบทดสอบวิชาภาษาไทย</h2>
                <p className={styles.thaiQuizSubtitle}>บทที่ {lessonIndex + 1} - เนื้อหาส่วนที่ {contentIndex + 1}</p>
                <p className={styles.thaiQuizTimer}>เวลาที่เหลือ: {timeLeft} วินาที</p>

                {/* แสดงคำถามทีละข้อ */}
                <div className={styles.thaiQuizQuestion}>
                    <h3>{currentQuestionIndex + 1}. {shuffledQuestions[currentQuestionIndex]?.question || ""}</h3>
                    <div className={styles.thaiQuizOptions}>
                        {shuffledQuestions[currentQuestionIndex]?.options?.map((option) => (
                            <button
                                key={option}
                                className={`${styles.thaiQuizOption} ${answers[currentQuestionIndex] === option ? styles.selected : ""}`}
                                onClick={() => handleAnswerChange(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ปุ่มควบคุม */}
                <div className={styles.thaiQuizButtons}>
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
                    <div className={styles.thaiQuizResult}>
                        <h3>คะแนนของคุณ: {score} / {shuffledQuestions.length}</h3>
                        {isTimeUp && <p>⏳ หมดเวลาแล้ว!</p>}

                        <div className={styles.thaiQuizWrong}>
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
                        <div className={styles.thaiQuizButtons}>
                            <button onClick={() => navigate("/thailanguage", {
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

export default ThaiQuiz;