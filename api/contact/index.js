import { Resend } from 'resend';

export const config = {
  runtime: 'edge'
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request) {
  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const body = await request.json();
    console.log('Request body:', body);

    const { name, email, company, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        error: 'Missing required fields',
        details: { name: !name, email: !email, message: !message }
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

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

      return new Response(JSON.stringify({
        message: 'Emails sent successfully',
        adminEmail,
        userEmail
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (emailError) {
      console.error('Resend API error:', emailError);
      return new Response(JSON.stringify({
        error: 'Failed to send email',
        details: emailError.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({
      error: 'Server error',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
} 