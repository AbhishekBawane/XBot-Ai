import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar({ sidebarOpen, setSidebarOpen, onFeedbackClick }) {

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setSidebarOpen]);

  return (
    <>

      {/* SIDEBAR */}
      {sidebarOpen && (
        <div
          style={{
            width: "220px",
            height: "100vh",
            background: "white",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1000,
            borderRight: "1px solid #ddd",
          }}
        >
          <div
            style={{
              background: "#D7C7F4",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={logo} style={{ width: "40px", marginRight: "10px" }} />

            <Link
              to="/"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "24px",
                color: "black",
              }}
            >
              New Chat
            </Link>
          </div>

          <h3
            style={{
              padding: "8px",
              background: "#D7C7F4",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            <Link
              to="/history"
              style={{ textDecoration: "none", color: "black" }}
            >
              Past Conversations
            </Link>
          </h3>

          <button
            onClick={onFeedbackClick}
            style={{
              background: "#D7C7F4",
              width: "100%",
              padding: "10px",
              border: "none",
              position: "absolute",
              bottom: 0,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Feedback
          </button>
        </div>
      )}

      {/* TOP NAVBAR */}
      <header
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          paddingLeft: sidebarOpen ? "240px" : "20px",
          background: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          position: "fixed",
          top: 0,
          width: "100%",
        
        }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            marginRight: "15px",
            cursor: "pointer",
            fontSize: "24px",
            background: "none",
            border: "none",
            display:sidebarOpen? "none": ""
          }}
        >
          ☰
        </button>

        <h1 style={{ color: "#9785BA", margin: 0 }}>Bot AI</h1>
      </header>
    </>
  );
}
