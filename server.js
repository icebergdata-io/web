import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const port = process.env.PORT || 3000;

// Initialize Resend
const resend = new Resend(process.env.resend_api_key);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://www.icebergdata.co', 'https://icebergdata.co']
    : 'http://localhost:5173',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Contact form endpoint
app.post('/contact', async (req, res) => {
  const { name, email, company, phone, message } = req.body;

  try {
    // Send notification email to admin
    await resend.emails.send({
      from: 'david@web.icebergdata.co',
      to: 'david@icebergdata.co',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'david@web.icebergdata.co',
      to: email,
      subject: 'Thank you for contacting Iceberg Data',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your interest in Iceberg Data. We have received your message and will get back to you shortly.</p>
        <p>Here's a summary of your message:</p>
        <hr/>
        <p>${message}</p>
        <hr/>
        <p>Best regards,</p>
        <p>David Martin<br/>Iceberg Data</p>
      `
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 