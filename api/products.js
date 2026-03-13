import { PRODUCTS } from './data.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id, featured } = req.query;

  // GET /api/products?id=AN001
  if (id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.status(200).json(product);
  }

  // GET /api/products?featured=true
  if (featured === 'true') {
    return res.status(200).json(PRODUCTS.filter(p => p.featured));
  }

  // GET /api/products
  return res.status(200).json(PRODUCTS);
}
