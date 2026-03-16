import React from "react";

const galleryItems = [
  { id: 1, title: "Victoria Empress 1889 Silver", tag: "Antique Coins", image: "/products/victoria-empress-1889-front.jpeg" },
  { id: 2, title: "Solid Serial ₹20 (222222)", tag: "Fancy Serial", image: "/products/20rs-solid-222222.jpeg" },
  { id: 3, title: "₹200 Star Note Bundle", tag: "Star Notes", image: "/products/200rs-star-full.jpeg" },
  { id: 4, title: "Vintage ₹100 Reserve Bank Note", tag: "Vintage Notes", image: "/products/100rs-vintage-single.jpeg" },
  { id: 5, title: "George V King Emperor Rupee", tag: "British India", image: "/products/george-v-rupee-front.jpeg" },
  { id: 6, title: "Solid Trio Set (333+444+555)", tag: "Premium Bundle", image: "/products/50rs-solid-trio.jpeg" },
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
          background: #fff;
          padding: 80px 0;
          border-top: 1px solid #e5e5e5;
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
          color: rgba(0,0,0,0.5);
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
          border: 1px solid #e5e5e5;
          transition: border-color 0.3s, box-shadow 0.3s;
          border-radius: 4px;
        }
        .ba-gl-card:hover { border-color: #ccc; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

        .ba-gl-img-wrap {
          position: relative;
          padding-bottom: 75%;
          overflow: hidden;
          background: #fff;
        }

        .ba-gl-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          transition: transform 0.6s ease;
          padding: 8px;
        }
        .ba-gl-card:hover .ba-gl-img {
          transform: scale(1.06);
        }

        .ba-gl-overlay {
          display: none;
        }

        .ba-gl-info {
          padding: 14px 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-top: 1px solid #f0f0f0;
        }

        .ba-gl-tag {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
        }

        .ba-gl-card-title {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #1a1a1a;
          letter-spacing: 0.02em;
        }

        .ba-gl-note {
          text-align: center;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          color: rgba(0,0,0,0.35);
          letter-spacing: 0.06em;
          padding: 20px 0 0;
          border-top: 1px solid #e5e5e5;
        }

        @media (max-width: 900px) {
          .ba-gl-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .ba-gl-grid { grid-template-columns: 1fr; }
        }

        /* Light theme already white, minimal overrides */
        [data-theme="light"] .ba-gl-section { background: #f9f6f0; }
      `}</style>
    </>
  );
};

export default Gallery;
