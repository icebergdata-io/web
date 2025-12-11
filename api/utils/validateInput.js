import validator from 'validator';

/**
 * Validation limits
 */
const LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 5, max: 254 }, // RFC 5321
  company: { min: 0, max: 200 },
  phone: { min: 0, max: 50 },
  message: { min: 1, max: 5000 }
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

