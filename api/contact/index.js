import { Resend } from 'resend';
import { escapeHtml } from '../utils/escapeHtml.js';
import { createRateLimiter } from '../utils/rateLimit.js';
import { validateContactInput } from '../utils/validateInput.js';

if (!process.env.resend_api_key) {
  throw new Error('Missing Resend API key');
}

const resend = new Resend(process.env.resend_api_key);

const signature = `
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea;">
    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #333;">David Martin Riveros</p>
    <p style="margin: 2px 0; color: #666;">CEO, Iceberg Data LLC</p>
    <div style="margin-top: 15px;">
      <a href="https://www.icebergdata.co" style="color: #0066cc; text-decoration: none; display: block; margin: 2px 0;">www.icebergdata.co</a>
      <a href="https://linkedin.com/in/davidmartinriveros/" style="color: #0066cc; text-decoration: none; display: block; margin: 2px 0;">linkedin.com/in/davidmartinriveros/</a>
      <a href="https://calendar.app.google/31yW5kUHxW93HzEh6" style="color: #0066cc; text-decoration: none; display: block; margin: 2px 0;">Schedule a meeting</a>
      <p style="margin: 2px 0; color: #666;">+1 (607) 358-0021</p>
    </div>
  </div>
`;

export default async function handler(req, res) {
  const allowedOrigins = [
    'https://www.icebergdata.co',
    'https://icebergdata.co',
    'http://localhost:5173',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rateLimiter = createRateLimiter(5, 60000);
  const rateLimitResult = rateLimiter(req, res);
  if (rateLimitResult === false) {
    return;
  }

  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const validation = validateContactInput(req.body);
    if (!validation.valid) {
      const isSpam = validation.errors._spam !== undefined;
      return res.status(400).json({
        error: isSpam ? 'Invalid request' : 'Validation failed',
        errors: isSpam ? undefined : validation.errors
      });
    }

    const { name, email, company, phone, message } = validation.sanitized;

    // Only send admin notification — no auto-reply to unverified addresses
    await resend.emails.send({
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
            <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Company:</strong> ${escapeHtml(company || 'Not provided')}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
          </div>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px;">
            <h2 style="color: #0066cc; margin-top: 0; font-size: 20px;">Message</h2>
            <p style="line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          ${signature}
        </div>
      `
    });

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to send message. Please try again later.'
    });
  }
} 