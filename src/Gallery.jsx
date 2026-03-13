import React from "react";

const galleryItems = [
  { id: 1, title: "Rare Antique Notes", tag: "Currency Notes", image: "https://rukminim2.flixcart.com/image/480/640/xif0q/printed-currency/8/z/2/1-10-different-old-note-collection-1-naaz-rare-collection-original-imahfdszbzgf2gfe.jpeg?q=90" },
  { id: 2, title: "Vintage Coin Collection", tag: "Antique Coins", image: "https://www.tezbid.com/cdn/shop/files/L09I01_580x.jpg?v=1718122595" },
  { id: 3, title: "Special Date Notes", tag: "Limited Edition", image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80" },
  { id: 4, title: "History of Indian Rupee", tag: "Heritage", image: "https://www.marketcalls.in/wp-content/uploads/2011/11/History-of-Rupee.jpg" },
  { id: 5, title: "Collector's Rare Coins", tag: "Rare Coins", image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80" },
  { id: 6, title: "Collector's Edition Currency", tag: "Rare Notes", image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80" },
];

const Gallery = () => {
  return (
    <>
      <section id="gallery" className="ba-gl-section">
        <div className="ba-gl-inner">

          {/* Header */}
          <div className="ba-sec-header">
            <h2 className="ba-sec-title">Gallery</h2>
          </div>
          <p className="ba-gl-sub">
            Browse through our exquisite collection of antique coins, currency notes, and special date notes.
          </p>

          {/* Grid */}
          <div className="ba-gl-grid">
            {galleryItems.map((item) => (
              <div key={item.id} className="ba-gl-card">
                <div className="ba-gl-img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="ba-gl-img"
                    loading="lazy"
                  />
                  <div className="ba-gl-overlay" />
                </div>
                <div className="ba-gl-info">
                  <span className="ba-gl-tag">{item.tag}</span>
                  <h3 className="ba-gl-card-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="ba-gl-note">
            All items are 100% authenticated &nbsp;·&nbsp; New arrivals every week &nbsp;·&nbsp; Visit us in Agra
          </div>

        </div>
      </section>

      <style>{`
        .ba-gl-section {
          background: #0a0a0a;
          padding: 80px 0;
          border-top: 1px solid #1a1a1a;
        }

        .ba-gl-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ba-gl-sub {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          margin: 8px 0 36px;
          line-height: 1.7;
        }

        .ba-gl-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 40px;
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
          padding-bottom: 75%;
          overflow: hidden;
          background: #111;
        }

        .ba-gl-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.85);
          transition: transform 0.6s ease, filter 0.3s;
        }
        .ba-gl-card:hover .ba-gl-img {
          transform: scale(1.06);
          filter: brightness(0.7);
        }

        .ba-gl-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
          pointer-events: none;
        }

        .ba-gl-info {
          padding: 14px 0 4px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ba-gl-tag {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .ba-gl-card-title {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.02em;
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
          .ba-gl-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .ba-gl-grid { grid-template-columns: 1fr; }
        }

        /* Light theme */
        [data-theme="light"] .ba-gl-section { background: #f9f6f0; }
        [data-theme="light"] .ba-gl-card { border-color: #e5e5e5; }
        [data-theme="light"] .ba-gl-card:hover { border-color: #ccc; }
        [data-theme="light"] .ba-gl-card-title { color: #111; }
        [data-theme="light"] .ba-gl-tag { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-gl-note { color: rgba(0,0,0,0.35); border-color: #e5e5e5; }
        [data-theme="light"] .ba-gl-sub { color: rgba(0,0,0,0.5); }
      `}</style>
    </>
  );
};

export default Gallery;
