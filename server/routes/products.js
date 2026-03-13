const { Router } = require('express');
const pool = require('../db');
const router = Router();

const toProduct = (r) => ({
  id: r.id,
  name: r.name,
  category: r.category,
  denomination: r.denomination,
  year: r.year,
  serialNumber: r.serial_number,
  condition: r.condition,
  price: r.price,
  originalPrice: r.original_price,
  rarity: r.rarity,
  description: r.description,
  historicalInfo: r.historical_info,
  gradingDetails: r.grading_details,
  tags: r.tags || [],
  gradient: r.gradient,
  accentColor: r.accent_color,
  image: r.image,
  featured: r.featured,
  isCustom: r.is_custom,
  isSet: r.is_set,
});

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows.map(toProduct));
  } catch (err) {
    console.error('GET /api/products error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/featured
router.get('/featured', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE featured = true');
    res.json(rows.map(toProduct));
  } catch (err) {
    console.error('GET /api/products/featured error:', err);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(toProduct(rows[0]));
  } catch (err) {
    console.error('GET /api/products/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
