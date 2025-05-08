import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountSettings.module.css"; // ✅ ใช้ CSS Module

const AccountSettings = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false); // ✅ State สำหรับควบคุม Popup

  const [formData, setFormData] = useState(() => {
    // โหลดข้อมูลจาก Local Storage ถ้ามี
    const savedData = localStorage.getItem("accountSettings");
    return savedData
      ? JSON.parse(savedData)
      : {
          username: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          birthdate: "",
          notifyEmail: false,
        };
  });

  // บันทึกข้อมูลลง Local Storage ทุกครั้งที่ formData เปลี่ยน
  useEffect(() => {
    localStorage.setItem("accountSettings", JSON.stringify(formData));
  }, [formData]);

  // ✅ ฟังก์ชันอัปโหลดรูปภาพ (ตรวจสอบขนาดและประเภทไฟล์)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

      if (!validImageTypes.includes(file.type)) {
        alert("กรุณาอัปโหลดเฉพาะไฟล์รูปภาพ (JPG, PNG, GIF ,WEBP)");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert("ขนาดไฟล์ต้องไม่เกิน 10MB");
        return;
      }

      const img = new Image();
      img.onload = () => {
        const reader = new FileReader();
        reader.onload = (e) => setProfileImage(e.target.result);
        reader.readAsDataURL(file);
      };
      img.onerror = () => {
        alert("ไฟล์ที่อัปโหลดไม่ใช่รูปภาพที่ถูกต้อง");
      };
      img.src = URL.createObjectURL(file);
    }
  };

  // ✅ ฟังก์ชันจัดการการเปลี่ยนค่าฟอร์ม
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "phone") {
        const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
        setFormData((prev) => ({ ...prev, phone: sanitizedValue }));
        return;
    }

    setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
    }));
};


  // ✅ ตรวจสอบข้อมูลก่อนส่ง
  const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim()) newErrors.username = "⚠️ กรุณากรอกชื่อผู้ใช้";
    if (!formData.email.includes("@")) newErrors.email = "⚠️ อีเมลไม่ถูกต้อง";
    if (formData.phone.length !== 10) newErrors.phone = "⚠️ เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก";
    if (formData.password.length < 6) newErrors.password = "⚠️ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    if (formData.birthdate && new Date(formData.birthdate) > new Date())
      newErrors.birthdate = "⚠️ วันเกิดต้องไม่เป็นอนาคต";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ ฟังก์ชันบันทึกข้อมูล
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return; // ❌ ถ้าฟอร์มไม่ผ่าน Validation ไม่ต้องบันทึก

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPopup(true); // ✅ แสดง Popup หลังบันทึกสำเร็จ
      localStorage.removeItem("accountSettings"); // ล้าง Local Storage หลังบันทึก
    }, 2000);
  };

  const closePopup = () => {
    setShowPopup(false); // ✅ ปิด Popup
  };

  return (
    <div className={styles.accountSettingsWrapper}>
      <div className={styles.accountSettingsContainer}>
        <header className={styles.accountSettingsHeader}>
          <button className={styles.accountSettingsBackButton} onClick={() => navigate("/profile")}>
            🔙
          </button>
          <h1>แก้ไขข้อมูลส่วนตัว</h1>
        </header>

        <h2 className={styles.accountSettingsTitle}>การตั้งค่าผู้ใช้</h2>
        <div className={styles.accountSettingsProfileUpload}>
          <img src={profileImage} alt="รูปโปรไฟล์" />
          <input type="file" id="profileUpload" accept="image/*" onChange={handleImageUpload} />
          <label htmlFor="profileUpload" className={styles.accountSettingsUploadLabel}>
            📸 อัปโหลดรูปโปรไฟล์
          </label>
        </div>

        <form className={styles.accountSettingsForm} onSubmit={handleSubmit}>
          <label className={styles.accountSettingsLabel}>👤 ชื่อผู้ใช้ใหม่</label>
          <input
            className={styles.accountSettingsInput}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="กรอกชื่อใหม่"
            aria-label="ชื่อผู้ใช้ใหม่"
          />
          {errors.username && <span className={styles.errorText}>{errors.username}</span>}

          <label className={styles.accountSettingsLabel}>📧 อีเมลใหม่</label>
          <input className={styles.accountSettingsInput} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}

          <label className={styles.accountSettingsLabel}>📞 เบอร์โทรศัพท์</label>
          <input className={styles.accountSettingsInput} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="08X-XXX-XXXX" />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}

          <label className={styles.accountSettingsLabel}>🏡 ที่อยู่</label>
          <input className={styles.accountSettingsInput} type="text" name="address" value={formData.address} onChange={handleChange} placeholder="กรอกที่อยู่ของคุณ" />

          <label className={styles.accountSettingsLabel}>🔒 รหัสผ่านใหม่</label>
          <input className={styles.accountSettingsInput} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="กรอกรหัสผ่านใหม่" />
          {errors.password && <span className={styles.errorText}>{errors.password}</span>}

          <label className={styles.accountSettingsLabel}>🎂 วันเดือนปีเกิด</label>
          <input className={styles.accountSettingsInput} type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
          {errors.birthdate && <span className={styles.errorText}>{errors.birthdate}</span>}

          <div className={styles.accountSettingsCheckboxContainer}>
            <input type="checkbox" name="notifyEmail" checked={formData.notifyEmail} onChange={handleChange} />
            <label>📩 รับการแจ้งเตือนผ่านอีเมล</label>
          </div>

          <button type="submit" className={styles.accountSettingsSaveButton} disabled={loading}>
            {loading ? "⏳ กำลังบันทึก..." : "💾 บันทึกการเปลี่ยนแปลง"}
          </button>
        </form>
      </div>

      {/* ✅ Popup แจ้งเตือน */}
      {showPopup && (
        <div className={styles.popupBackground}>
          <div className={styles.popupContainer}>
            <p>✅ ข้อมูลได้รับการแก้ไขแล้ว</p>
            <button onClick={closePopup} className={styles.popupButton}>
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
