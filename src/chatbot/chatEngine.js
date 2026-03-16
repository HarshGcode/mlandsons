// ─── Chat Engine ────────────────────────────────────────────────────────────
// Intent detection, entity extraction, and response generation
// Data (products, categories, giftPackages) is passed in via processMessage()

import {
  CONDITIONS,
  searchBySerial, formatPrice, getRarityColor,
} from '../data/currencyData';
import { FAQ, FAREWELLS, FALLBACKS, getRandomFrom } from './chatKnowledge';

// ── Intent Patterns ─────────────────────────────────────────────────────────
const INTENTS = {
  GREETING:        /^(hi|hello|hey|namaste|good\s*(morning|evening|afternoon)|howdy)/i,
  FAREWELL:        /^(bye|goodbye|thanks|thank\s*you|see\s*you|ok\s*bye)/i,
  HELP:            /\b(help|what can you|how.*work|how.*use|guide|assist|menu)\b/i,
  PRICE_INQUIRY:   /\b(price|cost|how much|rate|value|worth|budget|under|below|above|cheap|expensive|afford|range)\b/i,
  RECOMMENDATION:  /\b(recommend|suggest|best|popular|featured|top|gift|birthday|anniversary|wedding|occasion)\b/i,
  SERIAL_SEARCH:   /\b(serial|radar|ladder|solid|palindrome|fancy|number\s*note)\b/i,
  YEAR_SEARCH:     /\b(1[7-9]\d{2}|20[0-2]\d)\b/,
  SEARCH_PRODUCT:  /\b(show|find|search|looking\s*for|do you have|any|available|list|get|want)\b/i,
  CATEGORY_BROWSE: /\b(categ|type|kind|which|what.*(?:have|sell|offer|available)|collection|all)\b/i,
  CONDITION_INFO:  /\b(condition|grade|grading|mint|uncirculated|fine\b|unc\b|vf\b|quality)\b/i,
  RARITY_INFO:     /\b(rarity|rare|common|uncommon|ultra|museum)\b/i,
  HISTORY:         /\b(histor|story|about\s+(?:this|the)|origin|background|detail|tell.*about|info|describe)\b/i,
  SHIPPING:        /\b(ship|deliver|dispatch|courier|track|free delivery)\b/i,
  AUTHENTICITY:    /\b(authenti|genuine|real|fake|certifi|verify|original|trust)\b/i,
  CONTACT:         /\b(contact|call|phone|email|whatsapp|reach|speak|talk|address|location|store|visit)\b/i,
  PAYMENT:         /\b(pay|payment|upi|card|emi|cod|cash|bank\s*transfer)\b/i,
  RETURNS:         /\b(return|refund|exchange|cancel)\b/i,
};

// ── Entity Extraction ───────────────────────────────────────────────────────
function extractBudget(text) {
  const t = text.toLowerCase().replace(/,/g, '');
  // "under 5000", "below ₹10000", "less than 5k", "within 20 thousand"
  const patterns = [
    /(?:under|below|less\s*than|within|budget\s*(?:of|is)?|upto|up\s*to)\s*(?:₹|rs\.?|inr\s*)?\s*(\d+)\s*(k|thousand|lakh)?/i,
    /(\d+)\s*(k|thousand|lakh)?\s*(?:₹|rs|rupee|budget)/i,
    /(?:₹|rs\.?)\s*(\d+)\s*(k|thousand|lakh)?/i,
  ];
  for (const p of patterns) {
    const m = t.match(p);
    if (m) {
      let num = parseInt(m[1]);
      const suffix = (m[2] || '').toLowerCase();
      if (suffix === 'k' || suffix === 'thousand') num *= 1000;
      if (suffix === 'lakh') num *= 100000;
      return num;
    }
  }
  // plain number fallback
  const numMatch = t.match(/\b(\d{4,})\b/);
  if (numMatch) return parseInt(numMatch[1]);
  return null;
}

function extractYear(text) {
  const m = text.match(/\b(1[7-9]\d{2}|20[0-2]\d)\b/);
  return m ? parseInt(m[1]) : null;
}

function extractCategory(text) {
  const t = text.toLowerCase();
  const map = {
    'coin': 'antique-coins', 'coins': 'antique-coins', 'british': 'antique-coins', 'victoria': 'antique-coins', 'george': 'antique-coins',
    'vintage': 'vintage-notes', 'old note': 'vintage-notes', 'old currency': 'vintage-notes', 'rbi': 'vintage-notes',
    'note': 'fancy-serial', 'notes': 'vintage-notes', 'currency note': 'vintage-notes',
    'serial': 'fancy-serial', 'fancy': 'fancy-serial', 'ladder': 'fancy-serial', 'radar': 'fancy-serial', 'solid': 'fancy-serial', '786': 'fancy-serial',
    'star': 'star-notes', 'star note': 'star-notes',
    'bundle': 'bundles', 'set': 'bundles', 'combo': 'bundles', 'collection set': 'bundles',
    'gift': 'gifting', 'birthday': 'gifting', 'anniversary': 'gifting', 'wedding': 'gifting', 'occasion': 'gifting',
  };
  for (const [keyword, catId] of Object.entries(map)) {
    if (t.includes(keyword)) return catId;
  }
  return null;
}

function extractCondition(text) {
  const t = text.toLowerCase();
  if (/\bmint\b/.test(t)) return 'MINT';
  if (/\bunc|uncirculated\b/.test(t)) return 'UNC';
  if (/\bvf|very\s*fine\b/.test(t)) return 'VF';
  if (/\bfine\b/.test(t) && !/\bvery\s*fine\b/.test(t)) return 'FINE';
  if (/\bgood\b/.test(t)) return 'GOOD';
  return null;
}

// ── Response Builders ───────────────────────────────────────────────────────
function msg(content, products = null, quickActions = null) {
  return {
    id: Date.now() + Math.random(),
    role: 'bot',
    content,
    products,
    quickActions,
    timestamp: new Date(),
  };
}

function buildProductResponse(products, prefix, suffix = null) {
  const limited = products.slice(0, 3);
  const text = products.length === 0
    ? "I couldn't find any items matching your query. Try browsing our categories or adjusting your search."
    : products.length === 1
      ? `${prefix} Here's what I found:`
      : `${prefix} I found ${products.length} item${products.length > 1 ? 's' : ''}. Here are the top results:`;

  const extra = suffix || (products.length > 3 ? `\n\n...and ${products.length - 3} more. Want to see all results?` : '');
  const actions = products.length === 0
    ? ['Browse Categories', 'Featured Items', 'Help']
    : ['Browse Categories', 'Gift Ideas', 'Contact Us'];

  return msg(text + extra, limited.length > 0 ? limited : null, actions);
}

// ── Main Process Function ───────────────────────────────────────────────────
export function processMessage(userText, conversationHistory = [], data = {}) {
  const PRODUCTS = data.products || [];
  const CATEGORIES = data.categories || [];
  const GIFT_PACKAGES = data.giftPackages || [];
  const text = userText.trim();
  const lower = text.toLowerCase();

  // ── Greeting
  if (INTENTS.GREETING.test(lower) && lower.length < 30) {
    return msg(
      "Hello! 🙏 How can I help you today? You can ask about our notes, coins, pricing, or gift recommendations.",
      null,
      ['Browse Categories', 'Featured Items', 'Gift Ideas', 'Search by Budget'],
    );
  }

  // ── Farewell
  if (INTENTS.FAREWELL.test(lower)) {
    return msg(getRandomFrom(FAREWELLS));
  }

  // ── Help
  if (INTENTS.HELP.test(lower) && !INTENTS.SEARCH_PRODUCT.test(lower)) {
    return msg(
      "Here's what I can help you with:\n\n" +
      "🔍 **Search** — \"show me rare coins\" or \"notes from 1947\"\n" +
      "💰 **Budget** — \"what can I get under 10000?\"\n" +
      "🎁 **Gifts** — \"birthday gift ideas\" or \"anniversary suggestions\"\n" +
      "📋 **Categories** — \"what categories do you have?\"\n" +
      "📊 **Grading** — \"what does mint condition mean?\"\n" +
      "🚚 **Info** — \"shipping\", \"returns\", \"payment methods\"\n" +
      "📞 **Contact** — \"how to reach you?\"\n\n" +
      "Just type naturally — I'll understand!",
      null,
      ['Browse Categories', 'Featured Items', 'Gift Ideas', 'Search by Budget'],
    );
  }

  // ── FAQ: Shipping
  if (INTENTS.SHIPPING.test(lower)) {
    return msg(FAQ.shipping.text, null, FAQ.shipping.quickActions);
  }

  // ── FAQ: Returns
  if (INTENTS.RETURNS.test(lower)) {
    return msg(FAQ.returns.text, null, FAQ.returns.quickActions);
  }

  // ── FAQ: Payment
  if (INTENTS.PAYMENT.test(lower)) {
    return msg(FAQ.payment.text, null, FAQ.payment.quickActions);
  }

  // ── FAQ: Authenticity
  if (INTENTS.AUTHENTICITY.test(lower) && !INTENTS.SEARCH_PRODUCT.test(lower)) {
    return msg(FAQ.authenticity.text, null, FAQ.authenticity.quickActions);
  }

  // ── FAQ: Contact / Location
  if (INTENTS.CONTACT.test(lower) && !INTENTS.SEARCH_PRODUCT.test(lower)) {
    return msg(FAQ.contact.text, null, FAQ.contact.quickActions);
  }

  // ── Condition / Grading Info
  if (INTENTS.CONDITION_INFO.test(lower) && /\b(what|explain|mean|about|how|tell|grade|grading)\b/i.test(lower)) {
    const condList = Object.entries(CONDITIONS)
      .map(([, v]) => `● ${v.label} — Score: ${v.score}/5`)
      .join('\n');
    return msg(
      `Here's our currency grading scale:\n\n${condList}\n\n` +
      "Mint and Uncirculated items are in perfect condition and command the highest premiums. " +
      "Want me to show items in a specific condition?",
      null,
      ['Show Mint Items', 'Show Rare Items', 'Browse Categories'],
    );
  }

  // ── Gift / Occasion Recommendations
  if (INTENTS.RECOMMENDATION.test(lower)) {
    const catId = extractCategory(lower);

    // Birthday specific
    if (/birthday|birth/i.test(lower)) {
      const birthdayProducts = PRODUCTS.filter(p => p.category === 'birthday-notes');
      const giftPkg = GIFT_PACKAGES.find(g => g.occasion === 'Birthday');
      let extra = '';
      if (giftPkg) extra = `\n\n🎁 We also have the "${giftPkg.name}" gift package for ${formatPrice(giftPkg.price)} — includes ${giftPkg.includes.slice(0, 3).join(', ')}.`;
      return buildProductResponse(
        birthdayProducts,
        "🎂 Great choice! Here are our birthday note options:" + extra,
      );
    }

    // Anniversary / Wedding
    if (/anniversary|wedding/i.test(lower)) {
      const annivProducts = PRODUCTS.filter(p => p.category === 'anniversary');
      const giftPkg = GIFT_PACKAGES.find(g => /Anniversary|Wedding/.test(g.occasion));
      let extra = '';
      if (giftPkg) extra = `\n\n🎁 Check out our "${giftPkg.name}" package for ${formatPrice(giftPkg.price)}.`;
      return buildProductResponse(
        annivProducts,
        "💍 Beautiful! Here are our anniversary & wedding options:" + extra,
      );
    }

    // General gift
    if (/gift/i.test(lower)) {
      const giftText = GIFT_PACKAGES.slice(0, 4).map(g =>
        `${g.icon} **${g.name}** — ${formatPrice(g.price)} (${g.occasion})`
      ).join('\n');
      return msg(
        `🎁 We have curated gift packages for every occasion:\n\n${giftText}\n\n` +
        "Each comes with a Certificate of Authenticity and premium packaging. Which occasion are you shopping for?",
        null,
        ['Birthday Gift', 'Anniversary Gift', 'Wedding Gift', 'Browse All'],
      );
    }

    // Featured / Popular / Best
    const featured = PRODUCTS.filter(p => p.featured);
    return buildProductResponse(featured, "⭐ Here are our most popular items:");
  }

  // ── Price / Budget Search
  if (INTENTS.PRICE_INQUIRY.test(lower)) {
    const budget = extractBudget(lower);
    const catId = extractCategory(lower);

    if (budget) {
      let filtered = PRODUCTS.filter(p => p.price <= budget);
      if (catId) filtered = filtered.filter(p => p.category === catId);
      filtered.sort((a, b) => b.price - a.price);

      if (filtered.length === 0) {
        const cheapest = PRODUCTS.reduce((a, b) => a.price < b.price ? a : b);
        return msg(
          `I couldn't find items under ${formatPrice(budget)}. Our most affordable item is "${cheapest.name}" at ${formatPrice(cheapest.price)}. Would you like to see it?`,
          [cheapest],
          ['Show All Items', 'Browse Categories'],
        );
      }

      const catLabel = catId ? CATEGORIES.find(c => c.id === catId)?.label || '' : '';
      return buildProductResponse(
        filtered,
        `💰 ${catLabel ? catLabel + ' items' : 'Items'} within your budget of ${formatPrice(budget)}:`,
      );
    }

    // No specific budget — show price range overview
    const prices = PRODUCTS.map(p => p.price).sort((a, b) => a - b);
    return msg(
      `Our collection ranges from ${formatPrice(prices[0])} to ${formatPrice(prices[prices.length - 1])}.\n\n` +
      "Tell me your budget and I'll find the best items for you! For example: \"under 10000\" or \"below 50000\".",
      null,
      ['Under ₹5,000', 'Under ₹15,000', 'Under ₹50,000', 'Show All'],
    );
  }

  // ── Condition-based filter (e.g. "show mint items")
  if (INTENTS.CONDITION_INFO.test(lower) && INTENTS.SEARCH_PRODUCT.test(lower)) {
    const cond = extractCondition(lower);
    if (cond) {
      const filtered = PRODUCTS.filter(p => p.condition === cond);
      const label = CONDITIONS[cond]?.label || cond;
      return buildProductResponse(filtered, `Here are our ${label} condition items:`);
    }
  }

  // ── Rarity search (e.g. "show ultra rare items")
  if (INTENTS.RARITY_INFO.test(lower) && INTENTS.SEARCH_PRODUCT.test(lower)) {
    const rarityMap = {
      'ultra rare': 'Ultra Rare',
      'museum': 'Museum Grade',
      'extremely rare': 'Extremely Rare',
      'very rare': 'Very Rare',
      'rare': 'Rare',
      'uncommon': 'Uncommon',
    };
    for (const [kw, rarity] of Object.entries(rarityMap)) {
      if (lower.includes(kw)) {
        const filtered = PRODUCTS.filter(p => p.rarity === rarity);
        return buildProductResponse(filtered, `Here are our ${rarity} items:`);
      }
    }
  }

  // ── Serial number search
  if (INTENTS.SERIAL_SEARCH.test(lower)) {
    const serialProducts = PRODUCTS.filter(p => p.category === 'unique-serial');
    return buildProductResponse(
      serialProducts,
      "🔢 Here are our fancy serial number notes:",
    );
  }

  // ── Year search
  const year = extractYear(text);
  if (year) {
    const yearProducts = PRODUCTS.filter(p => p.year === year);
    if (yearProducts.length > 0) {
      return buildProductResponse(yearProducts, `📅 Items from the year ${year}:`);
    }
    // Search nearby years
    const nearby = PRODUCTS.filter(p => Math.abs(p.year - year) <= 5).sort((a, b) => Math.abs(a.year - year) - Math.abs(b.year - year));
    if (nearby.length > 0) {
      return buildProductResponse(
        nearby,
        `I couldn't find exact matches for ${year}, but here are items from nearby years:`,
      );
    }
  }

  // ── Category browse
  if (INTENTS.CATEGORY_BROWSE.test(lower)) {
    const catId = extractCategory(lower);
    if (catId) {
      const filtered = PRODUCTS.filter(p => p.category === catId);
      const catLabel = CATEGORIES.find(c => c.id === catId)?.label || catId;
      return buildProductResponse(filtered, `📋 Here are our ${catLabel} items:`);
    }

    // Show all categories
    const catList = CATEGORIES.filter(c => c.id !== 'all').map(c => {
      const count = PRODUCTS.filter(p => p.category === c.id).length;
      return `${c.icon} **${c.label}** — ${count} item${count !== 1 ? 's' : ''}`;
    }).join('\n');

    return msg(
      `We have ${PRODUCTS.length} items across these categories:\n\n${catList}\n\nWhich category interests you?`,
      null,
      ['Antique Notes', 'Rare Coins', 'Birthday Notes', 'Fancy Serial Numbers'],
    );
  }

  // ── General product search
  if (INTENTS.SEARCH_PRODUCT.test(lower)) {
    const catId = extractCategory(lower);
    if (catId) {
      const filtered = PRODUCTS.filter(p => p.category === catId);
      const catLabel = CATEGORIES.find(c => c.id === catId)?.label || catId;
      return buildProductResponse(filtered, `Here are our ${catLabel}:`);
    }

    // Try text-based search
    const keywords = lower.replace(/\b(show|find|search|me|the|do|you|have|any|get|i|want|looking|for|some|a|an)\b/gi, '').trim();
    if (keywords.length > 1) {
      const results = searchBySerial(keywords, PRODUCTS);
      if (results.length > 0 && results.length < PRODUCTS.length) {
        return buildProductResponse(results, `🔍 Search results for "${keywords}":`);
      }
    }

    // Show featured as default
    const featured = PRODUCTS.filter(p => p.featured);
    return buildProductResponse(
      featured,
      "Here are our featured items. You can also search by category, year, or budget:",
    );
  }

  // ── Product detail / history (about a specific topic)
  if (INTENTS.HISTORY.test(lower)) {
    const catId = extractCategory(lower);
    if (catId) {
      const filtered = PRODUCTS.filter(p => p.category === catId);
      const catLabel = CATEGORIES.find(c => c.id === catId)?.label || '';
      return buildProductResponse(filtered, `📜 Here are our ${catLabel} items with rich historical background:`);
    }
  }

  // ── Quick action phrases (mapped to intents)
  const quickMap = {
    'browse categories': 'categories',
    'featured items': 'featured',
    'gift ideas': 'gifts',
    'search by budget': 'budget',
    'show all': 'all',
    'show all items': 'all',
    'under ₹5,000': 'budget5k',
    'under ₹15,000': 'budget15k',
    'under ₹50,000': 'budget50k',
    'antique notes': 'cat-antique-notes',
    'rare coins': 'cat-rare-coins',
    'birthday notes': 'cat-birthday-notes',
    'fancy serial numbers': 'cat-unique-serial',
    'birthday gift': 'gift-birthday',
    'anniversary gift': 'gift-anniversary',
    'wedding gift': 'gift-wedding',
    'show mint items': 'cond-mint',
    'show rare items': 'rarity-rare',
    'browse collection': 'all',
    'browse all': 'all',
    'view featured items': 'featured',
    'learn about grading': 'grading',
    'contact us': 'contact',
    'chat on whatsapp': 'whatsapp',
  };

  const quickKey = lower.trim();
  if (quickMap[quickKey]) {
    const action = quickMap[quickKey];

    if (action === 'categories') {
      return processMessage('what categories do you have', [], data);
    }
    if (action === 'featured') {
      const featured = PRODUCTS.filter(p => p.featured);
      return buildProductResponse(featured, "⭐ Our featured collection:");
    }
    if (action === 'gifts') {
      return processMessage('gift ideas', [], data);
    }
    if (action === 'budget') {
      return msg(
        "💰 What's your budget? Tell me a number and I'll find the best items.\n\nFor example: \"under 5000\" or \"below 20000\".",
        null,
        ['Under ₹5,000', 'Under ₹15,000', 'Under ₹50,000'],
      );
    }
    if (action === 'all') {
      return buildProductResponse(
        PRODUCTS.filter(p => p.featured),
        `We have ${PRODUCTS.length} items in our collection. Here are the featured ones:`,
      );
    }
    if (action === 'budget5k') return processMessage('under 5000', [], data);
    if (action === 'budget15k') return processMessage('under 15000', [], data);
    if (action === 'budget50k') return processMessage('under 50000', [], data);
    if (action.startsWith('cat-')) {
      const catId = action.replace('cat-', '');
      const filtered = PRODUCTS.filter(p => p.category === catId);
      const catLabel = CATEGORIES.find(c => c.id === catId)?.label || catId;
      return buildProductResponse(filtered, `📋 ${catLabel}:`);
    }
    if (action === 'gift-birthday') return processMessage('birthday gift', [], data);
    if (action === 'gift-anniversary') return processMessage('anniversary gift', [], data);
    if (action === 'gift-wedding') return processMessage('wedding gift', [], data);
    if (action === 'cond-mint') {
      const filtered = PRODUCTS.filter(p => p.condition === 'MINT');
      return buildProductResponse(filtered, "✨ Our Mint condition items:");
    }
    if (action === 'rarity-rare') {
      const filtered = PRODUCTS.filter(p => ['Rare', 'Very Rare', 'Extremely Rare', 'Ultra Rare', 'Museum Grade'].includes(p.rarity));
      return buildProductResponse(filtered, "💎 Our rarest items:");
    }
    if (action === 'grading') return processMessage('what does mint condition mean', [], data);
    if (action === 'contact') return msg(FAQ.contact.text, null, FAQ.contact.quickActions);
    if (action === 'whatsapp') {
      return msg(
        "💬 Opening WhatsApp chat! You can also click the green WhatsApp button at the bottom of the page.",
        null,
        ['Browse Collection', 'Help'],
      );
    }
  }

  // ── Fallback
  return msg(
    getRandomFrom(FALLBACKS),
    null,
    ['Browse Categories', 'Featured Items', 'Gift Ideas', 'Help'],
  );
}
