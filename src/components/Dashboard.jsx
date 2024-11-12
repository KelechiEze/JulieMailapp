import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const handleCardClick = (path) => {
    setLoading(true); // Show spinner
    setTimeout(() => {
      setLoading(false); // Hide spinner
      navigate(path); // Navigate to the selected path
    }, 2000); // 2-second delay
  };

  return (
    <div className="dashboard">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="dashboard-header">
            <div className="welcome-section">
              <h2>🎉 Welcome to Your SMTP Dashboard</h2>
              <p>
                This dashboard provides an overview and quick links to manage email sending and application settings.
              </p>
              <button className="take-action-button" onClick={() => handleCardClick("/send")}>
                Go to Email Form
              </button>
            </div>
          </div>

          {/* Cards Section */}
          <div className="dashboard-cards">
            <div className="dashboard-card" onClick={() => handleCardClick("/send")}>
              <h3>📧 Send Emails</h3>
              <p>Access the email sending form to send bulk emails.</p>
            </div>
            <div className="dashboard-card" onClick={() => handleCardClick("/settings")}>
              <h3>⚙️ Settings</h3>
              <p>Manage application settings and email configurations.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
