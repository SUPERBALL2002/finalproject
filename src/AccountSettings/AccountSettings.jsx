import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import styles from "./AccountSettings.module.css";

const AccountSettings = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    birthdate: "",
    notifyEmail: false,
  });

  // ✅ ดึง userID จาก token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userID);
    }
  }, []);

  // ✅ โหลดข้อมูลผู้ใช้จาก backend
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:3001/api/users/${userId}`)
      .then((res) => {
        const { Username, email, phone_number, Address, date_of_birth } = res.data;
        setFormData((prev) => ({
          ...prev,
          username: Username,
          email,
          phone: phone_number,
          address: Address,
          birthdate: date_of_birth ? date_of_birth.split("T")[0] : "",
        }));
      })
      .catch((err) => {
        console.error("โหลดข้อมูลไม่สำเร็จ:", err);
      });
  }, [userId]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) return alert("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น");
      if (file.size > 10 * 1024 * 1024) return alert("ขนาดไฟล์ต้องไม่เกิน 10MB");

      const img = new Image();
      img.onload = () => {
        const reader = new FileReader();
        reader.onload = (e) => setProfileImage(e.target.result);
        reader.readAsDataURL(file);
      };
      img.onerror = () => alert("ไฟล์รูปภาพไม่ถูกต้อง");
      img.src = URL.createObjectURL(file);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "phone") {
      const sanitized = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "⚠️ กรุณากรอกชื่อผู้ใช้";
    if (!formData.email.includes("@")) newErrors.email = "⚠️ อีเมลไม่ถูกต้อง";
    if (formData.phone.length !== 10) newErrors.phone = "⚠️ เบอร์โทรต้องมี 10 หลัก";
    if (formData.birthdate && new Date(formData.birthdate) > new Date())
      newErrors.birthdate = "⚠️ วันเกิดต้องไม่เป็นอนาคต";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ ฟังก์ชันบันทึกข้อมูลและเชื่อม API
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const updatedData = {
        Username: formData.username,
        email: formData.email,
        phone_number: formData.phone,
        Address: formData.address,
        date_of_birth: formData.birthdate,
      };

      await axios.put(`http://localhost:3001/api/users/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setShowPopup(true);
    } catch (error) {
      console.error("อัปเดตข้อมูลไม่สำเร็จ:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    } finally {
      setLoading(false);
    }
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
          <input className={styles.accountSettingsInput} type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <span className={styles.errorText}>{errors.username}</span>}

          <label className={styles.accountSettingsLabel}>📧 อีเมลใหม่</label>
          <input className={styles.accountSettingsInput} type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}

          <label className={styles.accountSettingsLabel}>📞 เบอร์โทรศัพท์</label>
          <input className={styles.accountSettingsInput} type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}

          <label className={styles.accountSettingsLabel}>🏡 ที่อยู่</label>
          <input className={styles.accountSettingsInput} type="text" name="address" value={formData.address} onChange={handleChange} />

          <label className={styles.accountSettingsLabel}>🎂 วันเดือนปีเกิด</label>
          <input className={styles.accountSettingsInput} type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
          {errors.birthdate && <span className={styles.errorText}>{errors.birthdate}</span>}

          <button type="submit" className={styles.accountSettingsSaveButton} disabled={loading}>
            {loading ? "⏳ กำลังบันทึก..." : "💾 บันทึกการเปลี่ยนแปลง"}
          </button>
        </form>
      </div>

      {showPopup && (
        <div className={styles.popupBackground}>
          <div className={styles.popupContainer}>
            <p>✅ ข้อมูลได้รับการแก้ไขแล้ว</p>
            <button onClick={() => setShowPopup(false)} className={styles.popupButton}>
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
