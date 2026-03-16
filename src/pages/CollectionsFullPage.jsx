import React, { useState, useMemo, useEffect } from 'react';
import { useNav } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import NoteCard from '../components/NoteCard';
import PageWrapper from '../components/PageWrapper';
import { formatPrice, getRarityColor, searchBySerial } from '../data/currencyData';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Default' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'year_new',   label: 'Year: Newest First' },
  { value: 'year_old',   label: 'Year: Oldest First' },
  { value: 'rarity',     label: 'Rarity' },
];
const RARITY_RANK = { Common:0, Uncommon:1, Rare:2, 'Very Rare':3, 'Extremely Rare':4 };

export default function CollectionsFullPage() {
  const { navigate } = useNav();
  const { products, categories } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [sortBy,         setSortBy]         = useState('default');
  const [savedItems,     setSavedItems]     = useState(new Set());

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.year?.toString().includes(q) ||
        p.serialNumber?.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.includes(q))
      );
    }
    switch (sortBy) {
      case 'price_asc':  list.sort((a,b) => (a.price||0)-(b.price||0)); break;
      case 'price_desc': list.sort((a,b) => (b.price||0)-(a.price||0)); break;
      case 'year_new':   list.sort((a,b) => (b.year||0)-(a.year||0));   break;
      case 'year_old':   list.sort((a,b) => (a.year||0)-(b.year||0));   break;
      case 'rarity':
        list.sort((a,b) => (RARITY_RANK[b.rarity]||0)-(RARITY_RANK[a.rarity]||0)); break;
      default: break;
    }
    return list;
  }, [activeCategory, searchQuery, sortBy, products]);

  const toggleSave = (id) => {
    setSavedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allCats = [{ id: 'all', icon: '🏛️', label: 'All Items' }, ...categories];

  return (
    <PageWrapper title="Our Collections" subtitle="Explore rare Indian currency notes and coins">
      <div className="cfp-wrap">

        {/* Controls Bar */}
        <div className="cfp-controls">
          <div className="cfp-search-wrap">
            <input
              type="text"
              placeholder="Search by name, year, serial..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="cfp-search"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="cfp-select"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Category Pills */}
        <div className="cfp-cat-scroll">
          {allCats.map(cat => {
            const id = cat.id || cat.value || cat.label;
            return (
              <button
                key={id}
                className={`cfp-pill ${activeCategory === id ? 'active' : ''}`}
                onClick={() => setActiveCategory(id)}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.label || cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <div className="cfp-results-row">
          <p className="cfp-results-text">
            Showing <span className="cfp-hl">{filtered.length}</span> of <span className="cfp-hl">{products.length}</span> items
            {activeCategory !== 'all' && (
              <> in <span className="cfp-hl">{activeCategory}</span></>
            )}
            {searchQuery.trim() && (
              <> matching <span className="cfp-hl">"{searchQuery}"</span></>
            )}
          </p>
          {(activeCategory !== 'all' || searchQuery.trim()) && (
            <button className="cfp-clear-btn" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
              Clear filters ✕
            </button>
          )}
        </div>

        {/* Grid or Empty */}
        {filtered.length === 0 ? (
          <div className="cfp-empty">
            <div className="cfp-empty-icon">🔍</div>
            <h3 className="cfp-empty-h3">No items found</h3>
            <p className="cfp-empty-p">Try adjusting your search or category filters</p>
            <button className="cfp-clear-all" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="cfp-grid">
            {filtered.map(product => (
              <NoteCard
                key={product.id}
                product={product}
                saved={savedItems.has(product.id)}
                onToggleSave={() => toggleSave(product.id)}
                onClick={() => navigate('product', product)}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .cfp-wrap {
          padding-bottom: 40px;
        }

        .cfp-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .cfp-search-wrap {
          flex: 1 1 260px;
          min-width: 220px;
          max-width: 420px;
        }

        .cfp-search {
          width: 100%;
          padding: 11px 16px;
          background: #111;
          border: 1px solid #1e1e1e;
          color: #fff;
          font-size: 13px;
          outline: none;
          box-sizing: border-box;
          font-family: 'Jost', sans-serif;
          transition: border-color 0.2s;
        }
        .cfp-search::placeholder { color: rgba(255,255,255,0.25); }
        .cfp-search:focus { border-color: rgba(255,255,255,0.4); }

        .cfp-select {
          padding: 11px 16px;
          background: #111;
          border: 1px solid #1e1e1e;
          color: #fff;
          font-size: 13px;
          outline: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          min-width: 190px;
        }
        .cfp-select option { background: #0a0a0a; color: #fff; }

        .cfp-cat-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 24px;
          scrollbar-width: none;
        }
        .cfp-cat-scroll::-webkit-scrollbar { display: none; }

        .cfp-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border: 1px solid #1e1e1e;
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-size: 12px;
          font-weight: 400;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.04em;
          transition: all 0.2s;
        }
        .cfp-pill:hover {
          border-color: rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.7);
        }
        .cfp-pill.active {
          border-color: rgba(255,255,255,0.6);
          color: #fff;
          background: rgba(255,255,255,0.06);
        }

        .cfp-results-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .cfp-results-text {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin: 0;
          font-family: 'Jost', sans-serif;
        }

        .cfp-hl {
          color: #fff;
          font-weight: 500;
        }

        .cfp-clear-btn {
          background: none;
          border: 1px solid #1e1e1e;
          color: rgba(255,255,255,0.5);
          font-size: 11px;
          padding: 5px 12px;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
        }
        .cfp-clear-btn:hover {
          border-color: rgba(255,255,255,0.4);
          color: #fff;
        }

        .cfp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .cfp-empty {
          text-align: center;
          padding: 80px 20px;
        }

        .cfp-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.4;
        }

        .cfp-empty-h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #fff;
          margin: 0 0 8px;
        }

        .cfp-empty-p {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          font-family: 'Jost', sans-serif;
        }

        .cfp-clear-all {
          margin-top: 16px;
          padding: 10px 24px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          color: #fff;
          font-weight: 500;
          font-size: 13px;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.06em;
          transition: all 0.2s;
        }
        .cfp-clear-all:hover {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        @media (max-width: 768px) {
          .cfp-grid { grid-template-columns: 1fr; }
        }

        /* Light theme */
        [data-theme="light"] .cfp-search { background: #fff; border-color: #e5e5e5; color: #111; }
        [data-theme="light"] .cfp-search::placeholder { color: rgba(0,0,0,0.25); }
        [data-theme="light"] .cfp-search:focus { border-color: rgba(0,0,0,0.4); }
        [data-theme="light"] .cfp-select { background: #fff; border-color: #e5e5e5; color: #111; }
        [data-theme="light"] .cfp-select option { background: #f9f6f0; color: #111; }
        [data-theme="light"] .cfp-pill { border-color: #e5e5e5; color: rgba(0,0,0,0.4); }
        [data-theme="light"] .cfp-pill:hover { border-color: rgba(0,0,0,0.3); color: rgba(0,0,0,0.7); }
        [data-theme="light"] .cfp-pill.active { border-color: rgba(0,0,0,0.6); color: #111; background: rgba(0,0,0,0.04); }
        [data-theme="light"] .cfp-results-text { color: rgba(0,0,0,0.35); }
        [data-theme="light"] .cfp-hl { color: #111; }
        [data-theme="light"] .cfp-clear-btn { border-color: #e5e5e5; color: rgba(0,0,0,0.5); }
        [data-theme="light"] .cfp-clear-btn:hover { border-color: rgba(0,0,0,0.4); color: #111; }
        [data-theme="light"] .cfp-empty-h3 { color: #111; }
        [data-theme="light"] .cfp-empty-p { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .cfp-clear-all { border-color: rgba(0,0,0,0.4); color: #111; }
        [data-theme="light"] .cfp-clear-all:hover { background: #111; color: #fff; border-color: #111; }
      `}</style>
    </PageWrapper>
  );
}
