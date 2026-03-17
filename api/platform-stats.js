import { PLATFORM_STATS } from './data.js';
import { secureHandler } from './_security.js';

function handler(req, res) {
  return res.status(200).json(PLATFORM_STATS);
}

export default secureHandler(handler, { allowedMethods: ['GET'] });
