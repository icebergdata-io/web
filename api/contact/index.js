const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(request, response) {
  // Add CORS headers
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log request body for debugging
    console.log('Request body:', request.body);

    const { name, email, company, phone, message } = request.body;

    // Validate required fields
    if (!name || !email || !message) {
      return response.status(400).json({ 
        error: 'Missing required fields',
        details: { name: !name, email: !email, message: !message }
      });
    }

    // Log Resend API key presence (not the actual key)
    console.log('Resend API key present:', !!process.env.RESEND_API_KEY);

    try {
      // Send notification email to admin
      const adminEmail = await resend.emails.send({
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

      console.log('Admin email sent:', adminEmail);

      // Send confirmation email to user
      const userEmail = await resend.emails.send({
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

      console.log('User email sent:', userEmail);

      return response.status(200).json({ 
        message: 'Emails sent successfully',
        adminEmail,
        userEmail
      });
    } catch (emailError) {
      console.error('Resend API error:', emailError);
      return response.status(500).json({ 
        error: 'Failed to send email',
        details: emailError.message
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return response.status(500).json({ 
      error: 'Server error',
      details: error.message
    });
  }
} 