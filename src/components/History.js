import React, { useEffect, useState } from "react";

export default function History({ sidebarOpen }) {
  const [historyByDate, setHistoryByDate] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chatHistory")) || [];
    const grouped = data.reduce((acc, item) => {
      const date = new Date(item.time).toDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
    setHistoryByDate(grouped);
  }, []);

  const formatLabel = (date) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (date === today) return "Today";
    if (date === yesterday) return "Yesterday";
    return date;
  };

  return (
    <div
      style={{
        marginLeft: sidebarOpen ? "220px" : "0px",
        marginTop: "80px",
        transition: "margin-left 0.3s ease",
        padding: "20px",
        background: "#F4EEF9",
        minHeight: "100vh",
      }}
    >
      <h2>Past Conversations</h2>

      {Object.keys(historyByDate).length === 0 && (
        <p>No history found</p>
      )}

      {Object.entries(historyByDate).map(([date, chats]) => (
        <div key={date} style={{ marginTop: "20px" }}>
          <h3
            style={{
              background: "#D7C7F4",
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "6px",
            }}
          >
            {formatLabel(date)}
          </h3>

          {chats.map((c, i) => (
            <div
              key={i}
              style={{
                background: "white",
                padding: "12px",
                borderRadius: "8px",
                marginTop: "10px",
                boxShadow: "0 2px 6px #ccc",
              }}
            >
              <strong>Q: {c.question}</strong>
              <p>A: {c.answer}</p>
              <small>{c.time}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
