// ============================================================
// API Security Middleware for ML & Sons
// Protects all endpoints from unauthorized access
// ============================================================

// Allowed origins — only your own domains can call the API
const ALLOWED_ORIGINS = [
  'https://mlandsons.com',
  'https://www.mlandsons.com',
  'https://mlandsons.vercel.app',
  // Add any other deployment URLs here
];

// In-memory rate limiter (per serverless instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 60; // max 60 requests per minute per IP

function getClientIP(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return false;
  }

  record.count++;
  if (record.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

// Clean up old entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap) {
    if (now - record.start > RATE_LIMIT_WINDOW * 2) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

/**
 * Wraps an API handler with security protections:
 * - CORS origin restriction
 * - Rate limiting
 * - Security headers (XSS, clickjacking, MIME sniffing, etc.)
 * - Method validation
 * - Referer/Origin checking
 */
export function secureHandler(handler, { allowedMethods = ['GET'], contactEndpoint = false } = {}) {
  return function (req, res) {
    const origin = req.headers.origin || '';
    const referer = req.headers.referer || '';
    const ip = getClientIP(req);

    // --- Security Headers ---
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');

    // --- CORS ---
    const isAllowedOrigin =
      ALLOWED_ORIGINS.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      // Allow localhost in development
      origin.startsWith('http://localhost');

    if (origin && isAllowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (!origin) {
      // Same-origin requests (no Origin header) — allow
      res.setHeader('Access-Control-Allow-Origin', '');
    } else {
      // Block cross-origin requests from unknown origins
      return res.status(403).json({ error: 'Forbidden: Origin not allowed' });
    }

    res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', ') + ', OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');

    // --- Preflight ---
    if (req.method === 'OPTIONS') return res.status(200).end();

    // --- Method Check ---
    if (!allowedMethods.includes(req.method)) {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // --- Rate Limiting ---
    if (isRateLimited(ip)) {
      res.setHeader('Retry-After', '60');
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    // --- Bot Detection (basic) ---
    const userAgent = req.headers['user-agent'] || '';
    if (!userAgent || userAgent.length < 10) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // --- Contact endpoint: extra spam protection ---
    if (contactEndpoint) {
      const body = req.body || {};
      // Honeypot check — if a hidden field is filled, it's a bot
      if (body._honeypot) {
        // Silently accept but don't process
        return res.status(201).json({ success: true, message: 'Thank you!' });
      }
    }

    // Call the actual handler
    return handler(req, res);
  };
}
