import React, { useState } from "react";

const options = [ // Mảng chứa các lựa chọn của người chơi và máy
    { name: "Kéo", icon: "✂️" },
    { name: "Búa", icon: "🪨" },
    { name: "Bao", icon: "📜" }
]; 

const getRandomChoice = () => { // Hàm chọn ngẫu nhiên một lựa chọn từ mảng options
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex].name;
};

const getResult = (player, computer) => { // Hàm so sánh lựa chọn của người chơi và máy
    if (player === computer) return "Hòa";
    if (
        (player === "Kéo" && computer === "Bao") ||
        (player === "Búa" && computer === "Kéo") ||
        (player === "Bao" && computer === "Búa")
    ) {
        return "Thắng";
    }
    return "Thua";
};

function Game() { // Component Game
    const [history, setHistory] = useState([]); // Lịch sử các ván đấu

    const handlePlay = (playerChoice) => { // Khi người chơi lựa chọn
        const computerChoice = getRandomChoice(); // Máy chọn ngẫu nhiên
        const result = getResult(playerChoice, computerChoice); //So sánh

        const newRound = { // Lưu thông tin ván đấu mới
            playerChoice,
            computerChoice,
            result,
        };

        setHistory([newRound, ...history]); // Cập nhật lịch sử
    };

    return ( // Giao diện Game
        <div style={styles.container}>
            <h1>Oẳn Tù Tì</h1>
            <div style={styles.buttonContainer}>
                {options.map((option) => (
                    <button
                        key={option.name}
                        onClick={() => handlePlay(option.name)}
                        style={styles.iconButton}
                    >
                        {option.icon}
                    </button>
                ))}
            </div>

            <h2>Lịch sử các ván đấu:</h2>
            <ul style={styles.historyList}>
                {history.map((game, index) => ( 
                    <li key={index} style={styles.historyItem}>
                        Ván {history.length - index}: Bạn chọn <strong>{game.playerChoice}</strong>, Máy chọn <strong>{game.computerChoice}</strong> → Kết quả: <strong>{game.result}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = { // CSS
    container: {
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    buttonContainer: {
        marginBottom: "20px",
    },
    iconButton: {
        fontSize: "40px",
        margin: "0 10px",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        transition: "transform 0.2s ease",
    },
    historyList: {
        listStyle: "none",
        padding: 0,
    },
    historyItem: {
        marginBottom: "8px",
    },
};

export default Game;
