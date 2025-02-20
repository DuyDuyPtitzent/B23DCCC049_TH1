import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GamePage.css";

const GamePage = () => {
  const [randomNumber] = useState(Math.floor(Math.random() * 100) + 1); // Random số từ 1-100
  const [guess, setGuess] = useState(""); // Số mà player dự đoán
  const [message, setMessage] = useState(""); // Thông báo
  const [attempts, setAttempts] = useState(10); // Số lượt đoán còn lại
  const navigate = useNavigate(); // Router

  const handleGuess = () => {
    if (attempts > 1) {
      if (parseInt(guess) > 100 || parseInt(guess) < 1) {
        // Trường hợp số không nằm trong khoảng từ 1-100
        setMessage("Số không đúng trong khoảng từ 1-100. Vui lòng nhập lại!");
      } else {
        if (parseInt(guess) < randomNumber) {
          // Trường hợp dự đoán số nhỏ hơn
          setMessage("Bạn đoán quá thấp!");
        } else if (parseInt(guess) > randomNumber) {
          // Trường hợp dự đoán số lớn hơn
          setMessage("Bạn đoán quá cao!");
        } else {
          setMessage("🎉 Chúc mừng! Bạn đã đoán đúng! 🎉");
          return;
        }

        setAttempts(attempts - 1); // Giảm số lượt đoán khi player đoán sai
      }
    } else {
      setMessage(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`); // Thông báo kết quả
    }
  };

  return (
    // Giao diện
    <div className="container2">
      <h1>Trò chơi đoán số</h1>
      <p>Nhập số bạn đoán (1-100):</p>
      <input
        type="number" // Kiểu số
        value={guess} // Giá trị
        onChange={(e) => setGuess(e.target.value)} //Hàm sử lý khi thay đổi giá trị
        className="input"
      />
      <button onClick={handleGuess} className="button">
        Đoán
      </button>
      <p>{message}</p>
      <p>Lượt còn lại: {attempts}</p>
      <button onClick={() => navigate("/")} className="homeButton">
        Quay lại
      </button>
    </div>
  );
};

export default GamePage;
