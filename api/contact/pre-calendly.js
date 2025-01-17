import { Resend } from 'resend';

// Initialize Resend client
if (!process.env.resend_api_key) {
  console.error('CRITICAL: Missing Resend API key');
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
      <a href="https://calendly.com/icedata/dm" style="color: #0066cc; text-decoration: none; display: block; margin: 2px 0;">calendly.com/icedata/dm</a>
      <p style="margin: 2px 0; color: #666;">+1 (607) 358-0021</p>
    </div>
  </div>
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: 'david@web.icebergdata.co',
      to: 'david@icebergdata.co',
      subject: 'New Demo Request - Pre-Calendly Registration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(135deg, #0066cc, #0099ff); padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Demo Request</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0066cc; margin-top: 0; font-size: 20px;">Lead Details</h2>
            <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> ${email}</p>
            <p style="margin: 10px 0;">This lead is about to schedule a demo through Calendly.</p>
          </div>
          ${signature}
        </div>
      `
    });

    console.log('Admin email sent successfully:', adminEmail.id);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
} 