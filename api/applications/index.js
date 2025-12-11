import { Resend } from 'resend';
import { escapeHtml } from '../utils/escapeHtml.js';
import { createRateLimiter } from '../utils/rateLimit.js';
import { validateApplicationInput, validateResumeFile } from '../utils/validateInput.js';
import { jobOpenings } from '../../src/data/jobsData.js';

// Validate Resend API key
if (!process.env.resend_api_key) {
  console.error('CRITICAL: Missing Resend API key');
  throw new Error('Missing Resend API key');
}

let resend;
try {
  resend = new Resend(process.env.resend_api_key);
  console.log('Resend client initialized successfully for applications');
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

// Get allowed job titles from jobsData
const getAllowedJobTitles = () => {
  return jobOpenings
    .filter(job => job.isActive)
    .map(job => job.title);
};

// Security logging helper
const logSecurityEvent = (req, event, details) => {
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                   req.headers['x-real-ip'] || 
                   'unknown';
  console.warn('[SECURITY]', {
    event,
    clientIP,
    timestamp: new Date().toISOString(),
    ...details
  });
};

export default async function handler(req, res) {
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                   req.headers['x-real-ip'] || 
                   'unknown';

  console.log('Job Application Request:', {
    method: req.method,
    contentType: req.headers['content-type'],
    url: req.url,
    clientIP
  });

  // Enable CORS
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

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    logSecurityEvent(req, 'INVALID_METHOD', { method: req.method });
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate Content-Type header
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    logSecurityEvent(req, 'INVALID_CONTENT_TYPE', { contentType });
    return res.status(400).json({ error: 'Invalid request format' });
  }

  // Apply rate limiting (3 applications per hour per IP)
  const rateLimiter = createRateLimiter(3, 3600000);
  const rateLimitResult = rateLimiter(req, res);
  if (rateLimitResult === false) {
    logSecurityEvent(req, 'RATE_LIMIT_EXCEEDED', {});
    return;
  }

  try {
    // Parse JSON body
    const formData = req.body;

    if (!formData) {
      logSecurityEvent(req, 'MISSING_BODY', {});
      return res.status(400).json({ error: 'Invalid request' });
    }

    // Get allowed job titles for validation
    const allowedJobTitles = getAllowedJobTitles();

    // Validate application input
    const validation = validateApplicationInput(formData, allowedJobTitles);
    if (!validation.valid) {
      logSecurityEvent(req, 'VALIDATION_FAILED', { 
        errors: validation.errors,
        fields: Object.keys(validation.errors)
      });
      return res.status(400).json({ 
        error: 'Validation failed',
        errors: validation.errors
      });
    }

    const sanitizedData = validation.sanitized;

    // Validate resume file if present
    let sanitizedResume = null;
    if (formData.resume) {
      const resumeValidation = validateResumeFile(formData.resume);
      if (!resumeValidation.valid) {
        logSecurityEvent(req, 'FILE_VALIDATION_FAILED', { 
          errors: resumeValidation.errors
        });
        return res.status(400).json({ 
          error: 'Invalid file upload',
          errors: resumeValidation.errors
        });
      }
      sanitizedResume = resumeValidation.sanitized;
    }

    // Prepare email attachments array
    const attachments = [];

    // Handle resume attachment if present
    if (sanitizedResume && sanitizedResume.content) {
      attachments.push({
        content: sanitizedResume.content,
        filename: sanitizedResume.filename
      });
    }

    // Send notification email to admin with resume attached
    const adminEmail = await resend.emails.send({
      from: 'david@web.icebergdata.co',
      to: 'david@icebergdata.co',
      subject: `New Job Application: ${sanitizedData.jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(135deg, #0066cc, #0099ff); padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Job Application</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">${escapeHtml(sanitizedData.jobTitle)}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0066cc; margin-top: 0; font-size: 20px;">Applicant Information</h2>
            <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${escapeHtml(sanitizedData.fullName)}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> ${escapeHtml(sanitizedData.email)}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Phone:</strong> ${escapeHtml(sanitizedData.phone)}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Location:</strong> ${escapeHtml(sanitizedData.currentLocation || 'Not provided')}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Years of Experience:</strong> ${escapeHtml(sanitizedData.yearsExperience || 'Not provided')}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Available to Relocate:</strong> ${escapeHtml(sanitizedData.availableToRelocate || 'Not provided')}</p>
            ${sanitizedData.linkedin ? `<p style="margin: 10px 0;"><strong style="color: #555;">LinkedIn:</strong> <a href="${escapeHtml(sanitizedData.linkedin)}" rel="noopener noreferrer" style="color: #0066cc;">${escapeHtml(sanitizedData.linkedin)}</a></p>` : ''}
            ${sanitizedData.portfolio ? `<p style="margin: 10px 0;"><strong style="color: #555;">Portfolio:</strong> <a href="${escapeHtml(sanitizedData.portfolio)}" rel="noopener noreferrer" style="color: #0066cc;">${escapeHtml(sanitizedData.portfolio)}</a></p>` : ''}
          </div>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0066cc; margin-top: 0; font-size: 20px;">Cover Letter</h2>
            <p style="line-height: 1.6; white-space: pre-wrap;">${escapeHtml(sanitizedData.coverLetter)}</p>
          </div>

          ${attachments.length > 0 ? `
          <div style="background: #d4edda; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745; margin-bottom: 20px;">
            <p style="margin: 0; color: #155724;"><strong>✓ Resume attached to this email</strong></p>
          </div>
          ` : `
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin-bottom: 20px;">
            <p style="margin: 0; color: #856404;"><strong>Resume:</strong> No resume was uploaded with this application</p>
          </div>
          `}

          <p style="margin-top: 20px; color: #666; font-size: 14px;">Submitted: ${new Date(sanitizedData.submittedAt).toLocaleString()}</p>
          ${signature}
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined
    });

    console.log('Admin email sent:', adminEmail?.id);

    // Send confirmation email to applicant
    const userEmail = await resend.emails.send({
      from: 'david@web.icebergdata.co',
      to: sanitizedData.email,
      subject: `Application Received: ${sanitizedData.jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(135deg, #0066cc, #0099ff); padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Application Received!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin-top: 0; font-size: 16px;">Dear ${escapeHtml(sanitizedData.fullName)},</p>
            <p style="line-height: 1.6;">Thank you for applying for the <strong>${escapeHtml(sanitizedData.jobTitle)}</strong> position at Iceberg Data. We have received your application and will review it carefully.</p>
            <p style="line-height: 1.6;">Our hiring team will be in touch within 2-3 business days if your profile matches our requirements. We appreciate your interest in joining our team!</p>
          </div>

          <div style="background: #e7f3ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0066cc; margin-top: 0;">What Happens Next?</h3>
            <ol style="line-height: 1.8; padding-left: 20px;">
              <li>Our team will review your application</li>
              <li>If selected, you'll receive an email to schedule an initial interview</li>
              <li>Successful candidates will proceed through our selection process</li>
            </ol>
          </div>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px;">
            <h3 style="color: #0066cc; margin-top: 0;">Your Application Summary</h3>
            <p style="margin: 5px 0;"><strong>Position:</strong> ${escapeHtml(sanitizedData.jobTitle)}</p>
            <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date(sanitizedData.submittedAt).toLocaleString()}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${escapeHtml(sanitizedData.email)}</p>
          </div>

          ${signature}
        </div>
      `
    });

    console.log('User confirmation email sent:', userEmail?.id);
    console.log('Application submitted successfully:', {
      clientIP,
      jobTitle: sanitizedData.jobTitle,
      email: sanitizedData.email
    });

    return res.status(200).json({
      message: 'Application submitted successfully',
      adminEmailId: adminEmail?.id,
      userEmailId: userEmail?.id
    });
  } catch (error) {
    logSecurityEvent(req, 'APPLICATION_ERROR', {
      errorName: error.name,
      errorMessage: error.message
    });
    
    console.error('Error processing application:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      clientIP
    });

    return res.status(500).json({
      error: 'Failed to submit application. Please try again later.'
    });
  }
}
