import { useState, useMemo, useEffect } from 'react';
import { useNav } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import PageWrapper from '../components/PageWrapper';
import NoteCard from '../components/NoteCard';
import { searchBySerial, formatPrice } from '../data/currencyData';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'year-desc', label: 'Year: Newest' },
  { value: 'year-asc', label: 'Year: Oldest' },
];

const QUICK_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Antique Notes', value: 'antique-notes' },
  { label: 'Rare Coins', value: 'rare-coins' },
  { label: 'Birthday Notes', value: 'birthday-notes' },
  { label: 'Under ₹5,000', value: 'under5k' },
  { label: 'Under ₹20,000', value: 'under20k' },
];

const TIPS = [
  { icon: '💰', tip: 'Search by denomination', example: '₹100, ₹500' },
  { icon: '📅', tip: 'Search by year', example: '1947, 2000' },
  { icon: '🎂', tip: 'Search by type', example: 'birthday, anniversary' },
  { icon: '🔢', tip: 'Search serial pattern', example: '1234567, radar' },
];

export default function SearchPage() {
  const { navigate } = useNav();
  const { products } = useData();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('relevance');
  const [filter, setFilter] = useState('all');
  const [saved, setSaved] = useState(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const toggleSave = (id) => setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  useEffect(() => {
    try {
      const rv = JSON.parse(localStorage.getItem('ml_recently_viewed') || '[]');
      const items = rv.map(id => products.find(p => p.id === id)).filter(Boolean);
      setRecentlyViewed(items.slice(0, 3));
    } catch {}
  }, [products]);

  const results = useMemo(() => {
    let items = query.trim() ? searchBySerial(query, products) : [...products];
    if (filter === 'under5k') items = items.filter(p => p.price < 5000);
    else if (filter === 'under20k') items = items.filter(p => p.price < 20000);
    else if (filter !== 'all') items = items.filter(p => p.category === filter);

    const RARITY = { 'Common': 1, 'Uncommon': 2, 'Rare': 3, 'Very Rare': 4, 'Extremely Rare': 5, 'Ultra Rare': 6, 'Museum Grade': 7, 'On Request': 3 };
    switch (sort) {
      case 'price-asc': items.sort((a, b) => a.price - b.price); break;
      case 'price-desc': items.sort((a, b) => b.price - a.price); break;
      case 'year-desc': items.sort((a, b) => b.year - a.year); break;
      case 'year-asc': items.sort((a, b) => a.year - b.year); break;
      default: items.sort((a, b) => (RARITY[b.rarity] || 0) - (RARITY[a.rarity] || 0)); break;
    }
    return items;
  }, [query, sort, filter, products]);

  return (
    <PageWrapper
      title="Search Collection"
      subtitle="Find notes and coins by serial number, year, denomination, or keywords"
      breadcrumbs={[{ label: 'Search' }]}
    >
      {/* Search Bar */}
      <section className="sp-search-section">
        <div className="sp-search-wrap">
          <input
            className="sp-search-input"
            type="text"
            placeholder="Search by serial, denomination, year, or keyword..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="sp-clear-btn" onClick={() => setQuery('')}>✕</button>
          )}
        </div>
        <div className="sp-search-hint">
          Try:
          <button className="sp-hint-btn" onClick={() => setQuery('1234567')}>1234567</button>
          <button className="sp-hint-btn" onClick={() => setQuery('₹100')}>₹100</button>
          <button className="sp-hint-btn" onClick={() => setQuery('1947')}>1947</button>
          <button className="sp-hint-btn" onClick={() => setQuery('birthday')}>birthday</button>
        </div>
      </section>

      {/* Filters + Sort */}
      <section className="sp-controls">
        <div className="sp-filters">
          {QUICK_FILTERS.map(f => (
            <button key={f.value} className={`sp-filter-pill ${filter === f.value ? 'active' : ''}`}
              onClick={() => setFilter(f.value)}>{f.label}</button>
          ))}
        </div>
        <div className="sp-sort">
          <label className="sp-sort-label">Sort:</label>
          <select className="sp-sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </section>

      {/* Results Count */}
      <section className="sp-results-info">
        <span>{results.length} {results.length === 1 ? 'result' : 'results'} found</span>
        {query && <span className="sp-query-tag">for "{query}"</span>}
      </section>

      {/* Results Grid */}
      {results.length > 0 ? (
        <section className="sp-grid">
          {results.map(p => (
            <NoteCard key={p.id} product={p} saved={saved.has(p.id)} onToggleSave={toggleSave} />
          ))}
        </section>
      ) : (
        <section className="sp-empty">
          <div style={{ fontSize: '2rem', marginBottom: 16, opacity: 0.3 }}>🔎</div>
          <h4 className="sp-empty-h4">No results found</h4>
          <p className="sp-empty-p">Try a different search term or adjust your filters.</p>
          <button className="sp-clear-all" onClick={() => { setQuery(''); setFilter('all'); }}>
            Clear All Filters
          </button>
        </section>
      )}

      {/* Search Tips */}
      <section className="sp-tips-section">
        <h4 className="sp-tips-title">Search Tips</h4>
        <div className="sp-tips-grid">
          {TIPS.map((t, i) => (
            <div className="sp-tip-card" key={i}>
              <span className="sp-tip-icon">{t.icon}</span>
              <div>
                <div className="sp-tip-text">{t.tip}</div>
                <div className="sp-tip-example">e.g., {t.example}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="sp-recent-section">
          <h4 className="sp-tips-title">Recently Viewed</h4>
          <div className="sp-recent-grid">
            {recentlyViewed.map(p => (
              <NoteCard key={p.id} product={p} saved={saved.has(p.id)} onToggleSave={toggleSave} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        .sp-search-section { max-width: 700px; margin: 0 auto; padding: 0 0 24px; }
        .sp-search-wrap { position: relative; display: flex; align-items: center; }
        .sp-search-input {
          width: 100%;
          padding: 14px 44px 14px 16px;
          background: #111;
          border: 1px solid #1e1e1e;
          color: #fff;
          font-size: 14px;
          font-family: 'Jost', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .sp-search-input:focus { border-color: rgba(255,255,255,0.35); }
        .sp-search-input::placeholder { color: rgba(255,255,255,0.25); }
        .sp-clear-btn {
          position: absolute;
          right: 12px;
          background: rgba(255,255,255,0.06);
          border: none;
          color: rgba(255,255,255,0.4);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 11px;
          transition: all 0.2s;
        }
        .sp-clear-btn:hover { background: rgba(239,68,68,0.15); color: #f87171; }
        .sp-search-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          flex-wrap: wrap;
          font-family: 'Jost', sans-serif;
        }
        .sp-hint-btn {
          background: transparent;
          border: 1px solid #1e1e1e;
          color: rgba(255,255,255,0.4);
          padding: 2px 8px;
          font-size: 11px;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.15s;
        }
        .sp-hint-btn:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

        .sp-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-bottom: 16px;
        }
        .sp-filters { display: flex; gap: 6px; flex-wrap: wrap; }
        .sp-filter-pill {
          padding: 6px 14px;
          border: 1px solid #1e1e1e;
          background: none;
          color: rgba(255,255,255,0.4);
          font-size: 12px;
          font-weight: 400;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
        }
        .sp-filter-pill:hover { border-color: rgba(255,255,255,0.3); color: rgba(255,255,255,0.7); }
        .sp-filter-pill.active {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
          background: rgba(255,255,255,0.05);
        }
        .sp-sort { display: flex; align-items: center; gap: 8px; }
        .sp-sort-label { font-size: 12px; color: rgba(255,255,255,0.35); font-family: 'Jost', sans-serif; }
        .sp-sort-select {
          background: #111;
          border: 1px solid #1e1e1e;
          padding: 6px 10px;
          color: #fff;
          font-size: 12px;
          font-family: 'Jost', sans-serif;
          outline: none;
          cursor: pointer;
        }
        .sp-sort-select option { background: #0a0a0a; color: #fff; }

        .sp-results-info {
          padding-bottom: 18px;
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Jost', sans-serif;
        }
        .sp-query-tag {
          border: 1px solid #1e1e1e;
          color: #fff;
          padding: 2px 8px;
          font-weight: 500;
        }

        .sp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
          padding-bottom: 50px;
        }

        .sp-empty { text-align: center; padding: 50px 0; }
        .sp-empty-h4 { color: #fff; font-size: 18px; margin: 0 0 8px; font-family: 'Cormorant Garamond', serif; }
        .sp-empty-p { color: rgba(255,255,255,0.4); font-size: 13px; margin: 0 0 20px; font-family: 'Jost', sans-serif; }
        .sp-clear-all {
          padding: 10px 22px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.35);
          color: #fff;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
        }
        .sp-clear-all:hover { background: #fff; color: #000; border-color: #fff; }

        .sp-tips-section, .sp-recent-section { padding-bottom: 50px; }
        .sp-tips-title {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 16px;
          font-family: 'Jost', sans-serif;
        }
        .sp-tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
        }
        .sp-tip-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #0a0a0a;
          padding: 16px;
          transition: background 0.2s;
        }
        .sp-tip-card:hover { background: #111; }
        .sp-tip-icon { font-size: 1.2rem; }
        .sp-tip-text { font-size: 12px; color: #fff; font-weight: 500; margin-bottom: 2px; }
        .sp-tip-example { font-size: 11px; color: rgba(255,255,255,0.3); }

        .sp-recent-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        @media (max-width: 600px) {
          .sp-controls { flex-direction: column; align-items: flex-start; }
        }

        /* Light theme */
        [data-theme="light"] .sp-search-input { background: #fff; border-color: #e5e5e5; color: #111; }
        [data-theme="light"] .sp-search-input::placeholder { color: rgba(0,0,0,0.25); }
        [data-theme="light"] .sp-search-input:focus { border-color: rgba(0,0,0,0.35); }
        [data-theme="light"] .sp-clear-btn { background: rgba(0,0,0,0.04); color: rgba(0,0,0,0.4); }
        [data-theme="light"] .sp-search-hint { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .sp-hint-btn { border-color: #e5e5e5; color: rgba(0,0,0,0.4); }
        [data-theme="light"] .sp-hint-btn:hover { border-color: rgba(0,0,0,0.35); color: #111; }
        [data-theme="light"] .sp-filter-pill { border-color: #e5e5e5; color: rgba(0,0,0,0.4); }
        [data-theme="light"] .sp-filter-pill:hover { border-color: rgba(0,0,0,0.3); color: rgba(0,0,0,0.7); }
        [data-theme="light"] .sp-filter-pill.active { border-color: rgba(0,0,0,0.5); color: #111; background: rgba(0,0,0,0.04); }
        [data-theme="light"] .sp-sort-label { color: rgba(0,0,0,0.35); }
        [data-theme="light"] .sp-sort-select { background: #fff; border-color: #e5e5e5; color: #111; }
        [data-theme="light"] .sp-sort-select option { background: #f9f6f0; color: #111; }
        [data-theme="light"] .sp-results-info { color: rgba(0,0,0,0.35); }
        [data-theme="light"] .sp-query-tag { border-color: #e5e5e5; color: #111; }
        [data-theme="light"] .sp-empty-h4 { color: #111; }
        [data-theme="light"] .sp-empty-p { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .sp-clear-all { border-color: rgba(0,0,0,0.35); color: #111; }
        [data-theme="light"] .sp-clear-all:hover { background: #111; color: #fff; border-color: #111; }
        [data-theme="light"] .sp-tips-title { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .sp-tips-grid { background: #e5e5e5; border-color: #e5e5e5; }
        [data-theme="light"] .sp-tip-card { background: #f9f6f0; }
        [data-theme="light"] .sp-tip-card:hover { background: #f0ede6; }
        [data-theme="light"] .sp-tip-text { color: #111; }
        [data-theme="light"] .sp-tip-example { color: rgba(0,0,0,0.3); }
      `}</style>
    </PageWrapper>
  );
}
