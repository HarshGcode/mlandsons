import React, { useState } from "react";

const galleryItems = [
  { id: 1, title: "Victoria Empress Silver Coin", tag: "Antique Coins", image: "/gallery/img-02.jpeg", era: "1889" },
  { id: 2, title: "One Rupee India 1918", tag: "Heritage Coins", image: "/gallery/img-07.jpeg", era: "1918" },
  { id: 3, title: "Rs 20 Solid Serial 222222", tag: "Fancy Number", image: "/gallery/img-01.jpeg", era: "Modern" },
  { id: 4, title: "Government of India One Rupee", tag: "Vintage Notes", image: "/gallery/img-14.jpeg", era: "Pre-1950" },
  { id: 5, title: "Rs 100 Vintage Bundle", tag: "Rare Notes", image: "/gallery/img-17.jpeg", era: "1960s" },
  { id: 6, title: "Vintage 10 Rupee Notes", tag: "Collector's Item", image: "/gallery/img-19.jpeg", era: "1970s" },
  { id: 7, title: "George V King Emperor Coin", tag: "British India", image: "/gallery/img-10.jpeg", era: "1913" },
  { id: 8, title: "Rs 2 Vintage Note", tag: "Rare Notes", image: "/gallery/img-15.jpeg", era: "1960s" },
  { id: 9, title: "Rs 5 Reserve Bank Note", tag: "Vintage Notes", image: "/gallery/img-16.jpeg", era: "1970s" },
  { id: 10, title: "Rs 10 Consecutive Serial Bundle", tag: "Special Bundle", image: "/gallery/img-12.jpeg", era: "Modern" },
  { id: 11, title: "George VI Emperor Coin", tag: "British India", image: "/gallery/img-04.jpeg", era: "1940s" },
  { id: 12, title: "One Rupee India 1889", tag: "Heritage Coins", image: "/gallery/img-03.jpeg", era: "1889" },
];

const Gallery = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <section id="gallery" className="ba-gl-section">
        <div className="ba-gl-inner">

          {/* Header */}
          <div className="ba-gl-header">
            <p className="ba-gl-eyebrow">Our Collection</p>
            <h2 className="ba-gl-title">Rare Pieces. Real Stories.</h2>
            <p className="ba-gl-sub">
              Browse through our exquisite collection of antique coins, currency notes, and special edition pieces — each one authenticated and preserved with care.
            </p>
          </div>

          {/* Masonry-style Grid */}
          <div className="ba-gl-grid">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`ba-gl-card ba-gl-card--${index < 2 ? 'tall' : index < 4 ? 'wide' : 'normal'}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="ba-gl-img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="ba-gl-img"
                    loading="lazy"
                  />
                  <div className="ba-gl-overlay" />
                  <div className={`ba-gl-hover-info ${hoveredId === item.id ? 'ba-gl-hover-info--visible' : ''}`}>
                    <span className="ba-gl-hover-era">{item.era}</span>
                    <h3 className="ba-gl-hover-title">{item.title}</h3>
                    <span className="ba-gl-hover-tag">{item.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="ba-gl-note">
            All items are 100% authenticated &nbsp;&middot;&nbsp; New arrivals every week &nbsp;&middot;&nbsp; Visit us in Agra
          </div>

        </div>
      </section>

      <style>{`
        .ba-gl-section {
          background: #0a0a0a;
          padding: 100px 0;
          border-top: 1px solid #1a1a1a;
        }

        .ba-gl-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ba-gl-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .ba-gl-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 16px;
        }

        .ba-gl-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .ba-gl-sub {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .ba-gl-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 280px;
          gap: 12px;
          margin-bottom: 48px;
        }

        /* First two items span 2 rows for visual variety */
        .ba-gl-card--tall:nth-child(1) {
          grid-row: span 2;
          grid-column: span 2;
        }
        .ba-gl-card--tall:nth-child(2) {
          grid-row: span 2;
        }

        .ba-gl-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid #1a1a1a;
          transition: border-color 0.3s;
        }
        .ba-gl-card:hover { border-color: #333; }

        .ba-gl-img-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #111;
        }

        .ba-gl-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.85);
          transition: transform 0.6s ease, filter 0.3s;
        }
        .ba-gl-card:hover .ba-gl-img {
          transform: scale(1.08);
          filter: brightness(0.6);
        }

        .ba-gl-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Hover info */
        .ba-gl-hover-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px 20px;
          transform: translateY(10px);
          opacity: 0;
          transition: all 0.35s ease;
          z-index: 2;
        }

        .ba-gl-hover-info--visible {
          transform: translateY(0);
          opacity: 1;
        }

        .ba-gl-hover-era {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          display: block;
          margin-bottom: 6px;
        }

        .ba-gl-hover-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .ba-gl-hover-tag {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 3px 10px;
          display: inline-block;
        }

        .ba-gl-note {
          text-align: center;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.06em;
          padding: 20px 0 0;
          border-top: 1px solid #1a1a1a;
        }

        @media (max-width: 900px) {
          .ba-gl-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 240px;
          }
          .ba-gl-card--tall:nth-child(1) {
            grid-row: span 2;
            grid-column: span 1;
          }
        }
        @media (max-width: 500px) {
          .ba-gl-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 300px;
          }
          .ba-gl-card--tall:nth-child(1) {
            grid-row: span 1;
            grid-column: span 1;
          }
          .ba-gl-card--tall:nth-child(2) {
            grid-row: span 1;
          }
        }

        /* Light theme */
        [data-theme="light"] .ba-gl-section { background: #f9f6f0; }
        [data-theme="light"] .ba-gl-card { border-color: #e5e5e5; }
        [data-theme="light"] .ba-gl-card:hover { border-color: #ccc; }
        [data-theme="light"] .ba-gl-title { color: #111; }
        [data-theme="light"] .ba-gl-eyebrow { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-gl-note { color: rgba(0,0,0,0.35); border-color: #e5e5e5; }
        [data-theme="light"] .ba-gl-sub { color: rgba(0,0,0,0.5); }
      `}</style>
    </>
  );
};

export default Gallery;
