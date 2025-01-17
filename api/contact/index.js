import { Resend } from 'resend';

// Debug: Log environment check
console.log('Environment Check:', {
  hasResendKey: !!process.env.resend_api_key,
  keyLength: process.env.resend_api_key?.length || 0,
  nodeEnv: process.env.NODE_ENV,
  vercelEnv: process.env.VERCEL_ENV,
  allEnvKeys: Object.keys(process.env)
});

// Validate Resend API key before initializing
if (!process.env.resend_api_key) {
  console.error('CRITICAL: Missing Resend API key');
  throw new Error('Missing Resend API key');
}

let resend;
try {
  resend = new Resend(process.env.resend_api_key);
  console.log('Resend client initialized successfully');
} catch (error) {
  console.error('Failed to initialize Resend client:', error);
  throw error;
}

export default async function handler(req, res) {
  // Debug: Log request details
  console.log('Request Details:', {
    method: req.method,
    contentType: req.headers['content-type'],
    contentLength: req.headers['content-length'],
    url: req.url
  });

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.status(204).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body exists
    if (!req.body) {
      console.error('No request body received');
      return res.status(400).json({ error: 'No request body' });
    }

    // Debug: Log raw body
    console.log('Raw request body:', typeof req.body, req.body);

    const { name, email, company, phone, message } = req.body;

    // Debug: Log parsed data
    console.log('Parsed form data:', {
      hasName: !!name,
      hasEmail: !!email,
      nameLength: name?.length,
      emailLength: email?.length,
      messageLength: message?.length,
      bodyType: typeof req.body
    });

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Validation failed:', {
        missingName: !name,
        missingEmail: !email,
        missingMessage: !message
      });
      return res.status(400).json({
        error: 'Missing required fields',
        details: { name: !name, email: !email, message: !message }
      });
    }

    // Debug: Log before sending admin email
    console.log('Attempting to send admin email to:', 'david@icebergdata.co');

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
    }).catch(error => {
      console.error('Admin email failed:', error);
      throw error;
    });

    // Debug: Log admin email result
    console.log('Admin email result:', {
      success: !!adminEmail?.id,
      emailId: adminEmail?.id
    });

    // Debug: Log before sending user email
    console.log('Attempting to send confirmation email to:', email);

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
    }).catch(error => {
      console.error('User email failed:', error);
      throw error;
    });

    // Debug: Log user email result
    console.log('User email result:', {
      success: !!userEmail?.id,
      emailId: userEmail?.id
    });

    return res.status(200).json({ 
      message: 'Emails sent successfully',
      adminEmailId: adminEmail?.id,
      userEmailId: userEmail?.id
    });
  } catch (error) {
    // Debug: Log detailed error information
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      resendError: error?.response?.data,
      statusCode: error?.response?.status,
      isResendError: error instanceof Error && error.name === 'ResendError'
    });

    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message,
      code: error.code,
      type: error.name
    });
  }
} 