// ─── Currency Data ───────────────────────────────────────────────────────────
// UI helpers and constants – data now lives in PostgreSQL and is fetched via API

export const CONDITIONS = {
  MINT:      { label: 'Mint',       color: '#4ade80', score: 5 },
  UNC:       { label: 'Uncirculated', color: '#a3e635', score: 4 },
  VF:        { label: 'Very Fine',  color: '#fbbf24', score: 3 },
  FINE:      { label: 'Fine',       color: '#f97316', score: 2 },
  GOOD:      { label: 'Good',       color: '#94a3b8', score: 1 },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
export const getRarityColor = (rarity) => {
  const map = {
    'Common':           '#94a3b8',
    'Uncommon':         '#7ade80',
    'Rare':             '#60a5fa',
    'Very Rare':        '#c084fc',
    'Extremely Rare':   '#f97316',
    'Ultra Rare':       '#f43f5e',
    'Museum Grade':     '#fbbf24',
    'On Request':       '#4ade80',
  };
  return map[rarity] || '#94a3b8';
};

export const formatPrice = (p) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

export const searchByDate = (dateStr, products = []) => {
  const clean = dateStr.replace(/\D/g, '');
  if (clean.length < 4) return [];
  return products.filter(p => {
    const sn = p.serialNumber.replace(/\D/g, '');
    if (sn.includes(clean)) return true;
    const day   = clean.slice(0, 2);
    const month = clean.slice(2, 4);
    const year  = clean.slice(4);
    if (day && month && sn.includes(day + month)) return true;
    if (year && year.length >= 4 && sn.includes(year)) return true;
    return false;
  });
};

export const searchBySerial = (query, products = []) => {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(p =>
    p.serialNumber.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.denomination.toLowerCase().includes(q) ||
    String(p.year).includes(q) ||
    (p.tags || []).some(t => t.includes(q))
  );
};
