import { secureHandler } from './_security.js';

function handler(req, res) {
  return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
}

export default secureHandler(handler, { allowedMethods: ['GET'] });
