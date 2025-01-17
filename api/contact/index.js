const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

module.exports = async (req, res) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    res.writeHead(405, corsHeaders);
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const { name, email, company, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      res.writeHead(400, corsHeaders);
      res.end(JSON.stringify({
        error: 'Missing required fields',
        details: { name: !name, email: !email, message: !message }
      }));
      return;
    }

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

    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify({ message: 'Emails sent successfully' }));
  } catch (error) {
    console.error('Error:', error);
    res.writeHead(500, corsHeaders);
    res.end(JSON.stringify({ error: error.message }));
  }
}; 