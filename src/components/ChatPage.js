import React, { useState, useEffect, useRef } from "react";
import qaData from "../data/qa.json";
import logo from "../assets/logo.png";
import users from "../assets/user.png";

export default function ChatPage({ sidebarOpen }) {
  const quickQuestions = [
    "Hi, what is the weather",
    "Hi, what is my location",
    "Hi, what is the temperature",
    "Hi, how are you",
  ];

  const [showQuick, setShowQuick] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const autoSave = (question, answer) => {
    const saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
    saved.push({
      question,
      answer,
      time: new Date().toLocaleString(),
    });
    localStorage.setItem("chatHistory", JSON.stringify(saved));
  };

  const saveManual = () => {
    if (messages.length < 2) return;

    const lastUser = messages[messages.length - 2];
    const lastBot = messages[messages.length - 1];

    if (!lastUser || !lastBot || lastUser.sender !== "user") return;

    const saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
    saved.push({
      question: lastUser.text,
      answer: lastBot.text,
      time: new Date().toLocaleString(),
    });

    localStorage.setItem("chatHistory", JSON.stringify(saved));
    alert("Saved!");
  };

  const sendMessage = (text) => {
    const question = text || input;
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    const match = qaData.find(
      (q) => q.question.toLowerCase() === question.toLowerCase()
    );

    const botText = match ? match.response : "Sorry, Did not understand your query!";
    const botMessage = { sender: "bot", text: botText };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    autoSave(question, botText);
    setInput("");
    setShowQuick(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div
      style={{
        background: "#F4EEF9",
        minHeight: "100vh",
        marginLeft: sidebarOpen ? "220px" : "0px",
        paddingTop: "80px",
        transition: "margin-left 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      
      {/* QUICK QUESTIONS */}
      {showQuick && (
        <div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2 style={{ fontSize: "28px" }}>How Can I Help You Today?</h2>
            <img src={logo} style={{ width: "70px", marginTop: "10px" }} alt="logo" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              padding: "30px 80px",
            }}
          >
            {quickQuestions.map((q, i) => (
              <div
                key={i}
                onClick={() => sendMessage(q)}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px #ccc",
                }}
              >
                <b>{q}</b>
                <p style={{ color: "gray", fontSize: "14px" }}>
                  Get immediate AI generated response
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MESSAGES */}
      <div
        style={{
          padding: "20px",
          flex: 1,
          overflowY: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "90%",
                background: "#EDE7F6",
                padding: "16px",
                borderRadius: "12px",
                boxShadow: "0 2px 6px #d0c7e0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={m.sender === "user" ? users : logo}
                  alt="avatar"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <strong>{m.sender === "user" ? "You" : "Soul AI"}</strong>
              </div>

              <p style={{ margin: 0 }}>{m.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* INPUT BAR */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          position: "fixed",
          bottom: 20,
          left: sidebarOpen ? "240px" : "20px",
          right: 20,
          transition: "left 0.3s ease",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Bot AI..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#9785BA",
            color: "white",
            padding: "12px 18px",
            marginLeft: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Ask
        </button>

        <button
          type="button"
          onClick={saveManual}
          style={{
            background: "#9785BA",
            color: "white",
            padding: "12px 18px",
            marginLeft: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
