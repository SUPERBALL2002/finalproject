import React, { useState , useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./ScienceQuiz.module.css";

const scienceQuestions = {
    0: { 
        0: [ 
            { question: "สิ่งมีชีวิตข้อใดจัดเป็นพืช", options: ["สุนัข", "เห็ด", "ต้นมะม่วง", "ปลา"], answer: "ต้นมะม่วง" },
            { question: "ข้อใดเป็นสิ่งมีชีวิต", options: ["หิน", "ต้นไม้", "น้ำ", "ดิน"], answer: "ต้นไม้" },
            { question: "ข้อใดสามารถสังเคราะห์แสงได้", options: ["สุนัข", "แมว", "ต้นถั่ว", "เห็ด"], answer: "ต้นถั่ว" },
            { question: "สัตว์มีกี่ประเภทหลัก", options: ["2", "3", "4", "5"], answer: "2" },
            { question: "สัตว์เลี้ยงลูกด้วยนมมีลักษณะเด่นคืออะไร", options: ["ออกไข่", "มีขนและให้นมลูก", "มีปีก", "มีเกล็ด"], answer: "มีขนและให้นมลูก" },
            { question: "ปลาใช้ส่วนใดในการหายใจ", options: ["ปอด", "เหงือก", "ผิวหนัง", "ปาก"], answer: "เหงือก" },
            { question: "พืชได้รับพลังงานจากสิ่งใด", options: ["ดิน", "น้ำ", "แสงแดด", "อากาศ"], answer: "แสงแดด" },
            { question: "สัตว์ประเภทใดออกลูกเป็นตัว", options: ["นก", "ปลา", "สุนัข", "จิ้งจก"], answer: "สุนัข" },
            { question: "ข้อใดคือสิ่งไม่มีชีวิต", options: ["ปลา", "ดอกไม้", "ก้อนหิน", "เห็ด"], answer: "ก้อนหิน" },
            { question: "ต้นไม้ต้องการสิ่งใดในการเติบโต", options: ["แสงแดด น้ำ และอากาศ", "ไฟฟ้า", "เสียง", "เหล็ก"], answer: "แสงแดด น้ำ และอากาศ" }
        ],
        1: [ 
            { question: "ผู้ผลิตในห่วงโซ่อาหารคืออะไร", options: ["สัตว์กินพืช", "สัตว์กินเนื้อ", "พืช", "เห็ด"], answer: "พืช" },
            { question: "ผู้ล่ามีบทบาทอะไรในห่วงโซ่อาหาร", options: ["กินพืช", "กินสัตว์อื่น", "สร้างอาหารเอง", "เปลี่ยนแปลงพลังงาน"], answer: "กินสัตว์อื่น" },
            { question: "ข้อใดเป็นผู้บริโภคระดับแรก", options: ["เสือ", "กวาง", "เหยี่ยว", "งู"], answer: "กวาง" },
            { question: "สิ่งมีชีวิตข้อใดเป็นผู้บริโภคระดับสุดท้าย", options: ["หญ้า", "แมว", "สุนัข", "เหยี่ยว"], answer: "เหยี่ยว" },
            { question: "อะไรเป็นตัวสลายอินทรียสารในระบบนิเวศ", options: ["เห็ดและแบคทีเรีย", "เสือ", "หมาป่า", "ต้นไม้"], answer: "เห็ดและแบคทีเรีย" },
            { question: "ข้อใดเป็นตัวอย่างของผู้บริโภค", options: ["ดอกไม้", "สุนัข", "ตะไคร่น้ำ", "หญ้า"], answer: "สุนัข" },
            { question: "พลังงานเข้าสู่ห่วงโซ่อาหารจากที่ใด", options: ["แสงแดด", "น้ำ", "ดิน", "ลม"], answer: "แสงแดด" },
            { question: "ผู้บริโภคระดับแรกกินอะไรเป็นอาหาร", options: ["สัตว์กินเนื้อ", "พืช", "แมลง", "เห็ด"], answer: "พืช" },
            { question: "เห็ดและแบคทีเรียมีบทบาทอะไรในระบบนิเวศ", options: ["สร้างพลังงาน", "สลายซากสิ่งมีชีวิต", "เป็นผู้ล่า", "เป็นผู้บริโภค"], answer: "สลายซากสิ่งมีชีวิต" },
            { question: "ข้อใดเป็นตัวอย่างของห่วงโซ่อาหาร", options: ["หญ้า → กระต่าย → หมาป่า", "ปลา → นก → ต้นไม้", "น้ำ → ดิน → อากาศ", "แมว → หมา → นก"], answer: "หญ้า → กระต่าย → หมาป่า" }
        ],
        2: [ 
            { question: "อูฐสามารถอยู่ในทะเลทรายได้เพราะอะไร", options: ["มีขนหนา", "กักเก็บน้ำในตัว", "มีกรงเล็บแหลม", "มีลำตัวเล็ก"], answer: "กักเก็บน้ำในตัว" },
            { question: "สัตว์ชนิดใดอพยพตามฤดูกาล", options: ["หมา", "ปลาแซลมอน", "แมว", "กระต่าย"], answer: "ปลาแซลมอน" },
            { question: "ต้นกระบองเพชรสามารถอยู่ในทะเลทรายได้เพราะอะไร", options: ["มีใบกว้าง", "มีรากตื้นและยาว", "มีดอกสีสด", "ไม่มีราก"], answer: "มีรากตื้นและยาว" },
            { question: "หมีขั้วโลกมีขนสีขาวเพื่ออะไร", options: ["ป้องกันอากาศร้อน", "ช่วยล่าเหยื่อ", "พรางตัวจากศัตรู", "ป้องกันโรค"], answer: "พรางตัวจากศัตรู" },
            { question: "ต้นไม้ผลัดใบในฤดูไหน", options: ["ฤดูหนาว", "ฤดูร้อน", "ฤดูฝน", "ฤดูใบไม้ผลิ"], answer: "ฤดูหนาว" },
            { question: "สัตว์ชนิดใดจำศีลในฤดูหนาว", options: ["หมี", "นก", "ปลาวาฬ", "ม้า"], answer: "หมี" },
            { question: "แมลงปอมีการปรับตัวอย่างไร", options: ["บินเร็ว", "ขุดโพรง", "มีขนหนา", "จำศีล"], answer: "บินเร็ว" },
            { question: "ต้นไม้อะไรมีรากลึกมากที่สุด", options: ["มะม่วง", "กระบองเพชร", "ไผ่", "กุหลาบ"], answer: "กระบองเพชร" },
            { question: "ทำไมสุนัขถึงหายใจเร็วในอากาศร้อน", options: ["ระบายความร้อน", "ช่วยเผาผลาญพลังงาน", "สื่อสาร", "ช่วยล่าเหยื่อ"], answer: "ระบายความร้อน" },
            { question: "สัตว์ชนิดใดมีหนามเพื่อป้องกันตัว", options: ["เม่น", "นกยูง", "แมว", "กระต่าย"], answer: "เม่น" }
        ]
    },
    1: {
        0: [
            { question: "น้ำมีสถานะกี่แบบข้อใดเป็นของแข็ง", options: ["น้ำ", "ไอน้ำ", "ก้อนหิน", "อากาศ"], answer: "ก้อนหิน" },
            { question: "ข้อใดเป็นของเหลว", options: ["ทราย", "น้ำมัน", "ควัน", "น้ำแข็ง"], answer: "น้ำมัน" },
            { question: "ก๊าซที่สำคัญต่อการหายใจคืออะไร", options: ["คาร์บอนไดออกไซด์", "ไนโตรเจน", "ออกซิเจน", "ไฮโดรเจน"], answer: "ออกซิเจน" },
            { question: "การเปลี่ยนน้ำแข็งเป็นน้ำเรียกว่าอะไร", options: ["การระเหย", "การหลอมเหลว", "การควบแน่น", "การแข็งตัว"], answer: "การหลอมเหลว" },
            { question: "กระบวนการใดเปลี่ยนน้ำเป็นไอในธรรมชาติ", options: ["การกลั่นตัว", "การแข็งตัว", "การระเหย", "การไหลเวียน"], answer: "การระเหย" },
            { question: "ฝนเกิดจากกระบวนการใด", options: ["การควบแน่น", "การระเหย", "การหลอมเหลว", "การกลั่นตัว"], answer: "การควบแน่น" },
            { question: "เมื่ออุณหภูมิลดต่ำกว่าจุดเยือกแข็ง น้ำจะกลายเป็นอะไร", options: ["ไอน้ำ", "ฝน", "หิมะหรือน้ำแข็ง", "หมอก"], answer: "หิมะหรือน้ำแข็ง" },
            { question: "ไอน้ำเปลี่ยนเป็นน้ำฝนเรียกว่ากระบวนการอะไร", options: ["การระเหย", "การแข็งตัว", "การควบแน่น", "การกลั่นตัว"], answer: "การควบแน่น" },
            { question: "เมฆเกิดจากกระบวนการใด", options: ["การควบแน่น", "การแข็งตัว", "การหลอมเหลว", "การกลั่นตัว"], answer: "การควบแน่น" },
            { question: "กระบวนการใดช่วยให้เกิดฝนตกในธรรมชาติ", options: ["การกลั่นตัว", "การควบแน่น", "การหลอมเหลว", "การระเหย"], answer: "การควบแน่น" }
        ],
        1: [
            { question: "แม่น้ำไหลลงที่ใดในที่สุด", options: ["ทะเล", "ภูเขา", "ป่า", "ทุ่งหญ้า"], answer: "ทะเล" },
            { question: "อะไรเป็นแหล่งน้ำจืดที่สำคัญ", options: ["มหาสมุทร", "ทะเลสาบ", "น้ำพุร้อน", "ทะเลทราย"], answer: "ทะเลสาบ" },
            { question: "กระบวนการใดทำให้เกิดน้ำใต้ดิน", options: ["การควบแน่น", "การซึมผ่าน", "การหลอมเหลว", "การแข็งตัว"], answer: "การซึมผ่าน" },
            { question: "ธารน้ำแข็งเกิดขึ้นที่ใด", options: ["ทะเลทราย", "ขั้วโลกและภูเขาสูง", "ชายฝั่ง", "ป่าฝน"], answer: "ขั้วโลกและภูเขาสูง" },
            { question: "อะไรเป็นแหล่งน้ำที่ใหญ่ที่สุดในโลก", options: ["แม่น้ำ", "ทะเลสาบ", "มหาสมุทร", "ธารน้ำแข็ง"], answer: "มหาสมุทร" },
            { question: "น้ำในทะเลมีรสอย่างไร", options: ["จืด", "เค็ม", "ขม", "เปรี้ยว"], answer: "เค็ม" },
            { question: "กระบวนการใดทำให้น้ำบริสุทธิ์", options: ["การตกตะกอน", "การกรอง", "การควบแน่น", "การกลั่นตัว"], answer: "การกรอง" },
            { question: "น้ำที่ใช้ในการเกษตรส่วนใหญ่มาจากที่ใด", options: ["ฝน", "น้ำใต้ดิน", "ทะเล", "ธารน้ำแข็ง"], answer: "ฝน" },
            { question: "อะไรเป็นสาเหตุหลักของมลพิษทางน้ำ", options: ["ใบไม้ร่วง", "ขยะและสารเคมี", "การตกปลา", "ฝน"], answer: "ขยะและสารเคมี" },
            { question: "การประหยัดน้ำสำคัญอย่างไร", options: ["ช่วยลดค่าใช้จ่าย", "ช่วยรักษาทรัพยากรน้ำ", "ช่วยป้องกันน้ำท่วม", "ทุกข้อถูกต้อง"], answer: "ทุกข้อถูกต้อง" }
        ],
        2: [
            { question: "สัตว์ชนิดใดอาศัยอยู่ในน้ำจืด", options: ["วาฬ", "ฉลาม", "ปลาดุก", "เต่าทะเล"], answer: "ปลาดุก" },
            { question: "สัตว์ชนิดใดที่สามารถอยู่ได้ทั้งบนบกและในน้ำ", options: ["ปลา", "กบ", "นก", "ม้า"], answer: "กบ" },
            { question: "ปะการังพบได้ที่ใด", options: ["น้ำจืด", "น้ำเค็ม", "บนบก", "ทะเลสาบ"], answer: "น้ำเค็ม" },
            { question: "พืชน้ำชนิดใดสามารถลอยน้ำได้", options: ["สาหร่าย", "บัว", "ต้นมะม่วง", "ไผ่"], answer: "บัว" },
            { question: "สัตว์ชนิดใดใช้เหงือกในการหายใจ", options: ["สุนัข", "ปลา", "กบ", "มนุษย์"], answer: "ปลา" },
            { question: "สัตว์น้ำชนิดใดสามารถหายใจด้วยปอด", options: ["ฉลาม", "เต่าทะเล", "ปลาหมึก", "ปลาดุก"], answer: "เต่าทะเล" },
            { question: "พืชชนิดใดพบได้ในน้ำเค็ม", options: ["โกงกาง", "ตะไคร้", "กะเพรา", "มะเขือเทศ"], answer: "โกงกาง" },
            { question: "สิ่งมีชีวิตใดสามารถอยู่ในน้ำลึกมาก", options: ["ปูเสฉวน", "แมงกะพรุน", "ปลาแองเกลอร์", "ม้าน้ำ"], answer: "ปลาแองเกลอร์" },
            { question: "อะไรเป็นแหล่งอาหารหลักของสัตว์น้ำขนาดเล็ก", options: ["แพลงก์ตอน", "หญ้า", "สาหร่าย", "ตะไคร่น้ำ"], answer: "แพลงก์ตอน" },
            { question: "สัตว์น้ำชนิดใดสามารถเปลี่ยนสีตัวเองได้", options: ["ปลาหมึก", "ปลาดุก", "ฉลาม", "เต่า"], answer: "ปลาหมึก" }
        ]
    },
    2: {
        0:[
            { question: "แสงแดดเป็นตัวอย่างของพลังงานประเภทใด", options: ["พลังงานไฟฟ้า","พลังงานกล","พลังงานความร้อน"," พลังงานแสง"], answer: " พลังงานแสง" },
            { question: "พลังงานที่ทำให้พัดลมหมุนได้คือพลังงานอะไร", options: ["พลังงานกล","พลังงานแสง","พลังงานไฟฟ้า","พลังงานเคมี"], answer: "พลังงานไฟฟ้า" },
            { question: "อาหารที่เรากินเข้าไปให้พลังงานประเภทใด", options: ["พลังงานแสง"," พลังงานไฟฟ้า","พลังงานเคมี","พลังงานความร้อน"], answer: "พลังงานเคมี" },
            { question: "ข้อใดเป็นตัวอย่างของพลังงานความร้อน", options: ["แสงจากหลอดไฟ","ไอน้ำที่ออกจากกาต้มน้ำ","เสียงจากวิทยุ","พัดลมหมุน"], answer: "ไอน้ำที่ออกจากกาต้มน้ำ" },
            { question: "ข้อใดเป็นพลังงานที่เกิดจากการเคลื่อนที่ของวัตถุ", options: ["พลังงานเสียง","พลังงานกล","พลังงานความร้อน","พลังงานเคมี"], answer: "พลังงานกล" },
            { question: "แบตเตอรี่เก็บพลังงานประเภทใด", options: ["พลังงานกล","พลังงานแสง","พลังงานเคมี","พลังงานความร้อน"], answer: "พลังงานเคมี" },
            { question: "ไฟฉายให้พลังงานประเภทใด", options: ["พลังงานเคมี","พลังงานแสง","พลังงานกล","พลังงานเสียง"], answer: "พลังงานแสง" },
            { question: "น้ำตกที่ไหลลงมาสามารถผลิตพลังงานประเภทใด", options: ["พลังงานกล","พลังงานเสียง","พลังงานเคมี","พลังงานไฟฟ้า"], answer: "พลังงานกล" },
            { question: "ข้อใดเป็นพลังงานที่ทำให้เสียงเกิดขึ้น", options: ["พลังงานกล","พลังงานเสียง","พลังงานเคมี","พลังงานแสง"], answer: "พลังงานเสียง" },
            { question: "การใช้แผงโซลาร์เซลล์เพื่อผลิตไฟฟ้า เป็นการเปลี่ยนพลังงานจากอะไร", options: ["พลังงานกล → พลังงานไฟฟ้า","พลังงานแสง → พลังงานไฟฟ้า","พลังงานเคมี → พลังงานกล","พลังงานความร้อน → พลังงานกล"], answer: "พลังงานแสง → พลังงานไฟฟ้า" }
        ],
        1:[
            { question: "หลอดไฟเปลี่ยนพลังงานไฟฟ้าเป็นพลังงานอะไร", options: ["พลังงานเสียง","พลังงานกล","พลังงานแสง","พลังงานเคมี"], answer: "พลังงานแสง" },
            { question: "รถยนต์เคลื่อนที่ได้เพราะพลังงานอะไรเปลี่ยนเป็นพลังงานกล", options: ["พลังงานเสียง","พลังงานแสง","พลังงานเคมี","พลังงานไฟฟ้า"], answer: "พลังงานเคมี" },
            { question: "ไม้ขีดไฟเปลี่ยนพลังงานเคมีเป็นพลังงานอะไร", options: ["พลังงานแสง","พลังงานความร้อน","พลังงานกล","พลังงานเสียง"], answer: "พลังงานความร้อน " },
            { question: "ลำโพงทำงานโดยเปลี่ยนพลังงานไฟฟ้าเป็นพลังงานอะไร", options: ["พลังงานเสียง","พลังงานกล","พลังงานแสง","พลังงานเคมี"], answer: "พลังงานเสียง" },
            { question: "พลังงานไฟฟ้าเปลี่ยนเป็นพลังงานกลในอุปกรณ์ใด", options: ["หลอดไฟ","วิทยุ","พัดลม","เตาไมโครเวฟ"], answer: "พัดลม" },
            { question: "ข้อใดเป็นตัวอย่างของพลังงานความร้อนเปลี่ยนเป็นพลังงานกล", options: ["รถยนต์ที่ใช้เครื่องยนต์","พัดลมไฟฟ้า","หลอดไฟ","วิทยุ"], answer: "รถยนต์ที่ใช้เครื่องยนต์" },
            { question: "พลังงานเสียงสามารถเปลี่ยนเป็นพลังงานไฟฟ้าได้ในอุปกรณ์ใด", options: ["ไมโครโฟน","วิทยุ","หลอดไฟ","กาต้มน้ำไฟฟ้า"], answer: "ไมโครโฟน" },
            { question: "เตาไมโครเวฟเปลี่ยนพลังงานไฟฟ้าเป็นพลังงานอะไร", options: ["พลังงานแสง","พลังงานกล","พลังงานความร้อน","พลังงานเสียง"], answer: "พลังงานความร้อน" },
            { question: "พลังงานศักย์เปลี่ยนเป็นพลังงานกลได้ในข้อใด", options: ["ลูกตุ้มแกว่งไปมา","แบตเตอรี่","หลอดไฟ","โทรศัพท์มือถือ"], answer: "ลูกตุ้มแกว่งไปมา" },
            { question: "หลอดไฟที่เปิดไว้นาน ๆ จะให้พลังงานอะไรเพิ่มขึ้นนอกจากแสง", options: ["พลังงานเคมี","พลังงานกล","พลังงานเสียง","พลังงานความร้อน"], answer: "พลังงานความร้อน" }
        ],
        2:[
            { question: "วิธีใดช่วยประหยัดพลังงานไฟฟ้า", options: ["เปิดไฟทิ้งไว้ตอนกลางวัน","ปิดไฟเมื่อไม่ใช้งาน","เปิดเครื่องใช้ไฟฟ้าทุกชนิดพร้อมกัน","ใช้ไฟฟ้าเกินกำลัง"], answer: "ปิดไฟเมื่อไม่ใช้งาน" },
            { question: "วิธีใดช่วยลดการใช้พลังงานเชื้อเพลิง", options: ["ขับรถคนเดียวตลอด","ใช้รถสาธารณะ","เติมน้ำมันบ่อย ๆ","เร่งเครื่องยนต์แรง ๆ"], answer: "ใช้รถสาธารณะ" },
            { question: "อุปกรณ์ใดช่วยประหยัดพลังงานในบ้าน", options: ["หลอดไฟ LED ","หลอดไส้","พัดลมเก่ามาก","เครื่องใช้ไฟฟ้าที่ไม่ได้มาตรฐาน"], answer: "หลอดไฟ LED " },
            { question: "วิธีใดช่วยลดปริมาณขยะและใช้พลังงานอย่างมีประสิทธิภาพ", options: ["แยกขยะ","ทิ้งขยะทุกอย่างรวมกัน","ใช้ของแล้วทิ้งเลย","ใช้ถุงพลาสติกมากขึ้น"], answer: "แยกขยะ" },
            { question: "การใช้จักรยานแทนการขับรถช่วยลดพลังงานประเภทใด", options: ["พลังงานแสง","พลังงานไฟฟ้า","พลังงานเชื้อเพลิง","พลังงานเสียง"], answer: "พลังงานเชื้อเพลิง" },
            { question: "พลังงานจากลมช่วยผลิตพลังงานประเภทใด", options: ["พลังงานกล","พลังงานความร้อน","พลังงานไฟฟ้า","พลังงานแสง"], answer: "พลังงานไฟฟ้า" },
            { question: "เครื่องใช้ไฟฟ้าใดควรปิดเมื่อไม่ใช้งาน", options: ["โทรทัศน์","นาฬิกา","แก้วน้ำ","จานข้าว"], answer: "โทรทัศน์" },
            { question: "ควรเลือกใช้เครื่องใช้ไฟฟ้าแบบใดเพื่อประหยัดพลังงาน", options: ["มีฉลากเบอร์ 5","เครื่องเก่ามาก","ใช้ไฟฟ้ามาก","ไม่มีฉลากประหยัดไฟ"], answer: "มีฉลากเบอร์ 5" },
            { question: "การใช้พลังงานน้ำช่วยลดการใช้พลังงานอะไร", options: ["พลังงานไฟฟ้า","พลังงานเชื้อเพลิง","พลังงานกล","พลังงานเสียง"], answer: "พลังงานเชื้อเพลิง" },
            { question: "วิธีใดช่วยประหยัดน้ำ", options: ["ปิดก๊อกน้ำให้สนิท","เปิดน้ำทิ้งไว้","ใช้น้ำไม่จำกัด","ไม่สนใจการใช้น้ำ"], answer: "ปิดก๊อกน้ำให้สนิท" }
        ]
    }
};

// ฟังก์ชันสำหรับสุ่มเรียงลำดับคำถามใหม่
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const ScienceQuiz = () => {
    const [searchParams] = useSearchParams();
    const lessonIndex = parseInt(searchParams.get("lesson"), 10);
    const contentIndex = parseInt(searchParams.get("content"), 10);

    // Hooks
    const [lessonFromDB, setLessonFromDB] = useState(null);
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

    // ตรวจสอบ param
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
        if (scienceQuestions[lessonIndex]?.[contentIndex]) {
            setShuffledQuestions(shuffleArray([...scienceQuestions[lessonIndex][contentIndex]]));
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

        const SubjectID = lessonIndex + 1;

        try {
                    await fetch('http://localhost:3001/api/exams/exam', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            SubjectID: 2,
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
        const allScores = JSON.parse(localStorage.getItem("SciScores")) || {};
        const userScores = allScores[user.UserID] || {};
        const key = `${lessonIndex}-${contentIndex}`;
        userScores[key] = newScore;
        allScores[user.UserID] = userScores;
        localStorage.setItem("SciScores", JSON.stringify(allScores));
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
        
        const shuffled = shuffleArray([...scienceQuestions[lessonIndex][contentIndex]]);
        setShuffledQuestions(shuffled);
    };

    // ย้าย return JSX มาตรงนี้
    if (isInvalidParam) {
        return <p>ไม่พบข้อมูลบทเรียนหรือเนื้อหา</p>;
    }

    return (
        <div className={styles.sciQuizLayout}>
            <div className={styles.sciQuizBgRight}></div>
            <div className={styles.sciQuizMain}>
                <h2>แบบทดสอบวิชาวิทยาศาสตร์</h2>
                <p className={styles.sciQuizSubtitle}>บทที่ {lessonIndex + 1} - เนื้อหาส่วนที่ {contentIndex + 1}</p>
                <p className={styles.sciQuizTimer}>เวลาที่เหลือ: {timeLeft} วินาที</p>

                <div className={styles.sciQuizQuestion}>
                    <h3>{currentQuestionIndex + 1}. {shuffledQuestions[currentQuestionIndex]?.question || ""}</h3>
                    <div className={styles.sciQuizOptions}>
                        {shuffledQuestions[currentQuestionIndex]?.options?.map((option) => (
                            <button
                                key={option}
                                className={`${styles.sciQuizOption} ${answers[currentQuestionIndex] === option ? styles.selected : ""}`}
                                onClick={() => handleAnswerChange(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.sciQuizButtons}>
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

                {score !== null && (
                    <div className={styles.sciQuizResult}>
                        <h3>คะแนนของคุณ: {score} / {shuffledQuestions.length}</h3>
                        {isTimeUp && <p>⏳ หมดเวลาแล้ว!</p>}

                        <div className={styles.sciQuizWrong}>
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
                        <div className={styles.sciQuizButtons}>
                            <button onClick={() => navigate("/science", {
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

export default ScienceQuiz;
