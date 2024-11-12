import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for requests from a specified origin (your frontend app)
app.use(cors({
  origin: 'http://localhost:14230', // Update this with your frontend's origin
  methods: ['GET', 'POST'],
}));

// Middleware to parse JSON data
app.use(express.json());

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send emails individually
const sendEmailsIndividually = async (recipients, subject, message) => {
  const failedEmails = [];
console.log(recipients);

  for (const recipient of recipients) {
    try {
      console.log(recipient);

      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: recipient,
        subject,
        text: message,
      });
      console.log(`Email sent successfully to ${recipient}`);
      
      // Optional delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error sending email to ${recipient}:`, error);
      failedEmails.push(recipient);
    }
  }

  if (failedEmails.length > 0) {
    console.error(
      `Failed to send email to the following addresses: ${failedEmails.join(", ")}`
    );
  } else {
    console.log("All emails sent successfully!");
  }
};

// Endpoint to trigger email sending
app.post('/send-emails', async (req, res) => {
  console.log("Received a request to /send-emails");
  
  const { recipients, subject, message } = req.body;

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).send('Recipients list is required and should be an array');
  }

  try {
    await sendEmailsIndividually(recipients, subject, message);
    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Error sending emails');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
