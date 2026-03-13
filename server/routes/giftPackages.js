const { Router } = require('express');
const pool = require('../db');
const router = Router();

const toGiftPackage = (r) => ({
  id: r.id,
  name: r.name,
  occasion: r.occasion,
  description: r.description,
  includes: r.includes || [],
  price: r.price,
  icon: r.icon,
  color: r.color,
  popular: r.popular,
});

// GET /api/gift-packages
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM gift_packages');
    res.json(rows.map(toGiftPackage));
  } catch (err) {
    console.error('GET /api/gift-packages error:', err);
    res.status(500).json({ error: 'Failed to fetch gift packages' });
  }
});

module.exports = router;
