import validator from 'validator';

/**
 * Validation limits
 */
const LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 5, max: 254 }, // RFC 5321
  company: { min: 0, max: 200 },
  phone: { min: 0, max: 50 },
  message: { min: 1, max: 5000 },
  fullName: { min: 1, max: 100 },
  linkedin: { min: 0, max: 500 },
  portfolio: { min: 0, max: 500 },
  currentLocation: { min: 0, max: 200 },
  coverLetter: { min: 1, max: 5000 },
  jobTitle: { min: 1, max: 200 }
};

/**
 * Validates and sanitizes contact form input
 * @param {Object} data - Form data object
 * @returns {Object} - { valid: boolean, errors: Object, sanitized: Object }
 */
export function validateContactInput(data) {
  const errors = {};
  const sanitized = {};

  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Name is required';
  } else {
    const trimmedName = data.name.trim();
    if (trimmedName.length < LIMITS.name.min) {
      errors.name = `Name must be at least ${LIMITS.name.min} character`;
    } else if (trimmedName.length > LIMITS.name.max) {
      errors.name = `Name must not exceed ${LIMITS.name.max} characters`;
    } else {
      sanitized.name = trimmedName;
    }
  }

  // Validate email
  if (!data.email || typeof data.email !== 'string') {
    errors.email = 'Email is required';
  } else {
    const trimmedEmail = data.email.trim().toLowerCase();
    if (trimmedEmail.length < LIMITS.email.min) {
      errors.email = `Email must be at least ${LIMITS.email.min} characters`;
    } else if (trimmedEmail.length > LIMITS.email.max) {
      errors.email = `Email must not exceed ${LIMITS.email.max} characters`;
    } else if (!validator.isEmail(trimmedEmail)) {
      errors.email = 'Invalid email format';
    } else {
      sanitized.email = trimmedEmail;
    }
  }

  // Validate company (optional)
  if (data.company && typeof data.company === 'string') {
    const trimmedCompany = data.company.trim();
    if (trimmedCompany.length > LIMITS.company.max) {
      errors.company = `Company name must not exceed ${LIMITS.company.max} characters`;
    } else {
      sanitized.company = trimmedCompany;
    }
  } else {
    sanitized.company = '';
  }

  // Validate phone (optional)
  if (data.phone && typeof data.phone === 'string') {
    const trimmedPhone = data.phone.trim();
    if (trimmedPhone.length > LIMITS.phone.max) {
      errors.phone = `Phone number must not exceed ${LIMITS.phone.max} characters`;
    } else {
      sanitized.phone = trimmedPhone;
    }
  } else {
    sanitized.phone = '';
  }

  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    errors.message = 'Message is required';
  } else {
    const trimmedMessage = data.message.trim();
    if (trimmedMessage.length < LIMITS.message.min) {
      errors.message = `Message must be at least ${LIMITS.message.min} character`;
    } else if (trimmedMessage.length > LIMITS.message.max) {
      errors.message = `Message must not exceed ${LIMITS.message.max} characters`;
    } else {
      sanitized.message = trimmedMessage;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized
  };
}

/**
 * Validates email input (for pre-calendly form)
 * @param {string} email - Email address
 * @param {string} role - Optional role
 * @param {string} dataNeeds - Optional data needs
 * @returns {Object} - { valid: boolean, errors: Object, sanitized: Object }
 */
export function validatePreCalendlyInput(email, role, dataNeeds) {
  const errors = {};
  const sanitized = {};

  // Validate email
  if (!email || typeof email !== 'string') {
    errors.email = 'Email is required';
  } else {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail.length < LIMITS.email.min) {
      errors.email = `Email must be at least ${LIMITS.email.min} characters`;
    } else if (trimmedEmail.length > LIMITS.email.max) {
      errors.email = `Email must not exceed ${LIMITS.email.max} characters`;
    } else if (!validator.isEmail(trimmedEmail)) {
      errors.email = 'Invalid email format';
    } else {
      sanitized.email = trimmedEmail;
    }
  }

  // Validate role (optional)
  if (role && typeof role === 'string') {
    const trimmedRole = role.trim();
    if (trimmedRole.length > 200) {
      errors.role = 'Role must not exceed 200 characters';
    } else {
      sanitized.role = trimmedRole;
    }
  } else {
    sanitized.role = '';
  }

  // Validate dataNeeds (optional)
  if (dataNeeds && typeof dataNeeds === 'string') {
    const trimmedDataNeeds = dataNeeds.trim();
    if (trimmedDataNeeds.length > 1000) {
      errors.dataNeeds = 'Data needs must not exceed 1000 characters';
    } else {
      sanitized.dataNeeds = trimmedDataNeeds;
    }
  } else {
    sanitized.dataNeeds = '';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized
  };
}

/**
 * Validates and sanitizes job application input
 * @param {Object} data - Application form data object
 * @param {Array<string>} allowedJobTitles - Array of allowed job titles/IDs
 * @returns {Object} - { valid: boolean, errors: Object, sanitized: Object }
 */
export function validateApplicationInput(data, allowedJobTitles = []) {
  const errors = {};
  const sanitized = {};

  // Validate fullName
  if (!data.fullName || typeof data.fullName !== 'string') {
    errors.fullName = 'Full name is required';
  } else {
    const trimmedName = data.fullName.trim();
    if (trimmedName.length < LIMITS.fullName.min) {
      errors.fullName = `Full name must be at least ${LIMITS.fullName.min} character`;
    } else if (trimmedName.length > LIMITS.fullName.max) {
      errors.fullName = `Full name must not exceed ${LIMITS.fullName.max} characters`;
    } else if (/[\r\n]/.test(trimmedName)) {
      errors.fullName = 'Full name cannot contain line breaks';
    } else {
      sanitized.fullName = trimmedName;
    }
  }

  // Validate email (with newline check for email header injection prevention)
  if (!data.email || typeof data.email !== 'string') {
    errors.email = 'Email is required';
  } else {
    const trimmedEmail = data.email.trim().toLowerCase();
    if (trimmedEmail.length < LIMITS.email.min) {
      errors.email = `Email must be at least ${LIMITS.email.min} characters`;
    } else if (trimmedEmail.length > LIMITS.email.max) {
      errors.email = `Email must not exceed ${LIMITS.email.max} characters`;
    } else if (!validator.isEmail(trimmedEmail)) {
      errors.email = 'Invalid email format';
    } else if (/[\r\n]/.test(trimmedEmail)) {
      errors.email = 'Email cannot contain line breaks';
    } else {
      sanitized.email = trimmedEmail;
    }
  }

  // Validate phone
  if (!data.phone || typeof data.phone !== 'string') {
    errors.phone = 'Phone number is required';
  } else {
    const trimmedPhone = data.phone.trim();
    if (trimmedPhone.length < 1) {
      errors.phone = 'Phone number is required';
    } else if (trimmedPhone.length > LIMITS.phone.max) {
      errors.phone = `Phone number must not exceed ${LIMITS.phone.max} characters`;
    } else if (/[\r\n]/.test(trimmedPhone)) {
      errors.phone = 'Phone number cannot contain line breaks';
    } else {
      // Basic phone validation (allows international formats)
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(trimmedPhone)) {
        errors.phone = 'Invalid phone number format';
      } else {
        sanitized.phone = trimmedPhone;
      }
    }
  }

  // Validate LinkedIn URL (optional)
  if (data.linkedin && typeof data.linkedin === 'string') {
    const trimmedLinkedin = data.linkedin.trim();
    if (trimmedLinkedin.length > LIMITS.linkedin.max) {
      errors.linkedin = `LinkedIn URL must not exceed ${LIMITS.linkedin.max} characters`;
    } else if (trimmedLinkedin.length > 0) {
      if (!validator.isURL(trimmedLinkedin, { protocols: ['http', 'https'], require_protocol: true })) {
        errors.linkedin = 'LinkedIn URL must be a valid URL starting with http:// or https://';
      } else if (!trimmedLinkedin.toLowerCase().includes('linkedin.com')) {
        errors.linkedin = 'LinkedIn URL must be from linkedin.com domain';
      } else {
        sanitized.linkedin = trimmedLinkedin;
      }
    } else {
      sanitized.linkedin = '';
    }
  } else {
    sanitized.linkedin = '';
  }

  // Validate portfolio URL (optional)
  if (data.portfolio && typeof data.portfolio === 'string') {
    const trimmedPortfolio = data.portfolio.trim();
    if (trimmedPortfolio.length > LIMITS.portfolio.max) {
      errors.portfolio = `Portfolio URL must not exceed ${LIMITS.portfolio.max} characters`;
    } else if (trimmedPortfolio.length > 0) {
      if (!validator.isURL(trimmedPortfolio, { protocols: ['http', 'https'], require_protocol: true })) {
        errors.portfolio = 'Portfolio URL must be a valid URL starting with http:// or https://';
      } else {
        sanitized.portfolio = trimmedPortfolio;
      }
    } else {
      sanitized.portfolio = '';
    }
  } else {
    sanitized.portfolio = '';
  }

  // Validate yearsExperience (optional)
  if (data.yearsExperience && typeof data.yearsExperience === 'string') {
    const validOptions = ['0-2', '3-5', '6-10', '10+'];
    if (!validOptions.includes(data.yearsExperience)) {
      errors.yearsExperience = 'Invalid years of experience selection';
    } else {
      sanitized.yearsExperience = data.yearsExperience;
    }
  } else {
    sanitized.yearsExperience = '';
  }

  // Validate currentLocation (optional)
  if (data.currentLocation && typeof data.currentLocation === 'string') {
    const trimmedLocation = data.currentLocation.trim();
    if (trimmedLocation.length > LIMITS.currentLocation.max) {
      errors.currentLocation = `Location must not exceed ${LIMITS.currentLocation.max} characters`;
    } else if (/[\r\n]/.test(trimmedLocation)) {
      errors.currentLocation = 'Location cannot contain line breaks';
    } else {
      sanitized.currentLocation = trimmedLocation;
    }
  } else {
    sanitized.currentLocation = '';
  }

  // Validate availableToRelocate (optional)
  if (data.availableToRelocate && typeof data.availableToRelocate === 'string') {
    const validOptions = ['yes', 'no', 'maybe'];
    if (!validOptions.includes(data.availableToRelocate)) {
      errors.availableToRelocate = 'Invalid relocation availability selection';
    } else {
      sanitized.availableToRelocate = data.availableToRelocate;
    }
  } else {
    sanitized.availableToRelocate = '';
  }

  // Validate coverLetter
  if (!data.coverLetter || typeof data.coverLetter !== 'string') {
    errors.coverLetter = 'Cover letter is required';
  } else {
    const trimmedCoverLetter = data.coverLetter.trim();
    if (trimmedCoverLetter.length < LIMITS.coverLetter.min) {
      errors.coverLetter = `Cover letter must be at least ${LIMITS.coverLetter.min} character`;
    } else if (trimmedCoverLetter.length > LIMITS.coverLetter.max) {
      errors.coverLetter = `Cover letter must not exceed ${LIMITS.coverLetter.max} characters`;
    } else {
      sanitized.coverLetter = trimmedCoverLetter;
    }
  }

  // Validate jobTitle
  if (!data.jobTitle || typeof data.jobTitle !== 'string') {
    errors.jobTitle = 'Job title is required';
  } else {
    const trimmedJobTitle = data.jobTitle.trim();
    if (trimmedJobTitle.length < LIMITS.jobTitle.min) {
      errors.jobTitle = `Job title must be at least ${LIMITS.jobTitle.min} character`;
    } else if (trimmedJobTitle.length > LIMITS.jobTitle.max) {
      errors.jobTitle = `Job title must not exceed ${LIMITS.jobTitle.max} characters`;
    } else if (/[\r\n]/.test(trimmedJobTitle)) {
      errors.jobTitle = 'Job title cannot contain line breaks';
    } else if (allowedJobTitles.length > 0 && !allowedJobTitles.includes(trimmedJobTitle)) {
      errors.jobTitle = 'Invalid job title';
    } else {
      sanitized.jobTitle = trimmedJobTitle;
    }
  }

  // Validate submittedAt (optional but should be ISO string)
  if (data.submittedAt && typeof data.submittedAt === 'string') {
    const date = new Date(data.submittedAt);
    if (isNaN(date.getTime())) {
      errors.submittedAt = 'Invalid submission date';
    } else {
      sanitized.submittedAt = data.submittedAt;
    }
  } else {
    sanitized.submittedAt = new Date().toISOString();
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized
  };
}

/**
 * Validates file upload data
 * @param {Object} resume - Resume file object { content: base64, filename: string, type: string }
 * @returns {Object} - { valid: boolean, errors: Object, sanitized: Object }
 */
export function validateResumeFile(resume) {
  const errors = {};
  const sanitized = {};

  if (!resume || !resume.content) {
    errors.resume = 'Resume file is required';
    return { valid: false, errors, sanitized };
  }

  // Validate base64 content
  if (typeof resume.content !== 'string') {
    errors.resume = 'Invalid file content';
    return { valid: false, errors, sanitized };
  }

  // Check base64 format
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  if (!base64Regex.test(resume.content)) {
    errors.resume = 'Invalid file encoding';
    return { valid: false, errors, sanitized };
  }

  // Calculate file size (base64 is ~33% larger than binary)
  const fileSizeBytes = (resume.content.length * 3) / 4;
  const maxSizeBytes = 5 * 1024 * 1024; // 5MB

  if (fileSizeBytes > maxSizeBytes) {
    errors.resume = 'File size exceeds 5MB limit';
    return { valid: false, errors, sanitized };
  }

  // Validate MIME type
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (resume.type && !allowedMimeTypes.includes(resume.type)) {
    errors.resume = 'Invalid file type. Only PDF, DOC, and DOCX files are allowed';
    return { valid: false, errors, sanitized };
  }

  // Validate and sanitize filename
  if (!resume.filename || typeof resume.filename !== 'string') {
    errors.resume = 'Filename is required';
    return { valid: false, errors, sanitized };
  }

  // Sanitize filename: remove path separators, limit length, allow only safe characters
  let sanitizedFilename = resume.filename
    .replace(/[/\\]/g, '') // Remove path separators
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace unsafe characters
    .substring(0, 255); // Limit length

  if (sanitizedFilename.length === 0) {
    sanitizedFilename = 'resume.pdf';
  }

  // Verify file signature (magic bytes) by decoding base64
  try {
    const buffer = Buffer.from(resume.content, 'base64');
    const fileSignature = buffer.slice(0, 4);

    // PDF signature: %PDF
    const pdfSignature = Buffer.from([0x25, 0x50, 0x44, 0x46]);
    // DOC signature: D0 CF 11 E0 (MS Office)
    const docSignature = Buffer.from([0xD0, 0xCF, 0x11, 0xE0]);
    // DOCX signature: PK (ZIP format)
    const docxSignature = Buffer.from([0x50, 0x4B, 0x03, 0x04]);

    const isPDF = fileSignature.equals(pdfSignature);
    const isDOC = fileSignature.equals(docSignature);
    const isDOCX = fileSignature.slice(0, 2).equals(docxSignature.slice(0, 2));

    if (!isPDF && !isDOC && !isDOCX) {
      errors.resume = 'File content does not match declared file type';
      return { valid: false, errors, sanitized };
    }

    sanitized.content = resume.content;
    sanitized.filename = sanitizedFilename;
    sanitized.type = resume.type || 'application/pdf';
    sanitized.size = fileSizeBytes;

  } catch (error) {
    errors.resume = 'Failed to validate file content';
    return { valid: false, errors, sanitized };
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized
  };
}

