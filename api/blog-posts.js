import { BLOG_POSTS } from './data.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Return sorted by date descending
  const sorted = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  return res.status(200).json(sorted);
}
