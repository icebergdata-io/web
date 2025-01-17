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

const signature = `
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea;">
    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #333;">David Martin Riveros</p>
    <p style="margin: 2px 0; color: #666;">CEO, Iceberg Data LLC</p>
    <div style="margin-top: 15px;">
      <a href="https://www.icebergdata.co" style="color: #0066cc; text-decoration: none; display: block; margin: 2px 0;">www.icebergdata.co</a>
      <a href="https://linkedin.com/in/davidmartinriveros/" style="color: #0066cc; text-decoration: none; display: block; margin: 2px 0;">linkedin.com/in/davidmartinriveros/</a>
      <a href="https://calendly.com/icedata/dm" style="color: #0066cc; text-decoration: none; display: block; margin: 2px 0;">calendly.com/icedata/dm</a>
      <p style="margin: 2px 0; color: #666;">+1 (607) 358-0021</p>
    </div>
  </div>
`;

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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(135deg, #0066cc, #0099ff); padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0066cc; margin-top: 0; font-size: 20px;">Contact Details</h2>
            <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Company:</strong> ${company || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Phone:</strong> ${phone || 'Not provided'}</p>
          </div>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px;">
            <h2 style="color: #0066cc; margin-top: 0; font-size: 20px;">Message</h2>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          ${signature}
        </div>
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(135deg, #0066cc, #0099ff); padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin-top: 0; font-size: 16px;">Dear ${name},</p>
            <p style="line-height: 1.6;">Thank you for your interest in Iceberg Data. I have received your message and will personally review it shortly. You can expect to hear back from me within 1-2 business days.</p>
            <p style="line-height: 1.6;">In the meantime, feel free to:</p>
            <ul style="line-height: 1.6;">
              <li>Schedule a quick call using my <a href="https://calendly.com/icedata/dm" style="color: #0066cc; text-decoration: none;">Calendly link</a></li>
              <li>Check out our <a href="https://www.icebergdata.co" style="color: #0066cc; text-decoration: none;">website</a> for more information</li>
              <li>Connect with me on <a href="https://linkedin.com/in/davidmartinriveros/" style="color: #0066cc; text-decoration: none;">LinkedIn</a></li>
            </ul>
          </div>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px;">
            <h2 style="color: #0066cc; margin-top: 0; font-size: 20px;">Your Message</h2>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          ${signature}
        </div>
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