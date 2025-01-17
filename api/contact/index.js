import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

export const config = {
  runtime: 'edge',
  regions: ['iad1']
};

export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const body = await request.json();
    const { name, email, company, phone, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields',
          details: { name: !name, email: !email, message: !message }
        }),
        { status: 400, headers: corsHeaders }
      );
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

    return new Response(
      JSON.stringify({ message: 'Emails sent successfully' }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
} 