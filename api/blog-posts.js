import { BLOG_POSTS } from './data.js';
import { secureHandler } from './_security.js';

function handler(req, res) {
  const sorted = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  return res.status(200).json(sorted);
}

export default secureHandler(handler, { allowedMethods: ['GET'] });
