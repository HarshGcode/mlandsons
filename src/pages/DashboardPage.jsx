import { useState, useEffect } from 'react';
import { useNav } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import PageWrapper from '../components/PageWrapper';
import NoteCard from '../components/NoteCard';
import { formatPrice } from '../data/currencyData';

const TABS = [
  { id: 'wishlist', label: '♥ Wishlist', icon: '❤️' },
  { id: 'collection', label: 'My Collection', icon: '🏛️' },
  { id: 'history', label: 'Browse History', icon: '🕐' },
];

export default function DashboardPage() {
  const { navigate } = useNav();
  const { products, platformStats } = useData();
  const [activeTab, setActiveTab] = useState('wishlist');
  const [savedIds, setSavedIds] = useState(new Set());
  const [collectionIds, setCollectionIds] = useState(new Set());

  // Simulate some items in wishlist
  useEffect(() => {
    const demo = products.filter(p => p.featured).map(p => p.id);
    setSavedIds(new Set(demo.slice(0, 4)));
    setCollectionIds(new Set(demo.slice(2, 5)));
  }, []);

  const toggleSave = (id) => setSavedIds(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  const wishlistItems = products.filter(p => savedIds.has(p.id));
  const collectionItems = products.filter(p => collectionIds.has(p.id));
  const historyItems = products.slice(0, 6);

  const totalValue = wishlistItems.reduce((sum, p) => sum + p.price, 0);
  const collValue = collectionItems.reduce((sum, p) => sum + p.price, 0);

  return (
    <PageWrapper
      title="Collector Dashboard"
      subtitle="Manage your wishlist, collection, and track your numismatic journey"
      breadcrumbs={[{ label: 'Dashboard' }]}
    >
      {/* Stats Bar */}
      <section className="db-stats-bar">
        <div className="db-stat-card">
          <div className="db-stat-icon">❤️</div>
          <div className="db-stat-info">
            <div className="db-stat-value">{savedIds.size}</div>
            <div className="db-stat-label">Wishlist Items</div>
          </div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-icon">🏛️</div>
          <div className="db-stat-info">
            <div className="db-stat-value">{collectionIds.size}</div>
            <div className="db-stat-label">In Collection</div>
          </div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-icon">💰</div>
          <div className="db-stat-info">
            <div className="db-stat-value">{formatPrice(totalValue)}</div>
            <div className="db-stat-label">Wishlist Value</div>
          </div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-icon">📈</div>
          <div className="db-stat-info">
            <div className="db-stat-value">{formatPrice(collValue)}</div>
            <div className="db-stat-label">Collection Value</div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="db-tabs-section">
        <div className="db-tabs">
          {TABS.map(t => (
            <button key={t.id} className={`db-tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="db-tab-content">
          {activeTab === 'wishlist' && (
            <>
              {wishlistItems.length > 0 ? (
                <div className="db-grid">
                  {wishlistItems.map(p => (
                    <NoteCard key={p.id} product={p} saved={true} onToggleSave={toggleSave} />
                  ))}
                </div>
              ) : (
                <div className="db-empty">
                  <div className="db-empty-icon">❤️</div>
                  <h4>Your wishlist is empty</h4>
                  <p>Save notes you love while browsing our collections.</p>
                  <button className="db-browse-btn" onClick={() => navigate('collections')}>Browse Collections →</button>
                </div>
              )}
            </>
          )}

          {activeTab === 'collection' && (
            <>
              {collectionItems.length > 0 ? (
                <div className="db-grid">
                  {collectionItems.map(p => (
                    <NoteCard key={p.id} product={p} saved={savedIds.has(p.id)} onToggleSave={toggleSave} />
                  ))}
                </div>
              ) : (
                <div className="db-empty">
                  <div className="db-empty-icon">🏛️</div>
                  <h4>Start your collection</h4>
                  <p>Purchase items to add them to your personal collection tracker.</p>
                  <button className="db-browse-btn" onClick={() => navigate('collections')}>Explore Items →</button>
                </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <div className="db-grid">
              {historyItems.map(p => (
                <NoteCard key={p.id} product={p} saved={savedIds.has(p.id)} onToggleSave={toggleSave} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Collector Perks */}
      <section className="db-perks">
        <h3 className="db-perks-title">Collector Perks</h3>
        <div className="db-perks-grid">
          <div className="db-perk-card">
            <span className="db-perk-icon">🛡️</span>
            <h4>Authenticity Guarantee</h4>
            <p>Every item comes with a Certificate of Authenticity verified by our experts.</p>
          </div>
          <div className="db-perk-card">
            <span className="db-perk-icon">📦</span>
            <h4>Premium Packaging</h4>
            <p>Acid-free sleeves, protective cases, and presentation boxes for all orders.</p>
          </div>
          <div className="db-perk-card">
            <span className="db-perk-icon">🔄</span>
            <h4>Buyback Program</h4>
            <p>We offer buyback on items we've sold, ensuring liquidity for your collection.</p>
          </div>
          <div className="db-perk-card">
            <span className="db-perk-icon">📱</span>
            <h4>Priority Access</h4>
            <p>Get notified first when rare items matching your interests become available.</p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="db-trust">
        <div className="db-trust-inner">
          {platformStats.map((s, i) => (
            <div className="db-trust-item" key={i}>
              <span className="db-trust-icon">{s.icon}</span>
              <div className="db-trust-value">{s.value}</div>
              <div className="db-trust-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .db-stats-bar{max-width:1100px;margin:0 auto;padding:0 24px 30px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
        .db-stat-card{background:#0f1218;border:1px solid #1e2530;border-radius:13px;padding:18px 16px;display:flex;align-items:center;gap:14px;transition:all .2s}
        .db-stat-card:hover{border-color:rgba(196,150,40,.25);transform:translateY(-2px)}
        .db-stat-icon{font-size:1.5rem}
        .db-stat-value{font-size:1.15rem;font-weight:700;color:#d4a853}
        .db-stat-label{font-size:.7rem;color:rgba(180,175,165,.45);font-weight:500;letter-spacing:.03em}

        .db-tabs-section{max-width:1100px;margin:0 auto;padding:0 24px 50px}
        .db-tabs{display:flex;gap:6px;margin-bottom:24px;border-bottom:1px solid #1e2530;padding-bottom:14px}
        .db-tab{display:flex;align-items:center;gap:6px;background:none;border:1px solid transparent;border-radius:10px;padding:9px 18px;color:rgba(180,175,165,.55);font-size:.85rem;font-weight:600;cursor:pointer;font-family:'Sora',sans-serif;transition:all .2s}
        .db-tab:hover{color:#d4a853;background:rgba(196,150,40,.06)}
        .db-tab.active{background:rgba(196,150,40,.12);border-color:rgba(196,150,40,.3);color:#f0c060}

        .db-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
        .db-empty{text-align:center;padding:50px 20px}
        .db-empty-icon{font-size:3rem;margin-bottom:16px}
        .db-empty h4{color:#e8e0d0;font-size:1.1rem;margin:0 0 8px}
        .db-empty p{color:rgba(180,175,165,.5);font-size:.85rem;margin:0 0 22px}
        .db-browse-btn{padding:10px 22px;background:rgba(196,150,40,.12);border:1px solid rgba(196,150,40,.3);border-radius:9px;color:#d4a853;font-size:.85rem;font-weight:600;cursor:pointer;font-family:'Sora',sans-serif;transition:all .2s}
        .db-browse-btn:hover{background:rgba(196,150,40,.22);border-color:rgba(196,150,40,.6)}

        .db-perks{max-width:1100px;margin:0 auto;padding:0 24px 50px}
        .db-perks-title{font-family:'Playfair Display',serif;font-size:1.3rem;color:#f0ead6;margin:0 0 20px}
        .db-perks-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
        .db-perk-card{background:#0f1218;border:1px solid #1e2530;border-radius:14px;padding:24px 20px;transition:all .2s}
        .db-perk-card:hover{border-color:rgba(196,150,40,.25);transform:translateY(-2px)}
        .db-perk-icon{font-size:1.6rem;display:block;margin-bottom:12px}
        .db-perk-card h4{font-size:.9rem;color:#e8e0d0;margin:0 0 6px;font-weight:700}
        .db-perk-card p{font-size:.78rem;color:rgba(180,175,165,.5);line-height:1.6;margin:0}

        .db-trust{background:linear-gradient(180deg,transparent,rgba(196,150,40,.03));border-top:1px solid rgba(196,150,40,.08);padding:50px 24px}
        .db-trust-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center}
        .db-trust-icon{font-size:1.8rem;display:block;margin-bottom:8px}
        .db-trust-value{font-size:1.3rem;font-weight:800;color:#d4a853;font-family:'Playfair Display',serif}
        .db-trust-label{font-size:.72rem;color:rgba(180,175,165,.45);font-weight:500;margin-top:4px;letter-spacing:.04em}

        @media(max-width:800px){
          .db-stats-bar{grid-template-columns:repeat(2,1fr)}
          .db-trust-inner{grid-template-columns:repeat(2,1fr);gap:28px}
        }
        @media(max-width:500px){
          .db-stats-bar{grid-template-columns:1fr}
          .db-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}
        }
      `}</style>
    </PageWrapper>
  );
}
