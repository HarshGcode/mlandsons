import { PRODUCTS } from './data.js';
import { secureHandler } from './_security.js';

function handler(req, res) {
  const { id, featured } = req.query;

  if (id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.status(200).json(product);
  }

  if (featured === 'true') {
    return res.status(200).json(PRODUCTS.filter(p => p.featured));
  }

  return res.status(200).json(PRODUCTS);
}

export default secureHandler(handler, { allowedMethods: ['GET'] });
