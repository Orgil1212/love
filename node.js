const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // frontend localhost-оос хандалт хийхэд

// Gmail ашиглах бол App Password авах шаардлагатай
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'orgiloorgil16@gmail.com',       // өөрийн Gmail
    pass: 'coxx nsft xqxt dzzu'           // Gmail App Password
  }
});

app.post('/send-email', async (req, res) => {
  const { recipient, subject, body } = req.body;
  try {
    await transporter.sendMail({
      from: `"Udval Page" <orgiloorgil16@gmail.com>`,
      to: recipient,
      subject: subject,
      text: body
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
