const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Gmail App Password ашиглах
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Static файлуудыг serve хийх
app.use(express.static(path.join(__dirname, 'public')));

// Root руу redirect
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Email API
app.post('/send-email', async (req, res) => {
  const { recipient, subject, body } = req.body;
  try {
    await transporter.sendMail({
      from: `"Udval Page" <${process.env.GMAIL_USER}>`,
      to: recipient,
      subject,
      text: body
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
