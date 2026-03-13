import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

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
        console.error('DataProvider fetch error:', err);
        setError(err.message);
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
