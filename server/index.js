const express = require('express');
const cors = require('cors');

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const giftPackagesRouter = require('./routes/giftPackages');
const blogPostsRouter = require('./routes/blogPosts');
const platformStatsRouter = require('./routes/platformStats');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = 5000;

// Restrict CORS to allowed origins only
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://mlandsons.com',
  'https://www.mlandsons.com',
  'https://mlandsons.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (same-origin / dev proxy)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
}));

// Limit JSON body size to 10KB to prevent abuse
app.use(express.json({ limit: '10kb' }));

// Security headers for all responses
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/gift-packages', giftPackagesRouter);
app.use('/api/blog-posts', blogPostsRouter);
app.use('/api/platform-stats', platformStatsRouter);
app.use('/api/contact', contactsRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
