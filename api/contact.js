import { neon } from '@neondatabase/serverless';
import { secureHandler } from './_security.js';

// Basic input sanitizer — strips HTML tags and trims
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim().slice(0, 500);
}

// Validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone (Indian format or international)
function isValidPhone(phone) {
  return /^[\d\s\+\-()]{7,15}$/.test(phone);
}

async function handler(req, res) {
  try {
    const body = req.body || {};
    const name = sanitize(body.name);
    const phone = sanitize(body.phone);
    const email = sanitize(body.email);
    const state = sanitize(body.state);
    const city = sanitize(body.city);
    const address = sanitize(body.address);
    const inquiryType = sanitize(body.inquiryType);
    const itemType = sanitize(body.itemType);
    const details = sanitize(body.details);

    // Required field validation
    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Name is required (min 2 characters)' });
    }
    if (!phone || !isValidPhone(phone)) {
      return res.status(400).json({ error: 'Valid phone number is required' });
    }
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Connect to Neon (Vercel Postgres) and save to database
    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`
      INSERT INTO contacts (name, phone, email, state, city, address, inquiry_type, item_type, details)
      VALUES (${name}, ${phone}, ${email}, ${state}, ${city}, ${address}, ${inquiryType}, ${itemType}, ${details})
      RETURNING id
    `;

    return res.status(201).json({
      success: true,
      id: result[0].id,
      message: 'Thank you for reaching out! We will contact you shortly.'
    });
  } catch (err) {
    console.error('POST /api/contact error:', err);
    return res.status(500).json({ error: 'Failed to save contact' });
  }
}

export default secureHandler(handler, { allowedMethods: ['POST'], contactEndpoint: true });
