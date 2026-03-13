import React from "react";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Rare Date Notes",
    description: "Special serial number notes and memorable date notes perfect for gifting to your loved ones on special occasions.",
    tag: "Best Seller",
  },
  {
    id: 2,
    title: "Antique Coins",
    description: "Historic coins from different eras, carefully preserved and authenticated for serious collectors.",
    tag: "Most Rare",
  },
  {
    id: 3,
    title: "Collector Currency",
    description: "Rare and unique currency notes for enthusiasts who appreciate history and fine craftsmanship.",
    tag: "Premium",
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

          {/* Cards */}
          <div className="ba-pc-grid">
            {categories.map(({ id, title, description, tag }) => (
              <div key={id} className="ba-pc-card">
                <span className="ba-pc-tag">{tag}</span>
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
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
          margin-bottom: 48px;
        }

        .ba-pc-card {
          background: #0a0a0a;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: background 0.2s;
        }
        .ba-pc-card:hover { background: #111; }

        .ba-pc-tag {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 4px 10px;
          width: fit-content;
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
        [data-theme="light"] .ba-pc-grid { background: #ddd; border-color: #ddd; }
        [data-theme="light"] .ba-pc-card { background: #f9f6f0; }
        [data-theme="light"] .ba-pc-card:hover { background: #f0ede6; }
        [data-theme="light"] .ba-pc-card-title { color: #111; }
        [data-theme="light"] .ba-pc-card-desc { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .ba-pc-tag { color: rgba(0,0,0,0.4); border-color: rgba(0,0,0,0.15); }
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
