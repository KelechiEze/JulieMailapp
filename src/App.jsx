import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SendEmailForm from "./components/SendEmailForm";
import SentEmails from "./components/SentEmails";
import Settings from "./components/Settings";
import Dashboard from "./components/Dashboard";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Sidebar will remain constant */}
        <Sidebar />
        <div className="main-content">
          {/* Define Routes for different pages */}
          <Routes>
            {/* Main Dashboard route */}
            <Route path="/" element={<Dashboard />} />
            {/* Route to send email form */}
            <Route path="/send" element={<SendEmailForm />} />
            {/* Route to view sent emails */}
            <Route path="/sent" element={<SentEmails />} />
            {/* Settings route */}
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
