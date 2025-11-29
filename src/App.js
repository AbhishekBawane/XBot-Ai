import React, { useState } from "react";

import Navbar from "./components/Navbar";
import History from "./components/History";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="app">
      <Navbar
        onFeedbackClick={() => setShowFeedback(true)}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              showFeedback={showFeedback}
              setShowFeedback={setShowFeedback}
              sidebarOpen={sidebarOpen}
            />
          }
        />

        <Route path="/history" element={<History  sidebarOpen={sidebarOpen}/>} />
      </Routes>
    </div>
  );
}
