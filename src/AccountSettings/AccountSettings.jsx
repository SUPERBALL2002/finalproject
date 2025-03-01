import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountSettings.module.css"; // ✅ ใช้ CSS Module

const AccountSettings = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    birthdate: "",
    notifyEmail: false,
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      
      if (!validImageTypes.includes(file.type)) {
        alert("กรุณาอัปโหลดเฉพาะไฟล์รูปภาพ (JPG, PNG, GIF)");
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("บันทึกการเปลี่ยนแปลงสำเร็จ!");
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
          <input className={styles.accountSettingsInput} type="text" name="username" value={formData.username} onChange={handleChange} placeholder="กรอกชื่อใหม่" />

          <label className={styles.accountSettingsLabel}>📧 อีเมลใหม่</label>
          <input className={styles.accountSettingsInput} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" />

          <label className={styles.accountSettingsLabel}>📞 เบอร์โทรศัพท์</label>
          <input className={styles.accountSettingsInput} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="08X-XXX-XXXX" />

          <label className={styles.accountSettingsLabel}>🏡 ที่อยู่</label>
          <input className={styles.accountSettingsInput} type="text" name="address" value={formData.address} onChange={handleChange} placeholder="กรอกที่อยู่ของคุณ" />

          <label className={styles.accountSettingsLabel}>🔒 รหัสผ่านใหม่</label>
          <input className={styles.accountSettingsInput} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="กรอกรหัสผ่านใหม่" />

          <label className={styles.accountSettingsLabel}>🎂 วันเดือนปีเกิด</label>
          <input className={styles.accountSettingsInput} type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />

          <div className={styles.accountSettingsCheckboxContainer}>
            <input type="checkbox" name="notifyEmail" checked={formData.notifyEmail} onChange={handleChange} />
            <label>📩 รับการแจ้งเตือนผ่านอีเมล</label>
          </div>

          <button type="submit" className={styles.accountSettingsSaveButton}>💾 บันทึกการเปลี่ยนแปลง</button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
