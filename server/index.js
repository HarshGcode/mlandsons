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

app.use(cors());
app.use(express.json());

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
