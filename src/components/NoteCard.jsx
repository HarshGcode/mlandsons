import { useNav } from '../context/NavigationContext';
import { CONDITIONS, getRarityColor, formatPrice } from '../data/currencyData';

const NoteCard = ({ product, saved, onToggleSave }) => {
  const { navigate } = useNav();
  const cond = CONDITIONS[product.condition] || CONDITIONS.VF;

  return (
    <div className="nc-card">
      {/* Note visual */}
      <div className="nc-note-visual" style={{ background: product.gradient || '#111' }}>
        {product.image && (
          <img
            src={product.image}
            alt=""
            className="nc-bg-img"
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
        )}
        <div className="nc-bg-overlay" />

        <div className="nc-note-top">
          <span className="nc-denom">{product.denomination}</span>
          <span className="nc-year">{product.year}</span>
        </div>
        <div className="nc-note-bottom">
          <span className="nc-serial">{product.serialNumber}</span>
        </div>

        {product.rarity && (
          <span className="nc-rarity-badge">{product.rarity}</span>
        )}

        <button
          className={`nc-save-btn ${saved ? 'saved' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleSave?.(product.id); }}
        >
          {saved ? '♥' : '♡'}
        </button>
      </div>

      {/* Info */}
      <div className="nc-info">
        <div className="nc-name">{product.name}</div>
        <div className="nc-meta">
          <span className="nc-cond" style={{ color: cond.color }}>● {cond.label}</span>
          <span className="nc-year-tag">{product.year}</span>
        </div>
        <div className="nc-price-row">
          <div>
            <div className="nc-price">{formatPrice(product.price)}</div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="nc-orig">{formatPrice(product.originalPrice)}</div>
            )}
          </div>
          <button className="nc-view-btn" onClick={() => navigate('product', product)}>
            View →
          </button>
        </div>
      </div>

      <style>{`
        .nc-card {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          overflow: hidden;
          transition: border-color 0.3s, background 0.2s;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
        }
        .nc-card:hover {
          border-color: #333;
          background: #111;
        }

        .nc-note-visual {
          position: relative;
          height: 160px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 12px 14px;
        }

        .nc-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          filter: brightness(0.55) saturate(0.7);
          transition: transform 0.6s ease;
          display: block;
        }
        .nc-card:hover .nc-bg-img { transform: scale(1.07); }

        .nc-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%);
          z-index: 1;
          pointer-events: none;
        }

        .nc-note-top, .nc-note-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .nc-denom {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        .nc-year {
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          font-weight: 400;
        }

        .nc-serial {
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          font-family: 'Courier New', monospace;
          letter-spacing: 0.08em;
        }

        .nc-rarity-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 3;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          background: #fff;
          color: #000;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .nc-save-btn {
          position: absolute;
          bottom: 10px;
          right: 12px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.15);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          transition: all 0.2s;
          z-index: 3;
        }
        .nc-save-btn:hover, .nc-save-btn.saved {
          background: rgba(239,68,68,0.3);
          border-color: rgba(239,68,68,0.5);
          color: #f87171;
        }

        .nc-info {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid #1a1a1a;
        }

        .nc-name {
          font-size: 13px;
          font-weight: 400;
          color: #fff;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nc-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .nc-cond {
          font-size: 11px;
          font-weight: 500;
        }

        .nc-year-tag {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
        }

        .nc-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }

        .nc-price {
          font-size: 15px;
          font-weight: 500;
          color: #fff;
        }

        .nc-orig {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          text-decoration: line-through;
        }

        .nc-view-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.6);
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 400;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.06em;
          transition: all 0.2s;
        }
        .nc-view-btn:hover {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        /* Light theme */
        [data-theme="light"] .nc-card { background: #f9f6f0; border-color: #e5e5e5; }
        [data-theme="light"] .nc-card:hover { background: #f0ede6; border-color: #ccc; }
        [data-theme="light"] .nc-info { border-color: #e5e5e5; }
        [data-theme="light"] .nc-name { color: #111; }
        [data-theme="light"] .nc-price { color: #111; }
        [data-theme="light"] .nc-year-tag { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .nc-view-btn { border-color: rgba(0,0,0,0.25); color: rgba(0,0,0,0.5); }
        [data-theme="light"] .nc-view-btn:hover { background: #000; color: #fff; border-color: #000; }
      `}</style>
    </div>
  );
};

export default NoteCard;
