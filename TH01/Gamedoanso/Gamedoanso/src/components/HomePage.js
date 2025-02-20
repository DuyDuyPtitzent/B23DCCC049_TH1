import React from "react";
import { useNavigate } from "react-router-dom";
import welcomeImage from "../assets/Homepage.jpg"; // Đảm bảo đúng đường dẫn ảnh
import "../styles/HomePage.css"; // Import file CSS

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <img src={welcomeImage} alt="Trò chơi đoán số" className="image" />
      <button className="button" onClick={() => navigate("/game")}>
        Bắt đầu
      </button>
    </div>
  );
};

export default HomePage;
