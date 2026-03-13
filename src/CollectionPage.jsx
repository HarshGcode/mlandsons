import React, { useState, useEffect, useRef } from "react";
import { Search, X, Star, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const products = [
  { id: 1, name: "1947 Independence Note", category: "currency", price: "₹12,500", rating: 5, image: "https://images.unsplash.com/photo-1610375461246-83df859d849d", tag: "Rare", featured: true },
  { id: 2, name: "Ashoka Pillar Coin Set", category: "coins", price: "₹8,900", rating: 5, image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad", tag: "Popular" },
  { id: 3, name: "Wedding Date Note 2024", category: "special", price: "₹2,500", rating: 5, image: "https://images.unsplash.com/photo-1633769573304-90d2d44eef0c", tag: "Gift Favorite" },
  { id: 4, name: "British India Rupee 1920", category: "coins", price: "₹15,000", rating: 5, image: "https://images.unsplash.com/photo-1620229645651-95439f74fdb9", tag: "Rare", featured: true },
  { id: 5, name: "₹1 Gandhi Series", category: "currency", price: "₹1,200", rating: 4, image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5", tag: "Authentic" },
  { id: 6, name: "Birthday Note Collection", category: "special", price: "₹3,500", rating: 5, image: "https://images.unsplash.com/photo-1727170234195-7b65679d7d12", tag: "Popular" },
  { id: 7, name: "Mughal Era Gold Coin", category: "coins", price: "₹45,000", rating: 5, image: "https://images.unsplash.com/photo-1610375461246-83df859d849d", tag: "Premium", featured: true },
  { id: 8, name: "₹500 Old Series", category: "currency", price: "₹4,200", rating: 4, image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad", tag: "Collectible" },
  { id: 9, name: "Anniversary Date Set", category: "special", price: "₹2,800", rating: 5, image: "https://images.unsplash.com/photo-1633769573304-90d2d44eef0c", tag: "Gift Favorite" },
];

const categories = [
  { id: "all",      label: "All Items",      count: 9 },
  { id: "currency", label: "Currency Notes", count: 3 },
  { id: "coins",    label: "Antique Coins",  count: 3 },
  { id: "special",  label: "Special Dates",  count: 3 },
];

const CollectionPage = ({ onBackToHome }) => {
  const [visible, setVisible]               = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery]       = useState("");
  const [mousePos, setMousePos]             = useState({ x: 50, y: 50 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const filtered = products.filter((p) => {
    const matchCat    = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* ── Site Header (nav + theme toggle) ── */}
      <Header />

      <div
        ref={sectionRef}
        className={`cp-root ${visible ? "cp-visible" : ""}`}
        style={{ "--mx": `${mousePos.x}%`, "--my": `${mousePos.y}%` }}
      >
        {/* Decorative BG layers */}
        <div className="cp-orb cp-orb-1" />
        <div className="cp-orb cp-orb-2" />
        <div className="cp-grid-bg" />
        <div className="cp-cursor-glow" />

        <div className="cp-inner">

          {/* ═══════════════════════════════════
              PAGE HERO — centered title block
              ═══════════════════════════════════ */}
          <div className="cp-hero cp-reveal" style={{ "--i": 0 }}>
            {onBackToHome && (
              <button className="cp-back" onClick={onBackToHome}>
                <ArrowLeft size={15} />
                <span>Back to Home</span>
              </button>
            )}

            <div className="cp-hero-text">
              <div className="cp-badge">
                <Sparkles size={12} className="cp-spark" />
                <span>Exclusive Collection</span>
              </div>
              <h1 className="cp-h1">
                Explore Our
                <span className="cp-gradient"> Premium Collection</span>
              </h1>
              <p className="cp-sub">
                Handpicked antique currency &amp; rare collectibles — verified authentic
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════
              CONTROLS — search + category tabs
              ═══════════════════════════════════ */}
          <div className="cp-controls cp-reveal" style={{ "--i": 1 }}>

            {/* Full-width search */}
            <div className="cp-search-wrap">
              <Search size={16} className="cp-search-icon" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cp-search-input"
              />
              {searchQuery && (
                <button className="cp-search-clear" onClick={() => setSearchQuery("")}>
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Category pill tabs — centered row */}
            <div className="cp-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`cp-tab ${activeCategory === cat.id ? "cp-tab-active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="cp-tab-count">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Result label */}
            <p className="cp-result-count">
              Showing <strong>{filtered.length}</strong> item{filtered.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {/* ═══════════════════════════════════
              PRODUCT GRID
              ═══════════════════════════════════ */}
          <div className="cp-grid">
            {filtered.length === 0 ? (
              <div className="cp-empty">
                <Search size={40} className="cp-empty-icon" />
                <p>No items found. Try a different search or category.</p>
              </div>
            ) : (
              filtered.map((product, i) => (
                <div
                  key={product.id}
                  className="cp-card cp-reveal"
                  style={{ "--i": i + 2 }}
                >
                  <div className="cp-card-img">
                    <img src={product.image} alt={product.name} />
                    <div className="cp-img-overlay" />
                    <div className="cp-img-shine" />
                    {product.tag && <span className="cp-tag">{product.tag}</span>}
                    {product.featured && (
                      <span className="cp-featured">
                        <Star size={10} fill="currentColor" /> Featured
                      </span>
                    )}
                  </div>

                  <div className="cp-card-body">
                    <div className="cp-stars">
                      {[...Array(product.rating)].map((_, idx) => (
                        <Star key={idx} size={11} className="cp-star" />
                      ))}
                    </div>
                    <h3 className="cp-prod-name">{product.name}</h3>
                    <div className="cp-card-footer">
                      <span className="cp-price">{product.price}</span>
                      <button className="cp-details-btn">
                        Details <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="cp-card-line" />
                </div>
              ))
            )}
          </div>

          {/* ═══════════════════════════════════
              CTA BANNER
              ═══════════════════════════════════ */}
          <div className="cp-cta-banner cp-reveal" style={{ "--i": 12 }}>
            <div className="cp-cta-glow cp-cta-glow-l" />
            <div className="cp-cta-glow cp-cta-glow-r" />
            <div className="cp-cta-inner">
              <div className="cp-cta-icon"><Sparkles size={22} /></div>
              <div className="cp-cta-text">
                <h3 className="cp-cta-title">Can't Find What You're Looking For?</h3>
                <p className="cp-cta-desc">We can source rare items specifically for your collection</p>
              </div>
              <button className="cp-cta-btn" onClick={() => onBackToHome("contact")}>
                Request Custom Item <ArrowRight size={15} />
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');

        /* ── Root ── */
        .cp-root {
          position: relative;
          min-height: 100vh;
          background: #080a0f;
          font-family: 'Sora', sans-serif;
          padding-top: 88px;
          overflow: hidden;
        }

        /* ── Decorative BG ── */
        .cp-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
        }
        .cp-orb-1 {
          width: 700px; height: 700px;
          top: -180px; right: -120px;
          background: radial-gradient(circle, rgba(196,150,40,0.07) 0%, transparent 70%);
          animation: cp-drift 16s ease-in-out infinite alternate;
        }
        .cp-orb-2 {
          width: 500px; height: 500px;
          bottom: -100px; left: -100px;
          background: radial-gradient(circle, rgba(120,80,20,0.06) 0%, transparent 70%);
          animation: cp-drift 20s ease-in-out infinite alternate-reverse;
        }
        @keyframes cp-drift {
          from { transform: translate(0,0); }
          to   { transform: translate(28px,18px); }
        }

        .cp-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(196,150,40,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,150,40,0.03) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 35%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .cp-cursor-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            550px circle at var(--mx, 50%) var(--my, 50%),
            rgba(196,150,40,0.06) 0%,
            transparent 65%
          );
          transition: background 0.15s ease;
          filter: blur(20px);
        }

        /* ── Inner container ── */
        .cp-inner {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px 100px;
        }

        /* ── Reveal animation ── */
        .cp-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s ease calc(var(--i, 0) * 75ms),
            transform 0.6s ease calc(var(--i, 0) * 75ms);
        }
        .cp-visible .cp-reveal {
          opacity: 1;
          transform: none;
        }

        /* ═══════════════════════
           PAGE HERO
           ═══════════════════════ */
        .cp-hero {
          padding: 60px 0 44px;
          position: relative;
        }

        .cp-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: rgba(210,205,195,0.82);
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 36px;
          transition: all 0.3s;
        }
        .cp-back:hover {
          background: rgba(196,150,40,0.1);
          border-color: rgba(196,150,40,0.35);
          color: #f5d36b;
          transform: translateX(-3px);
        }

        /* Centered title block */
        .cp-hero-text {
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
        }

        .cp-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 18px;
          background: rgba(196,150,40,0.1);
          border: 1.5px solid rgba(196,150,40,0.28);
          border-radius: 100px;
          color: rgba(245,211,107,0.9);
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 22px;
        }
        .cp-spark {
          color: #f5d36b;
          animation: cp-spin 6s linear infinite;
        }
        @keyframes cp-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .cp-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(38px, 5vw, 58px);
          font-weight: 700;
          color: #f0ead6;
          line-height: 1.12;
          letter-spacing: -0.01em;
          margin-bottom: 18px;
        }
        .cp-gradient {
          background: linear-gradient(135deg, #f5d36b 0%, #c4962a 45%, #e8b84b 80%, #f5d36b 100%);
          background-size: 250% 250%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cp-grad 6s ease infinite;
        }
        @keyframes cp-grad {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        .cp-sub {
          font-size: 16px;
          color: rgba(185,180,170,0.72);
          line-height: 1.75;
        }

        /* ═══════════════════════
           CONTROLS
           ═══════════════════════ */
        .cp-controls { margin-bottom: 52px; }

        /* Search — centred, max-width */
        .cp-search-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 0 18px;
          max-width: 600px;
          margin: 0 auto 24px;
          transition: all 0.3s;
        }
        .cp-search-wrap:focus-within {
          background: rgba(255,255,255,0.06);
          border-color: rgba(196,150,40,0.45);
          box-shadow: 0 0 24px rgba(196,150,40,0.12);
        }
        .cp-search-icon { color: rgba(196,150,40,0.55); flex-shrink: 0; }
        .cp-search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: #f0ead6;
          font-family: 'Sora', sans-serif;
          font-size: 14.5px;
          padding: 14px 4px;
        }
        .cp-search-input::placeholder { color: rgba(180,175,165,0.45); }
        .cp-search-clear {
          background: rgba(196,150,40,0.12);
          border: none;
          border-radius: 6px;
          width: 26px; height: 26px;
          display: grid;
          place-items: center;
          cursor: pointer;
          color: rgba(196,150,40,0.75);
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .cp-search-clear:hover { background: rgba(196,150,40,0.22); color: #f5d36b; }

        /* Category tabs — single centred pill row */
        .cp-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .cp-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          background: rgba(255,255,255,0.03);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 100px;
          color: rgba(195,190,180,0.72);
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .cp-tab:hover {
          background: rgba(196,150,40,0.08);
          border-color: rgba(196,150,40,0.28);
          color: #f5d36b;
          transform: translateY(-1px);
        }
        .cp-tab-active {
          background: rgba(196,150,40,0.14);
          border-color: rgba(196,150,40,0.5);
          color: #f5d36b;
          box-shadow: 0 2px 18px rgba(196,150,40,0.18);
        }
        .cp-tab-active:hover { transform: none; }
        .cp-tab-count {
          font-size: 11.5px;
          padding: 2px 9px;
          background: rgba(196,150,40,0.14);
          border-radius: 100px;
          color: rgba(196,150,40,0.8);
        }
        .cp-tab-active .cp-tab-count {
          background: rgba(196,150,40,0.28);
          color: #f5d36b;
        }

        .cp-result-count {
          text-align: center;
          font-size: 13px;
          color: rgba(160,155,145,0.6);
          letter-spacing: 0.02em;
        }
        .cp-result-count strong { color: rgba(196,150,40,0.85); }

        /* ═══════════════════════
           PRODUCT GRID
           ═══════════════════════ */
        .cp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }

        .cp-empty {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 80px 24px;
          color: rgba(180,175,165,0.5);
          font-size: 15px;
        }
        .cp-empty-icon { color: rgba(196,150,40,0.3); }

        /* ── Card ── */
        .cp-card {
          position: relative;
          background: rgba(14,11,7,0.92);
          border: 1.5px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .cp-card:hover {
          transform: translateY(-7px);
          border-color: rgba(196,150,40,0.32);
          box-shadow:
            0 24px 60px rgba(0,0,0,0.55),
            0 0 0 1px rgba(196,150,40,0.1),
            0 0 40px rgba(196,150,40,0.09);
        }

        .cp-card-img {
          position: relative;
          height: 230px;
          overflow: hidden;
        }
        .cp-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .cp-card:hover .cp-card-img img { transform: scale(1.07); }

        .cp-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 45%, rgba(8,10,15,0.65) 100%);
          pointer-events: none;
        }
        .cp-img-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(130deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
          transform: translateX(-100%);
          pointer-events: none;
        }
        .cp-card:hover .cp-img-shine {
          transform: translateX(100%);
          transition: transform 0.8s ease;
        }

        .cp-tag {
          position: absolute;
          top: 13px; left: 13px;
          padding: 5px 12px;
          background: rgba(8,10,15,0.82);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(196,150,40,0.3);
          border-radius: 100px;
          font-size: 10.5px;
          font-weight: 600;
          color: #f5d36b;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .cp-featured {
          position: absolute;
          top: 13px; right: 13px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          background: rgba(196,150,40,0.18);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(196,150,40,0.38);
          border-radius: 100px;
          font-size: 10px;
          font-weight: 600;
          color: #f5d36b;
        }

        .cp-card-body { padding: 20px 22px 22px; }
        .cp-stars { display: flex; gap: 3px; margin-bottom: 10px; }
        .cp-star { color: #c4962a; fill: #c4962a; }

        .cp-prod-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #f0ead6;
          margin-bottom: 18px;
          line-height: 1.35;
        }

        .cp-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .cp-price {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #f5d36b, #c4962a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cp-details-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(196,150,40,0.12);
          border: 1px solid rgba(196,150,40,0.28);
          border-radius: 10px;
          color: #f5d36b;
          font-family: 'Sora', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .cp-details-btn:hover {
          background: rgba(196,150,40,0.2);
          border-color: rgba(196,150,40,0.5);
          box-shadow: 0 0 14px rgba(196,150,40,0.2);
        }

        .cp-card-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(196,150,40,0.5), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .cp-card:hover .cp-card-line { opacity: 1; }

        /* ═══════════════════════
           CTA BANNER
           ═══════════════════════ */
        .cp-cta-banner {
          position: relative;
          background: rgba(12,9,5,0.92);
          border: 1.5px solid rgba(196,150,40,0.22);
          border-radius: 24px;
          padding: 40px;
          overflow: hidden;
          transition: all 0.4s;
        }
        .cp-cta-banner:hover {
          border-color: rgba(196,150,40,0.4);
          box-shadow: 0 0 50px rgba(196,150,40,0.09);
        }
        .cp-cta-glow {
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
        }
        .cp-cta-glow-l { top: -80px; left: -80px; background: radial-gradient(circle, rgba(196,150,40,0.12) 0%, transparent 70%); }
        .cp-cta-glow-r { bottom: -80px; right: -80px; background: radial-gradient(circle, rgba(140,100,20,0.09) 0%, transparent 70%); }

        .cp-cta-inner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .cp-cta-icon {
          width: 56px; height: 56px;
          background: rgba(196,150,40,0.14);
          border: 1.5px solid rgba(196,150,40,0.3);
          border-radius: 16px;
          display: grid;
          place-items: center;
          color: #f5d36b;
          flex-shrink: 0;
        }
        .cp-cta-text { flex: 1; }
        .cp-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #f0ead6;
          margin-bottom: 6px;
          line-height: 1.3;
        }
        .cp-cta-desc { font-size: 14px; color: rgba(180,175,165,0.68); }
        .cp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #c4962a, #f5d36b, #c4962a);
          background-size: 200% 200%;
          border: none;
          border-radius: 14px;
          color: #0d0a04;
          font-family: 'Sora', sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.4s;
        }
        .cp-cta-btn:hover {
          background-position: right center;
          box-shadow: 0 0 30px rgba(196,150,40,0.45), 0 8px 20px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }

        /* ═══════════════════════
           LIGHT THEME
           ═══════════════════════ */
        [data-theme="light"] .cp-root       { background: #fdf6e8; }
        [data-theme="light"] .cp-h1         { color: #1a0d00; }
        [data-theme="light"] .cp-sub        { color: rgba(80,50,8,0.7); }
        [data-theme="light"] .cp-back       { background: rgba(196,150,40,0.07); border-color: rgba(196,150,40,0.2); color: rgba(80,50,8,0.75); }
        [data-theme="light"] .cp-back:hover { background: rgba(196,150,40,0.14); border-color: rgba(196,150,40,0.4); color: #8b5e10; transform: translateX(-3px); }

        [data-theme="light"] .cp-search-wrap               { background: rgba(253,246,232,0.9); border-color: rgba(196,150,40,0.2); }
        [data-theme="light"] .cp-search-wrap:focus-within  { border-color: rgba(196,150,40,0.5); box-shadow: 0 0 20px rgba(196,150,40,0.1); }
        [data-theme="light"] .cp-search-input              { color: #1a0d00; }
        [data-theme="light"] .cp-search-input::placeholder { color: rgba(120,80,15,0.4); }

        [data-theme="light"] .cp-tab        { background: rgba(196,150,40,0.06); border-color: rgba(196,150,40,0.16); color: rgba(80,50,8,0.7); }
        [data-theme="light"] .cp-tab:hover  { background: rgba(196,150,40,0.12); border-color: rgba(196,150,40,0.32); color: #8b5e10; }
        [data-theme="light"] .cp-tab-active { background: rgba(196,150,40,0.16); border-color: rgba(196,150,40,0.5); color: #8b5e10; box-shadow: 0 2px 16px rgba(196,150,40,0.14); }

        [data-theme="light"] .cp-card       { background: rgba(255,252,245,0.97); border-color: rgba(196,150,40,0.15); }
        [data-theme="light"] .cp-card:hover { border-color: rgba(196,150,40,0.38); box-shadow: 0 16px 48px rgba(100,65,5,0.12), 0 0 0 1px rgba(196,150,40,0.1); }
        [data-theme="light"] .cp-prod-name  { color: #1a0d00; }
        [data-theme="light"] .cp-tag        { background: rgba(253,246,232,0.92); color: #8b5e10; }

        [data-theme="light"] .cp-cta-banner { background: rgba(255,248,230,0.97); border-color: rgba(196,150,40,0.25); }
        [data-theme="light"] .cp-cta-title  { color: #1a0d00; }
        [data-theme="light"] .cp-cta-desc   { color: rgba(80,50,8,0.68); }

        /* ═══════════════════════
           RESPONSIVE
           ═══════════════════════ */
        @media (max-width: 1024px) {
          .cp-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .cp-root { padding-top: 80px; }
          .cp-hero { padding: 44px 0 32px; }
          .cp-h1 { font-size: clamp(30px, 7vw, 44px); }
          .cp-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
          .cp-cta-inner { flex-direction: column; align-items: flex-start; }
          .cp-cta-btn { width: 100%; justify-content: center; }
        }

        @media (max-width: 540px) {
          .cp-grid { grid-template-columns: 1fr; }
          .cp-cta-banner { padding: 28px 20px; }
          .cp-tab { font-size: 12.5px; padding: 9px 16px; }
        }
      `}</style>
    </>
  );
};

export default CollectionPage;
