import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    day: "",
    month: "",
    year: "",
    age: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPassword = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.day && formData.month && formData.year) {
      const birthDate = new Date(formData.year, formData.month - 1, formData.day);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();

      if (
        today <
        new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
      ) {
        calculatedAge--;
      }

      setFormData((prev) => ({ ...prev, age: calculatedAge }));
    }
  }, [formData.day, formData.month, formData.year]);

  const validateAndSubmit = async (event) => {
    event.preventDefault();

    if (formData.age > 12) {
      alert("❌ ขออภัย คุณต้องอายุไม่เกิน 12 ปีจึงจะสามารถสมัครสมาชิกได้");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("❌ รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    const userData = {
      Username: formData.username,
      Password: formData.password,
      FirstName: formData.firstName,
      Lastname: formData.lastName,
      Address: formData.address,
      date_of_birth: `${formData.year}-${formData.month
        .toString()
        .padStart(2, "0")}-${formData.day.toString().padStart(2, "0")}`,
      email: formData.email,
      phone_number: formData.phoneNumber,
    };

    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ สมัครสมาชิกสำเร็จ!");
        navigate("/login");
      } else {
        alert(`❌ สมัครสมาชิกไม่สำเร็จ: ${data.message || "เกิดข้อผิดพลาด"}`);
      }
    } catch (error) {
      alert(`❌ เกิดข้อผิดพลาด: ${error.message}`);
    }
  };

  return (
    <div className={styles.registerPageContainer}>
      <div className={styles.registerContainer}>
        <h1>สมัครสมาชิก</h1>
        <form onSubmit={validateAndSubmit}>
          <input
            className={styles.registerInput}
            type="text"
            name="username"
            placeholder="ชื่อผู้ใช้"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className={styles.registerInput}
            type="text"
            name="firstName"
            placeholder="ชื่อจริง"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            className={styles.registerInput}
            type="text"
            name="lastName"
            placeholder="นามสกุล"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            className={styles.registerInput}
            type="text"
            name="address"
            placeholder="ที่อยู่"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            className={styles.registerInput}
            type="email"
            name="email"
            placeholder="อีเมล"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className={styles.registerPasswordContainer}>
            <input
              className={styles.registerInput}
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="รหัสผ่าน"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className={styles.registerEyeIcon} onClick={togglePassword}>
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>

          <div className={styles.registerPasswordContainer}>
            <input
              className={styles.registerInput}
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="ยืนยันรหัสผ่าน"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className={styles.registerEyeIcon}
              onClick={toggleConfirmPassword}
            >
              {confirmPasswordVisible ? "🙈" : "👁️"}
            </span>
          </div>

          <div className={styles.registerDobContainer}>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              required
            >
              <option value="">วัน</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
            >
              <option value="">เดือน</option>
              {[
                "มกราคม",
                "กุมภาพันธ์",
                "มีนาคม",
                "เมษายน",
                "พฤษภาคม",
                "มิถุนายน",
                "กรกฎาคม",
                "สิงหาคม",
                "กันยายน",
                "ตุลาคม",
                "พฤศจิกายน",
                "ธันวาคม",
              ].map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">ปี</option>
              {[...Array(new Date().getFullYear() - 1899)].map((_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
          </div>

          <input
            className={styles.registerInput}
            type="text"
            name="age"
            value={formData.age}
            placeholder="อายุ"
            readOnly
          />

          <input
            className={styles.registerInput}
            type="text"
            name="phoneNumber"
            placeholder="เบอร์โทรศัพท์"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <button type="submit" className={styles.registerBtn}>
            สมัครสมาชิก
          </button>

          <p>
            มีบัญชีอยู่แล้ว? <a href="/login">เข้าสู่ระบบ</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
