const { Router } = require('express');
const pool = require('../db');
const router = Router();

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, state, city, address, inquiryType, itemType, details } = req.body;
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
