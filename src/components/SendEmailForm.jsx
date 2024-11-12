import React, { useState } from "react";
import axios from "axios";
import "../styles/SendEmailForm.css";

const SendEmailForm = ({ addSentEmail }) => {
  const [formData, setFormData] = useState({
    senderEmail: "",
    subject: "",
    message: "",
    recipients: "",
  });
  const [status, setStatus] = useState(""); // State to track success or error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipients = formData.recipients.split(",").map((email) => email.trim());

    // Frontend validation: check if any recipient email is valid
    if (recipients.some((email) => !email.includes("@"))) {
      setStatus("Please enter valid recipient emails.");
      return;
    }

    try {
      // Send email data to the backend
      const response = await axios.post("http://localhost:5000/sendEmails", {
        senderEmail: formData.senderEmail,
        subject: formData.subject,
        message: formData.message,
        recipients,
      });

      // Check if the response contains the expected success message
      if (response.status === 200) {
        setStatus(response.data.message); // Display success message from backend
        // After successful email send, update sent emails list
        addSentEmail(formData);
      } else {
        setStatus("An unexpected issue occurred. Please try again later.");
      }
    } catch (error) {
      // Display appropriate error message if request fails
      if (error.response) {
        setStatus(error.response.data.error); // Show detailed error from backend
      } else {
        setStatus("An error occurred while sending emails.");
      }
    }
  };

  return (
    <div className="send-email-form">
      <h2>Send Bulk Emails</h2>
      <form onSubmit={handleSubmit}>
        {/* <label>Sender Email:</label>
        <input
          type="email"
          name="senderEmail"
          value={formData.senderEmail}
          onChange={handleChange}
          required
        /> */}
        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <label>Recipients Emails (comma-separated):</label>
        <textarea style={{minHeight:'100vh'}}
          name="recipients"
          value={formData.recipients}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Emails</button>
      </form>
      {status && <p>{status}</p>} {/* Display status message */}
    </div>
  );
};

export default SendEmailForm;  