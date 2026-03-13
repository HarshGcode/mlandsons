import { useNav } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { CONDITIONS, formatPrice } from '../data/currencyData';

const collectionImages = [
  {
    title: "Antique Coins",
    img: "https://www.tezbid.com/cdn/shop/files/L09I01_580x.jpg",
    count: "120+ pieces",
  },
  {
    title: "Rare Currency Notes",
    img: "https://rukminim2.flixcart.com/image/480/640/xif0q/printed-currency/8/z/2/1-10-different-old-note-collection-1-naaz-rare-collection-original-imahfdszbzgf2gfe.jpeg",
    count: "200+ pieces",
  },
  {
    title: "Collector Currency",
    img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80",
    count: "150+ pieces",
  },
  {
    title: "Date Notes & Gifts",
    img: "https://www.marketcalls.in/wp-content/uploads/2011/11/History-of-Rupee.jpg",
    count: "300+ pieces",
  },
];

export default function FeaturedCollections() {
  const nav = useNav();
  const navigate = nav?.navigate;
  const { products } = useData();
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <>
      {/* ── Collections Section ── */}
      <section className="ba-col-section">
        <div className="ba-col-inner">
          <div className="ba-sec-header">
            <h2 className="ba-sec-title">Collections</h2>
            <button className="ba-sec-viewall" onClick={() => navigate?.('collections')}>View all</button>
          </div>

          <div className="ba-col-grid">
            {collectionImages.map((col, i) => (
              <div
                key={i}
                className="ba-col-card"
                onClick={() => navigate?.('collections')}
              >
                <div className="ba-col-img-wrap">
                  <img src={col.img} alt={col.title} className="ba-col-img" loading="lazy" />
                  <div className="ba-col-img-overlay" />
                </div>
                <div className="ba-col-label">
                  <span className="ba-col-name">{col.title}</span>
                  <span className="ba-col-count">{col.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── "Rare Pieces. Real Stories." Banner ── */}
      <section className="ba-banner-section">
        <div className="ba-banner-inner">
          <div className="ba-banner-left">
            <img
              src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80"
              alt="Rare collection"
              className="ba-banner-img"
            />
          </div>
          <div className="ba-banner-right">
            <p className="ba-banner-eyebrow">ML &amp; SONS</p>
            <h2 className="ba-banner-h2">Rare Pieces.<br />Real Stories.</h2>
            <p className="ba-banner-desc">
              Every item in our collection carries history — authentic antique
              currency and coins carefully sourced and preserved for collectors
              and gift buyers across India and worldwide.
            </p>
            <button className="ba-banner-btn" onClick={() => navigate?.('collections')}>
              Explore Collection →
            </button>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="ba-feat-section">
        <div className="ba-feat-inner">
          <div className="ba-sec-header">
            <h2 className="ba-sec-title">Featured Items</h2>
            <button className="ba-sec-viewall" onClick={() => navigate?.('collections')}>View all</button>
          </div>

          <div className="ba-feat-grid">
            {featured.map((p) => {
              const cond = CONDITIONS[p.condition];
              return (
                <div
                  key={p.id}
                  className="ba-feat-card"
                  onClick={() => navigate?.('product', p)}
                >
                  {/* Image area */}
                  <div className="ba-feat-img-wrap" style={{ background: p.gradient || '#111' }}>
                    {p.image && (
                      <img src={p.image} alt={p.name} className="ba-feat-photo" />
                    )}
                    <div className="ba-feat-img-overlay-grad" />
                    <div className="ba-feat-denom">{p.denomination}</div>
                    {p.rarity === 'Ultra Rare' && <span className="ba-feat-sale">Rare</span>}
                  </div>

                  {/* Info */}
                  <div className="ba-feat-info">
                    <h3 className="ba-feat-name">{p.name}</h3>
                    <div className="ba-feat-meta">
                      {cond && <span style={{ color: cond.color }}>● {cond.label}</span>}
                      <span className="ba-feat-year">{p.year}</span>
                    </div>
                    <p className="ba-feat-price">{formatPrice(p.price)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');

        /* ── Shared ── */
        .ba-sec-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .ba-sec-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 4vw, 38px);
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.02em;
        }

        .ba-sec-viewall {
          background: none;
          border: none;
          color: rgba(255,255,255,0.55);
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.08em;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
          padding: 0;
        }
        .ba-sec-viewall:hover { color: #fff; }

        /* ── Collections Grid ── */
        .ba-col-section {
          background: #0a0a0a;
          padding: 72px 0;
          border-top: 1px solid #1a1a1a;
        }

        .ba-col-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ba-col-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .ba-col-card {
          cursor: pointer;
          overflow: hidden;
          border: 1px solid #1a1a1a;
          transition: border-color 0.3s;
        }
        .ba-col-card:hover { border-color: #333; }

        .ba-col-img-wrap {
          position: relative;
          padding-bottom: 110%;
          overflow: hidden;
          background: #111;
        }

        .ba-col-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }
        .ba-col-card:hover .ba-col-img { transform: scale(1.06); }

        .ba-col-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%);
          pointer-events: none;
        }

        .ba-col-label {
          padding: 14px 0 4px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .ba-col-name {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.04em;
        }

        .ba-col-count {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.04em;
        }

        @media (max-width: 900px) { .ba-col-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .ba-col-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }

        /* ── Banner / Story Section ── */
        .ba-banner-section {
          background: #0a0a0a;
          padding: 0 0 80px;
        }

        .ba-banner-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1px solid #1a1a1a;
        }

        .ba-banner-left {
          overflow: hidden;
        }

        .ba-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          min-height: 400px;
          filter: brightness(0.8);
          transition: transform 0.6s ease;
        }
        .ba-banner-left:hover .ba-banner-img { transform: scale(1.03); }

        .ba-banner-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
          padding: 60px 56px;
          background: #111;
        }

        .ba-banner-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }

        .ba-banner-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 700;
          color: #fff;
          line-height: 1.12;
          letter-spacing: 0.02em;
        }

        .ba-banner-desc {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          line-height: 1.8;
          max-width: 380px;
        }

        .ba-banner-btn {
          display: inline-block;
          width: fit-content;
          padding: 13px 32px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.5);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ba-banner-btn:hover {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        @media (max-width: 768px) {
          .ba-banner-inner { grid-template-columns: 1fr; }
          .ba-banner-right { padding: 40px 28px; }
          .ba-banner-img { min-height: 280px; }
        }

        /* ── Featured Products Grid ── */
        .ba-feat-section {
          background: #0a0a0a;
          padding: 0 0 80px;
          border-top: 1px solid #1a1a1a;
        }

        .ba-feat-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 72px 32px 0;
        }

        .ba-feat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
        }

        .ba-feat-card {
          background: #0a0a0a;
          cursor: pointer;
          transition: background 0.2s;
          overflow: hidden;
        }
        .ba-feat-card:hover { background: #111; }

        .ba-feat-img-wrap {
          position: relative;
          padding-bottom: 100%;
          overflow: hidden;
        }

        .ba-feat-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.75);
          transition: transform 0.6s ease, filter 0.3s;
          z-index: 0;
        }
        .ba-feat-card:hover .ba-feat-photo {
          transform: scale(1.06);
          filter: brightness(0.6);
        }

        .ba-feat-img-overlay-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%);
          z-index: 1;
          pointer-events: none;
        }

        .ba-feat-denom {
          position: absolute;
          bottom: 14px;
          left: 14px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          z-index: 2;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }

        .ba-feat-sale {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #fff;
          color: #000;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 8px;
          z-index: 3;
        }

        .ba-feat-info {
          padding: 16px;
          border-top: 1px solid #1a1a1a;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ba-feat-name {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #fff;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ba-feat-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
        }

        .ba-feat-year { color: rgba(255,255,255,0.3); }

        .ba-feat-price {
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.02em;
        }

        @media (max-width: 900px) { .ba-feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .ba-feat-grid { grid-template-columns: repeat(2, 1fr); } }

        /* Light theme */
        [data-theme="light"] .ba-col-section,
        [data-theme="light"] .ba-banner-section,
        [data-theme="light"] .ba-feat-section {
          background: #f9f6f0;
        }
        [data-theme="light"] .ba-col-card,
        [data-theme="light"] .ba-feat-card { border-color: #e5e5e5; }
        [data-theme="light"] .ba-col-name,
        [data-theme="light"] .ba-sec-title,
        [data-theme="light"] .ba-feat-name,
        [data-theme="light"] .ba-feat-price,
        [data-theme="light"] .ba-banner-h2 { color: #111; }
        [data-theme="light"] .ba-feat-card { background: #f9f6f0; }
        [data-theme="light"] .ba-feat-card:hover { background: #f0ede6; }
        [data-theme="light"] .ba-feat-grid { background: #ddd; border-color: #ddd; }
        [data-theme="light"] .ba-feat-info { border-color: #e5e5e5; }
        [data-theme="light"] .ba-banner-right { background: #f0ede6; }
        [data-theme="light"] .ba-banner-inner { border-color: #ddd; }
        [data-theme="light"] .ba-banner-desc { color: rgba(0,0,0,0.55); }
        [data-theme="light"] .ba-banner-btn { border-color: rgba(0,0,0,0.5); color: #000; }
        [data-theme="light"] .ba-banner-btn:hover { background: #000; color: #fff; }
        [data-theme="light"] .ba-sec-viewall { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .ba-sec-viewall:hover { color: #000; }
      `}</style>
    </>
  );
}
