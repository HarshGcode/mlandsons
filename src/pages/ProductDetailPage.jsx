import React, { useState } from 'react';
import { useNav } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import NoteCard from '../components/NoteCard';
import { CONDITIONS, formatPrice, getRarityColor } from '../data/currencyData';

/* ---- sub-components ---- */

function StarRating({ rating = 4.5 }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span style={{ fontSize: 16, letterSpacing: 2 }}>
      {'★'.repeat(full)}
      {half && <span style={{ opacity: 0.5 }}>★</span>}
      <span style={{ opacity: 0.2 }}>{'★'.repeat(empty)}</span>
    </span>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="pdp-accordion">
      <button className="pdp-acc-btn" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <span style={{ transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
      </button>
      {open && (
        <div className="pdp-acc-body">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const { navigate, pageData } = useNav();
  const { products } = useData();
  const product = pageData;
  const [wishlistAdded, setWishlistAdded] = useState(false);

  /* ---- Not-found guard ---- */
  if (!product) {
    return (
      <div className="pdp-notfound">
        <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>📄</div>
        <h2 className="pdp-notfound-h2">Product not found</h2>
        <p className="pdp-notfound-p">The item you are looking for does not exist.</p>
        <button className="pdp-notfound-btn" onClick={() => navigate('collections')}>
          Browse Collections →
        </button>
      </div>
    );
  }

  /* ---- Derived data ---- */
  const condition   = CONDITIONS?.[product.condition] || {};
  const rarityColor = getRarityColor(product.rarity);
  const related     = products.filter(p => p.category === product.category && p.id !== product.id).slice(0,3);
  const whatsappMsg = encodeURIComponent(
    `Hello! I am interested in purchasing: ${product.name} (Serial: ${product.serialNumber || 'N/A'}). Please share details.`
  );
  const whatsappURL = `https://wa.me/917453957724?text=${whatsappMsg}`;

  const shareText = product.coordinates
    ? `Location: ${product.coordinates}`
    : `Note: ${product.name} | Year: ${product.year} | Serial: ${product.serialNumber}`;

  const noteGradient = product.gradient || 'linear-gradient(135deg,#1a3a2a,#0d2016)';

  return (
    <>
      <div className="pdp-root">

        {/* Breadcrumb */}
        <div className="pdp-breadcrumb">
          <button className="pdp-bc-link" onClick={() => navigate('home')}>Home</button>
          <span className="pdp-bc-sep">›</span>
          <button className="pdp-bc-link" onClick={() => navigate('collections')}>Collections</button>
          <span className="pdp-bc-sep">›</span>
          <span className="pdp-bc-current">{product.name}</span>
        </div>

        {/* Two-column layout */}
        <div className="pdp-layout">

          {/* LEFT: Note Visual */}
          <div className="pdp-left">
            <div className="pdp-note-card">
              <div className="pdp-note-body" style={{ background: noteGradient }}>
                {/* Header */}
                <div className="pdp-note-header">
                  <div>
                    <p className="pdp-note-label">Government of India</p>
                    <p className="pdp-note-label" style={{ opacity: 0.5 }}>Reserve Bank of India</p>
                  </div>
                  <div className="pdp-note-year">{product.year || 'N/A'}</div>
                </div>

                {/* Denomination */}
                <div className="pdp-note-denom">
                  <div className="pdp-note-denom-value">
                    {product.denomination || product.name?.split(' ')[0]}
                  </div>
                  <div className="pdp-note-denom-cat">
                    {product.category || 'Currency'}
                  </div>
                </div>

                {/* Serial */}
                <div className="pdp-note-serial-row">
                  <span className="pdp-note-serial">{product.serialNumber || 'XX-000000'}</span>
                  <span className="pdp-note-serial">{product.serialNumber || 'XX-000000'}</span>
                </div>
              </div>

              {/* Note footer */}
              <div className="pdp-note-footer">
                <span>CONDITION: {product.condition?.toUpperCase() || 'UNKNOWN'}</span>
                <span style={{ color: rarityColor, fontWeight: 600 }}>
                  {product.rarity?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="pdp-right">

            {/* Category + Rarity badges */}
            <div className="pdp-badges">
              <span className="pdp-badge">{product.category || 'Uncategorised'}</span>
              <span className="pdp-badge" style={{ color: rarityColor, borderColor: rarityColor + '40' }}>
                {product.rarity}
              </span>
            </div>

            {/* Product name */}
            <h1 className="pdp-name">{product.name}</h1>

            {/* Star rating */}
            <div className="pdp-rating">
              <span style={{ color: '#fff' }}><StarRating rating={4.5} /></span>
              <span className="pdp-rating-text">4.5 / 5.0 — Verified Authentic</span>
            </div>

            {/* Price */}
            <div className="pdp-price-row">
              <span className="pdp-price">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice !== product.price && (
                <span className="pdp-orig-price">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Serial number box */}
            <div className="pdp-serial-box">
              <span className="pdp-serial-label">SERIAL No.</span>
              <span className="pdp-serial-value">{product.serialNumber || 'N/A'}</span>
            </div>

            {/* Condition */}
            <div className="pdp-condition-row">
              <span className="pdp-cond-label">CONDITION</span>
              <span className="pdp-cond-badge" style={{
                color: condition.color || '#fff',
                borderColor: (condition.color || 'rgba(255,255,255,0.3)') + '40',
              }}>{product.condition || 'Unknown'}</span>
            </div>

            {/* Key details grid */}
            <div className="pdp-details-grid">
              {[
                { label: 'Year',         value: product.year || 'N/A' },
                { label: 'Denomination', value: product.denomination || 'N/A' },
                { label: 'Condition',    value: product.condition || 'N/A' },
                { label: 'Category',     value: product.category || 'N/A' },
              ].map(item => (
                <div key={item.label} className="pdp-detail-cell">
                  <div className="pdp-detail-label">{item.label.toUpperCase()}</div>
                  <div className="pdp-detail-value">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            {product.description && (
              <div className="pdp-desc-box">
                <h3 className="pdp-desc-title">DESCRIPTION</h3>
                <p className="pdp-desc-text">{product.description}</p>
              </div>
            )}

            {/* Accordions */}
            <Accordion title="Historical Information" defaultOpen={false}>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.7 }}>
                {product.historicalInfo ||
                  `This ${product.category || 'currency'} item from ${product.year || 'an earlier era'} represents` +
                  ` a significant period in Indian monetary history. Items of this rarity and condition are` +
                  ` highly sought after by serious collectors and numismatists worldwide.`}
              </p>
            </Accordion>

            <Accordion title="Grading and Authenticity Details" defaultOpen={false}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { label: 'Grade',       value: product.grade || product.condition || 'Ungraded' },
                  { label: 'Graded By',   value: product.gradedBy || 'Expert Panel' },
                  { label: 'Provenance',  value: product.provenance || 'Private Collection' },
                  { label: 'Watermark',   value: product.watermark || 'Present & Intact' },
                ].map(d => (
                  <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)' }}>{d.label}:</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </Accordion>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="pdp-tags-section">
                <div className="pdp-tags-label">TAGS</div>
                <div className="pdp-tags-list">
                  {product.tags.map(tag => (
                    <span key={tag} className="pdp-tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pdp-actions">
              <button className="pdp-wishlist-btn" onClick={() => setWishlistAdded(w => !w)}
                style={wishlistAdded ? { background: 'rgba(255,255,255,0.06)' } : {}}>
                <span>{wishlistAdded ? '♥' : '♡'}</span>
                {wishlistAdded ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <a className="pdp-whatsapp-btn" href={whatsappURL} target="_blank" rel="noopener noreferrer">
                💬 Contact to Purchase
              </a>
            </div>

            {/* Authenticity Badge */}
            <div className="pdp-auth-badge">
              <span style={{ fontSize: 22 }}>✓</span>
              <div>
                <div className="pdp-auth-title">100% Authenticity Guaranteed</div>
                <div className="pdp-auth-desc">Every item is verified by certified numismatic experts before listing.</div>
              </div>
            </div>

            {/* Share / Note */}
            <div className="pdp-share-box">
              <span className="pdp-share-label">NOTE — </span>
              {shareText}
            </div>
          </div>
        </div>

        {/* Related Items */}
        {related.length > 0 && (
          <div className="pdp-related">
            <div className="pdp-related-header">
              <h2 className="pdp-related-title">Related Items</h2>
              <div className="pdp-related-line" />
              <button className="pdp-related-btn" onClick={() => navigate('collections')}>
                View All ›
              </button>
            </div>
            <div className="pdp-related-grid">
              {related.map(item => (
                <NoteCard
                  key={item.id}
                  product={item}
                  onClick={() => navigate('product', item)}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      <style>{`
        .pdp-root {
          font-family: 'Jost', sans-serif;
          padding: 0 0 80px;
        }

        .pdp-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
        }

        .pdp-bc-link {
          background: none;
          border: none;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          font-size: 12px;
          font-family: 'Jost', sans-serif;
          padding: 0;
          transition: color 0.2s;
        }
        .pdp-bc-link:hover { color: #fff; }

        .pdp-bc-sep { color: rgba(255,255,255,0.15); font-size: 12px; }
        .pdp-bc-current { color: rgba(255,255,255,0.6); font-size: 12px; }

        .pdp-layout {
          display: flex;
          gap: 48px;
          align-items: flex-start;
        }

        .pdp-left {
          flex: 0 0 55%;
          max-width: 55%;
          position: sticky;
          top: 80px;
        }

        .pdp-right {
          flex: 1;
          min-width: 0;
        }

        /* Note Visual */
        .pdp-note-card {
          border: 1px solid #1a1a1a;
          overflow: hidden;
        }

        .pdp-note-body {
          padding: 32px 28px;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .pdp-note-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .pdp-note-label {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 2px;
          font-family: 'Jost', sans-serif;
          margin: 0 0 2px;
          text-transform: uppercase;
        }

        .pdp-note-year {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          font-family: 'Jost', sans-serif;
        }

        .pdp-note-denom {
          text-align: center;
          margin: 20px 0;
        }

        .pdp-note-denom-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 64px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          line-height: 1;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }

        .pdp-note-denom-cat {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 3px;
          font-family: 'Jost', sans-serif;
          margin-top: 6px;
          text-transform: uppercase;
        }

        .pdp-note-serial-row {
          display: flex;
          justify-content: space-between;
        }

        .pdp-note-serial {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.55);
          letter-spacing: 2px;
          background: rgba(0,0,0,0.25);
          padding: 3px 8px;
        }

        .pdp-note-footer {
          background: rgba(0,0,0,0.4);
          padding: 12px 28px;
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        /* Right Column */
        .pdp-badges {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .pdp-badge {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 4px 12px;
          font-weight: 500;
        }

        .pdp-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          line-height: 1.25;
          margin: 0 0 12px;
        }

        .pdp-rating {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .pdp-rating-text {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
        }

        .pdp-price-row {
          margin-bottom: 20px;
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .pdp-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 700;
          color: #fff;
        }

        .pdp-orig-price {
          font-size: 16px;
          color: rgba(255,255,255,0.25);
          text-decoration: line-through;
        }

        .pdp-serial-box {
          border: 1px solid #1a1a1a;
          padding: 12px 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pdp-serial-label {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          font-weight: 500;
          letter-spacing: 1px;
        }

        .pdp-serial-value {
          font-family: 'Courier New', monospace;
          font-size: 15px;
          color: #fff;
          letter-spacing: 3px;
          font-weight: 600;
        }

        .pdp-condition-row {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pdp-cond-label {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 1px;
        }

        .pdp-cond-badge {
          display: inline-block;
          padding: 4px 14px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .pdp-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
          margin-bottom: 20px;
        }

        .pdp-detail-cell {
          background: #0a0a0a;
          padding: 14px 16px;
        }

        .pdp-detail-label {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .pdp-detail-value {
          font-size: 14px;
          color: #fff;
          font-weight: 500;
        }

        .pdp-desc-box {
          border: 1px solid #1a1a1a;
          padding: 20px;
          margin-bottom: 16px;
        }

        .pdp-desc-title {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 2px;
          margin: 0 0 10px;
          font-weight: 500;
          font-family: 'Jost', sans-serif;
        }

        .pdp-desc-text {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          line-height: 1.8;
          margin: 0;
        }

        /* Accordion */
        .pdp-accordion {
          border: 1px solid #1a1a1a;
          margin-bottom: 10px;
          overflow: hidden;
        }

        .pdp-acc-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          text-align: left;
        }
        .pdp-acc-btn:hover { background: rgba(255,255,255,0.02); }

        .pdp-acc-body {
          padding: 14px 18px 18px;
          border-top: 1px solid #1a1a1a;
        }

        /* Tags */
        .pdp-tags-section { margin-bottom: 20px; }
        .pdp-tags-label {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 1px;
          margin-bottom: 8px;
          font-weight: 500;
        }
        .pdp-tags-list { display: flex; gap: 6px; flex-wrap: wrap; }
        .pdp-tag {
          font-size: 11px;
          padding: 3px 10px;
          border: 1px solid #1a1a1a;
          color: rgba(255,255,255,0.4);
        }

        /* Actions */
        .pdp-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .pdp-wishlist-btn {
          flex: 1;
          min-width: 140px;
          padding: 13px 20px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          font-family: 'Jost', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .pdp-wishlist-btn:hover {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }

        .pdp-whatsapp-btn {
          flex: 1;
          min-width: 140px;
          padding: 13px 20px;
          background: #25D366;
          border: none;
          color: #fff;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Jost', sans-serif;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s;
        }
        .pdp-whatsapp-btn:hover { opacity: 0.9; }

        /* Authenticity Badge */
        .pdp-auth-badge {
          border: 1px solid #1a1a1a;
          padding: 14px 18px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .pdp-auth-title {
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 2px;
        }

        .pdp-auth-desc {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
        }

        /* Share */
        .pdp-share-box {
          border: 1px solid #1a1a1a;
          padding: 12px 16px;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          font-family: 'Courier New', monospace;
        }

        .pdp-share-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
        }

        /* Related */
        .pdp-related { margin-top: 64px; }

        .pdp-related-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .pdp-related-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          margin: 0;
          white-space: nowrap;
        }

        .pdp-related-line {
          flex: 1;
          height: 1px;
          background: #1a1a1a;
        }

        .pdp-related-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          padding: 6px 14px;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .pdp-related-btn:hover {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }

        .pdp-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* Not found */
        .pdp-notfound {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Jost', sans-serif;
          color: #fff;
        }

        .pdp-notfound-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          margin: 0 0 12px;
        }

        .pdp-notfound-p {
          color: rgba(255,255,255,0.4);
          margin: 0 0 24px;
          font-size: 14px;
        }

        .pdp-notfound-btn {
          padding: 12px 28px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          color: #fff;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          transition: all 0.2s;
        }
        .pdp-notfound-btn:hover {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .pdp-layout { flex-direction: column; }
          .pdp-left { max-width: 100%; flex: none; position: static; }
        }
        @media (max-width: 700px) {
          .pdp-related-grid { grid-template-columns: 1fr; }
        }

        /* Light theme */
        [data-theme="light"] .pdp-breadcrumb .pdp-bc-link { color: rgba(0,0,0,0.35); }
        [data-theme="light"] .pdp-breadcrumb .pdp-bc-link:hover { color: #111; }
        [data-theme="light"] .pdp-bc-sep { color: rgba(0,0,0,0.15); }
        [data-theme="light"] .pdp-bc-current { color: rgba(0,0,0,0.6); }
        [data-theme="light"] .pdp-note-card { border-color: #e5e5e5; }
        [data-theme="light"] .pdp-note-footer { background: rgba(0,0,0,0.05); color: rgba(0,0,0,0.4); }
        [data-theme="light"] .pdp-badge { color: rgba(0,0,0,0.5); border-color: rgba(0,0,0,0.15); }
        [data-theme="light"] .pdp-name { color: #111; }
        [data-theme="light"] .pdp-rating-text { color: rgba(0,0,0,0.35); }
        [data-theme="light"] .pdp-price { color: #111; }
        [data-theme="light"] .pdp-orig-price { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .pdp-serial-box { border-color: #e5e5e5; }
        [data-theme="light"] .pdp-serial-label { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .pdp-serial-value { color: #111; }
        [data-theme="light"] .pdp-cond-label { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .pdp-details-grid { background: #e5e5e5; border-color: #e5e5e5; }
        [data-theme="light"] .pdp-detail-cell { background: #f9f6f0; }
        [data-theme="light"] .pdp-detail-label { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .pdp-detail-value { color: #111; }
        [data-theme="light"] .pdp-desc-box { border-color: #e5e5e5; }
        [data-theme="light"] .pdp-desc-title { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .pdp-desc-text { color: rgba(0,0,0,0.55); }
        [data-theme="light"] .pdp-accordion { border-color: #e5e5e5; }
        [data-theme="light"] .pdp-acc-btn { color: #111; }
        [data-theme="light"] .pdp-acc-body { border-top-color: #e5e5e5; }
        [data-theme="light"] .pdp-tag { border-color: #e5e5e5; color: rgba(0,0,0,0.4); }
        [data-theme="light"] .pdp-wishlist-btn { border-color: rgba(0,0,0,0.2); color: rgba(0,0,0,0.6); }
        [data-theme="light"] .pdp-wishlist-btn:hover { border-color: rgba(0,0,0,0.5); color: #111; }
        [data-theme="light"] .pdp-auth-badge { border-color: #e5e5e5; }
        [data-theme="light"] .pdp-auth-title { color: #111; }
        [data-theme="light"] .pdp-auth-desc { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .pdp-share-box { border-color: #e5e5e5; color: rgba(0,0,0,0.3); }
        [data-theme="light"] .pdp-share-label { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .pdp-related-title { color: #111; }
        [data-theme="light"] .pdp-related-line { background: #e5e5e5; }
        [data-theme="light"] .pdp-related-btn { border-color: rgba(0,0,0,0.2); color: rgba(0,0,0,0.5); }
        [data-theme="light"] .pdp-related-btn:hover { border-color: rgba(0,0,0,0.5); color: #111; }
      `}</style>
    </>
  );
}
