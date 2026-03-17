import { CATEGORIES } from './data.js';
import { secureHandler } from './_security.js';

function handler(req, res) {
  return res.status(200).json(CATEGORIES);
}

export default secureHandler(handler, { allowedMethods: ['GET'] });
