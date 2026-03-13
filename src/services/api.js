const BASE = '/api';

async function fetchJSON(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json();
}

export const api = {
  getProducts:      () => fetchJSON('/products'),
  getFeatured:      () => fetchJSON('/products?featured=true'),
  getProduct:      (id) => fetchJSON(`/products?id=${id}`),
  getCategories:    () => fetchJSON('/categories'),
  getGiftPackages:  () => fetchJSON('/gift-packages'),
  getBlogPosts:     () => fetchJSON('/blog-posts'),
  getPlatformStats: () => fetchJSON('/platform-stats'),

  submitContact: async (data) => {
    const res = await fetch(`${BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Contact submit failed: ${res.status}`);
    return res.json();
  },
};
