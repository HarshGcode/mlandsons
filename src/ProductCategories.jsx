import React from "react";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Rare Date Notes",
    description: "Special serial number notes and memorable date notes perfect for gifting to your loved ones on special occasions.",
    tag: "Best Seller",
    image: "/gallery/img-12.jpeg",
  },
  {
    id: 2,
    title: "Antique Coins",
    description: "Historic coins from different eras, carefully preserved and authenticated for serious collectors.",
    tag: "Most Rare",
    image: "/gallery/img-05.jpeg",
  },
  {
    id: 3,
    title: "Collector Currency",
    description: "Rare and unique currency notes for enthusiasts who appreciate history and fine craftsmanship.",
    tag: "Premium",
    image: "/gallery/img-15.jpeg",
  },
];

const ProductCategories = () => {
  return (
    <>
      <section id="products" className="ba-pc-section">
        <div className="ba-pc-inner">

          {/* Header */}
          <div className="ba-sec-header">
            <h2 className="ba-sec-title">Product Categories</h2>
            <p className="ba-pc-sub">
              Discover rare antique currency, unique gifting options, and premium collectible pieces.
            </p>
          </div>

          {/* Cards with images */}
          <div className="ba-pc-grid">
            {categories.map(({ id, title, description, tag, image }) => (
              <div key={id} className="ba-pc-card">
                <div className="ba-pc-card-img-wrap">
                  <img src={image} alt={title} className="ba-pc-card-img" loading="lazy" />
                  <div className="ba-pc-card-img-overlay" />
                  <span className="ba-pc-tag">{tag}</span>
                </div>
                <div className="ba-pc-card-body">
                  <h3 className="ba-pc-card-title">{title}</h3>
                  <p className="ba-pc-card-desc">{description}</p>
                  <div className="ba-pc-card-divider" />
                  <button
                    className="ba-pc-cta"
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span>Enquire Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Banner */}
          <div className="ba-pc-banner">
            <div className="ba-pc-banner-text">
              <p className="ba-pc-banner-eyebrow">Custom Orders Welcome</p>
              <h3 className="ba-pc-banner-h3">Looking for Something Specific?</h3>
              <p className="ba-pc-banner-desc">
                Can't find a particular date note or rare coin? We'll help you source it from our network.
              </p>
            </div>
            <button
              className="ba-pc-banner-btn"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request Custom Item →
            </button>
          </div>

        </div>
      </section>

      <style>{`
        .ba-pc-section {
          background: #0a0a0a;
          padding: 80px 0;
          border-top: 1px solid #1a1a1a;
        }

        .ba-pc-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ba-pc-sub {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          max-width: 480px;
          line-height: 1.7;
          margin-top: 8px;
        }

        .ba-pc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }

        .ba-pc-card {
          background: #0e0e0e;
          border: 1px solid #1a1a1a;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .ba-pc-card:hover {
          border-color: #333;
          transform: translateY(-4px);
        }

        .ba-pc-card-img-wrap {
          position: relative;
          padding-bottom: 65%;
          overflow: hidden;
          background: #111;
        }

        .ba-pc-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.8);
          transition: transform 0.6s ease, filter 0.3s;
        }
        .ba-pc-card:hover .ba-pc-card-img {
          transform: scale(1.06);
          filter: brightness(0.65);
        }

        .ba-pc-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%);
          pointer-events: none;
        }

        .ba-pc-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 5px 12px;
          z-index: 2;
        }

        .ba-pc-card-body {
          padding: 24px 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ba-pc-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
        }

        .ba-pc-card-desc {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          flex: 1;
        }

        .ba-pc-card-divider {
          height: 1px;
          background: #1a1a1a;
        }

        .ba-pc-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.45);
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0;
          transition: color 0.2s;
        }
        .ba-pc-cta:hover { color: #fff; }

        /* Banner */
        .ba-pc-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          padding: 48px;
          border: 1px solid #1a1a1a;
          background: #111;
          flex-wrap: wrap;
        }

        .ba-pc-banner-text {
          flex: 1;
          min-width: 260px;
        }

        .ba-pc-banner-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 12px;
        }

        .ba-pc-banner-h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .ba-pc-banner-desc {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 400px;
        }

        .ba-pc-banner-btn {
          display: inline-block;
          padding: 14px 36px;
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
          white-space: nowrap;
        }
        .ba-pc-banner-btn:hover {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        @media (max-width: 900px) {
          .ba-pc-grid { grid-template-columns: 1fr; }
          .ba-pc-banner { flex-direction: column; align-items: flex-start; padding: 32px; }
        }

        /* Light theme */
        [data-theme="light"] .ba-pc-section { background: #f9f6f0; }
        [data-theme="light"] .ba-pc-card { background: #f9f6f0; border-color: #e5e5e5; }
        [data-theme="light"] .ba-pc-card:hover { border-color: #ccc; }
        [data-theme="light"] .ba-pc-card-title { color: #111; }
        [data-theme="light"] .ba-pc-card-desc { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .ba-pc-tag { color: #fff; }
        [data-theme="light"] .ba-pc-card-divider { background: #e5e5e5; }
        [data-theme="light"] .ba-pc-cta { color: rgba(0,0,0,0.45); }
        [data-theme="light"] .ba-pc-cta:hover { color: #000; }
        [data-theme="light"] .ba-pc-banner { background: #f0ede6; border-color: #ddd; }
        [data-theme="light"] .ba-pc-banner-h3 { color: #111; }
        [data-theme="light"] .ba-pc-banner-desc { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .ba-pc-banner-eyebrow { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-pc-banner-btn { border-color: rgba(0,0,0,0.5); color: #000; }
        [data-theme="light"] .ba-pc-banner-btn:hover { background: #000; color: #fff; border-color: #000; }
        [data-theme="light"] .ba-pc-sub { color: rgba(0,0,0,0.5); }
      `}</style>
    </>
  );
};

export default ProductCategories;
