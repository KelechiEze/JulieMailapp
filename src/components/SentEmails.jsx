// SentEmails.js
import React from "react";
import "../styles/SentEmails.css";

const SentEmails = ({ sentEmails }) => {
  return (
    <div className="sent-emails">
      <h2>Sent Emails</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sentEmails.map((email) => (
            <tr key={email.id}>
              <td>{email.subject}</td>
              <td>{email.date}</td>
              <td>{email.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SentEmails;
