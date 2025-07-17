import { Resend } from 'resend';

// Debug: Log environment check
console.log('Environment Check:', {
  hasResendKey: !!process.env.resend_api_key,
  keyLength: process.env.resend_api_key?.length || 0,
  nodeEnv: process.env.NODE_ENV,
  vercelEnv: process.env.VERCEL_ENV,
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
    body: req.body,
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

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, role, dataNeeds } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: 'david@web.icebergdata.co',
      to: 'david@icebergdata.co',
      subject: `New Demo Request - ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(135deg, #0066cc, #0099ff); padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Demo Request</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0066cc; margin-top: 0; font-size: 20px;">Lead Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 150px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Role:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${role || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Data Needs:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${dataNeeds || 'Not provided'}</td>
              </tr>
            </table>
            <p style="margin: 20px 0 10px;">This lead is about to schedule a demo through Calendly.</p>
          </div>
          ${signature}
        </div>
      `
    });

    console.log('Admin email sent successfully:', adminEmail.id);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      resendError: error?.response?.data,
    });
    res.status(500).json({ 
      message: 'Failed to send email',
      error: error.message
    });
  }
} 