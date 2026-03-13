const { Router } = require('express');
const pool = require('../db');
const router = Router();

const toBlogPost = (r) => ({
  id: r.id,
  title: r.title,
  excerpt: r.excerpt,
  category: r.category,
  readTime: r.read_time,
  date: r.date,
  icon: r.icon,
  featured: r.featured,
  tags: r.tags || [],
});

// GET /api/blog-posts
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blog_posts ORDER BY date DESC');
    res.json(rows.map(toBlogPost));
  } catch (err) {
    console.error('GET /api/blog-posts error:', err);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

module.exports = router;
