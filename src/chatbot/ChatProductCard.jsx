import { CONDITIONS, formatPrice, getRarityColor } from '../data/currencyData';

export default function ChatProductCard({ product, onProductClick }) {
  const cond = CONDITIONS[product.condition] || {};

  return (
    <>
      <div className="cb-prod" onClick={() => onProductClick?.(product)}>
        {product.image && (
          <div className="cb-prod-img">
            <img src={product.image} alt="" onError={e => { e.currentTarget.style.display = 'none'; }} />
          </div>
        )}
        <div className="cb-prod-body">
          <div className="cb-prod-name">{product.name}</div>
          <div className="cb-prod-meta">
            <span>{product.denomination}</span>
            <span>•</span>
            <span>{product.year}</span>
            {cond.label && (
              <>
                <span>•</span>
                <span style={{ color: cond.color }}>{cond.label}</span>
              </>
            )}
          </div>
          <div className="cb-prod-bottom">
            <span className="cb-prod-price">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="cb-prod-original">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="cb-prod-rarity" style={{ color: getRarityColor(product.rarity) }}>
              {product.rarity}
            </span>
          </div>
        </div>
        <div className="cb-prod-arrow">→</div>
      </div>

      <style>{`
        .cb-prod {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          margin-top: 8px;
          background: rgba(196, 150, 42, 0.06);
          border: 1px solid rgba(196, 150, 42, 0.15);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cb-prod:hover {
          background: rgba(196, 150, 42, 0.12);
          border-color: rgba(196, 150, 42, 0.3);
        }
        .cb-prod-img {
          width: 52px;
          height: 52px;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          background: #1a1a1a;
        }
        .cb-prod-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cb-prod-body {
          flex: 1;
          min-width: 0;
        }
        .cb-prod-name {
          font-family: 'Jost', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }
        .cb-prod-meta {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          margin-top: 2px;
        }
        .cb-prod-bottom {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 3px;
        }
        .cb-prod-price {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #c4962a;
        }
        .cb-prod-original {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          text-decoration: line-through;
        }
        .cb-prod-rarity {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 600;
          margin-left: auto;
        }
        .cb-prod-arrow {
          color: rgba(196, 150, 42, 0.5);
          font-size: 16px;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .cb-prod:hover .cb-prod-arrow {
          transform: translateX(3px);
          color: #c4962a;
        }

        [data-theme="light"] .cb-prod {
          background: rgba(196, 150, 42, 0.05);
          border-color: rgba(196, 150, 42, 0.15);
        }
        [data-theme="light"] .cb-prod:hover {
          background: rgba(196, 150, 42, 0.1);
        }
        [data-theme="light"] .cb-prod-img {
          background: #eee;
        }
        [data-theme="light"] .cb-prod-name {
          color: #111;
        }
        [data-theme="light"] .cb-prod-meta {
          color: rgba(0,0,0,0.45);
        }
        [data-theme="light"] .cb-prod-original {
          color: rgba(0,0,0,0.3);
        }
      `}</style>
    </>
  );
}
