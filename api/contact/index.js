const { Resend } = require('resend');

// Debug: Log that we're initializing
console.log('Initializing API handler');

// Debug: Check API key presence (not the actual key)
const apiKey = process.env.RESEND_API_KEY;
console.log('Resend API key present:', !!apiKey);
console.log('API key length:', apiKey ? apiKey.length : 0);

const resend = new Resend(apiKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

module.exports = async (req, res) => {
  // Debug: Log request method
  console.log('Request method:', req.method);

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
    // Debug: Log request body
    console.log('Request body:', req.body);

    const { name, email, company, phone, message } = req.body;

    // Debug: Log parsed data
    console.log('Parsed data:', { name, email, company, phone, messageLength: message?.length });

    // Validate required fields
    if (!name || !email || !message) {
      res.writeHead(400, corsHeaders);
      res.end(JSON.stringify({
        error: 'Missing required fields',
        details: { name: !name, email: !email, message: !message }
      }));
      return;
    }

    // Debug: Log before sending admin email
    console.log('Attempting to send admin email...');

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
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

    // Debug: Log admin email result
    console.log('Admin email result:', adminEmailResult);

    // Debug: Log before sending user email
    console.log('Attempting to send user email...');

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
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

    // Debug: Log user email result
    console.log('User email result:', userEmailResult);

    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify({ 
      message: 'Emails sent successfully',
      adminEmailId: adminEmailResult?.id,
      userEmailId: userEmailResult?.id
    }));
  } catch (error) {
    // Debug: Log detailed error
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    res.writeHead(500, corsHeaders);
    res.end(JSON.stringify({ 
      error: 'Failed to send email',
      details: error.message,
      code: error.code
    }));
  }
}; 