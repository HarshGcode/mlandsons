import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { PRODUCTS, CATEGORIES, GIFT_PACKAGES, BLOG_POSTS, PLATFORM_STATS } from '../data/staticData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [giftPackages, setGiftPackages] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [platformStats, setPlatformStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.getProducts(),
      api.getCategories(),
      api.getGiftPackages(),
      api.getBlogPosts(),
      api.getPlatformStats(),
    ])
      .then(([p, c, g, b, s]) => {
        setProducts(p);
        setCategories(c);
        setGiftPackages(g);
        setBlogPosts(b);
        setPlatformStats(s);
      })
      .catch((err) => {
        console.error('DataProvider: API failed, using embedded data:', err.message);
        setProducts(PRODUCTS);
        setCategories(CATEGORIES);
        setGiftPackages(GIFT_PACKAGES);
        setBlogPosts(BLOG_POSTS);
        setPlatformStats(PLATFORM_STATS);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DataContext.Provider
      value={{ products, categories, giftPackages, blogPosts, platformStats, loading, error }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within <DataProvider>');
  return ctx;
}
