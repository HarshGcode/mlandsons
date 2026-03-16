const { Router } = require('express');
const pool = require('../db');
const router = Router();

// Sanitize input — strip HTML tags and limit length
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim().slice(0, 500);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\+\-()]{7,15}$/.test(phone);
}

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};

    // Honeypot — if filled, silently accept but don't save
    if (body._honeypot) {
      return res.status(201).json({ success: true, id: `contact-${Date.now()}` });
    }

    const name = sanitize(body.name);
    const phone = sanitize(body.phone);
    const email = sanitize(body.email);
    const state = sanitize(body.state);
    const city = sanitize(body.city);
    const address = sanitize(body.address);
    const inquiryType = sanitize(body.inquiryType);
    const itemType = sanitize(body.itemType);
    const details = sanitize(body.details);

    // Validate required fields
    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Name is required (min 2 characters)' });
    }
    if (!phone || !isValidPhone(phone)) {
      return res.status(400).json({ error: 'Valid phone number is required' });
    }
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const { rows } = await pool.query(
      `INSERT INTO contacts (name, phone, email, state, city, address, inquiry_type, item_type, details)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
      [name, phone, email, state, city, address, inquiryType, itemType, details]
    );
    res.status(201).json({ success: true, id: rows[0].id });
  } catch (err) {
    console.error('POST /api/contact error:', err);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

module.exports = router;
