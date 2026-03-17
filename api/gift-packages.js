import { GIFT_PACKAGES } from './data.js';
import { secureHandler } from './_security.js';

function handler(req, res) {
  return res.status(200).json(GIFT_PACKAGES);
}

export default secureHandler(handler, { allowedMethods: ['GET'] });
