import { useNav } from '../context/NavigationContext';
import { CONDITIONS, getRarityColor, formatPrice } from '../data/currencyData';

const NoteCard = ({ product, saved, onToggleSave }) => {
  const { navigate } = useNav();
  const cond = CONDITIONS[product.condition] || CONDITIONS.VF;

  return (
    <div className="nc-card">
      {/* Image side */}
      <div className="nc-img-side">
        {product.image ? (
          <img src={product.image} alt={product.name} className="nc-product-img"
            onError={e => { e.currentTarget.style.display = 'none'; }} />
        ) : (
          <div className="nc-img-placeholder" style={{ background: product.gradient || '#111' }}>
            <span className="nc-ph-denom">{product.denomination}</span>
          </div>
        )}
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

      {/* Info side */}
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
          display: flex;
          flex-direction: row;
        }
        .nc-card:hover {
          border-color: #333;
          background: #111;
        }

        .nc-img-side {
          position: relative;
          width: 180px;
          min-width: 180px;
          overflow: hidden;
          background: #111;
          flex-shrink: 0;
        }

        .nc-product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          min-height: 140px;
          transition: transform 0.6s ease;
        }
        .nc-card:hover .nc-product-img { transform: scale(1.05); }

        .nc-img-placeholder {
          width: 100%;
          height: 100%;
          min-height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nc-ph-denom {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
        }

        .nc-rarity-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          z-index: 3;
          font-size: 9px;
          font-weight: 600;
          padding: 2px 7px;
          background: #fff;
          color: #000;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .nc-save-btn {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.15);
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 13px;
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
          border-left: 1px solid #1a1a1a;
          flex: 1;
          justify-content: center;
          min-width: 0;
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

        @media (max-width: 480px) {
          .nc-img-side {
            width: 130px;
            min-width: 130px;
          }
          .nc-info { padding: 10px 12px; }
          .nc-name { font-size: 12px; }
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
