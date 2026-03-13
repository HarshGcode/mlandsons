const { Router } = require('express');
const pool = require('../db');
const router = Router();

// GET /api/platform-stats
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM platform_stats ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error('GET /api/platform-stats error:', err);
    res.status(500).json({ error: 'Failed to fetch platform stats' });
  }
});

module.exports = router;
