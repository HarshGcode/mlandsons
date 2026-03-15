import React from "react";

const values = [
  { title: "Authenticity", desc: "Every piece verified and certified" },
  { title: "Trust", desc: "25+ years of collector confidence" },
  { title: "Passion", desc: "Dedicated to preserving history" },
  { title: "Community", desc: "Serving 1000+ happy collectors" },
];

const About = () => {
  return (
    <>
      <section id="about" className="ba-about-section">
        <div className="ba-about-inner">

          {/* Header */}
          <div className="ba-sec-header" style={{ marginBottom: 0 }}>
            <h2 className="ba-sec-title">About ML & Sons</h2>
          </div>
          <p className="ba-about-sub">
            A legacy of trust, authenticity, and passion for antique currency since 1999
          </p>

          {/* Content Grid with Image */}
          <div className="ba-about-content">
            {/* Image Side */}
            <div className="ba-about-img-side">
              <div className="ba-about-img-main">
                <img src="/gallery/img-10.jpeg" alt="George V Coin" className="ba-about-photo" />
              </div>
              <div className="ba-about-img-main">
                <img src="/gallery/img-16.jpeg" alt="Vintage ₹1 Note" className="ba-about-photo" />
              </div>
              <div className="ba-about-img-main">
                <img src="/gallery/img-06.jpeg" alt="George V Silver Rupee" className="ba-about-photo" />
              </div>
            </div>

            {/* Story */}
            <div className="ba-about-story">
              <h3 className="ba-about-story-h3">Our Journey</h3>
              <p className="ba-about-story-p">
                Established in the heart of Agra, ML & SONS has been a trusted name in antique currency
                dealing for over 25 years. What started as a passion for preserving history has grown
                into one of India's most respected sources for authentic antique coins and rare currency notes.
              </p>
              <p className="ba-about-story-p">
                Every piece in our collection tells a story — from pre-independence notes to rare mint
                coins. We specialize in sourcing items with unique serial numbers perfect for gifting
                on special occasions like weddings and birthdays.
              </p>
              <div className="ba-about-sig">
                <span className="ba-about-sig-line" />
                <span className="ba-about-sig-text">Est. 1999, Agra</span>
              </div>

              {/* Values Grid */}
              <div className="ba-about-values">
                {values.map(({ title, desc }) => (
                  <div key={title} className="ba-about-value">
                    <h4 className="ba-about-value-title">{title}</h4>
                    <p className="ba-about-value-desc">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="ba-about-ach">
            <div className="ba-about-ach-item">
              <div className="ba-about-ach-stat">500+</div>
              <div className="ba-about-ach-label">Rare Items Sold</div>
            </div>
            <div className="ba-about-ach-sep" />
            <div className="ba-about-ach-item">
              <div className="ba-about-ach-stat">4.9/5</div>
              <div className="ba-about-ach-label">Customer Rating</div>
            </div>
            <div className="ba-about-ach-sep" />
            <div className="ba-about-ach-item">
              <div className="ba-about-ach-stat">100%</div>
              <div className="ba-about-ach-label">Authentic Guarantee</div>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .ba-about-section {
          background: #0a0a0a;
          padding: 80px 0;
          border-top: 1px solid #1a1a1a;
        }

        .ba-about-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ba-about-sub {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          margin: 8px 0 48px;
          line-height: 1.7;
        }

        /* Content Grid */
        .ba-about-content {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 32px;
          margin-bottom: 48px;
        }

        /* Image Side */
        .ba-about-img-side {
          display: flex;
          gap: 10px;
        }

        .ba-about-img-main {
          flex: 1;
          overflow: hidden;
          border: 1px solid #1a1a1a;
          position: relative;
          border-radius: 4px;
          min-height: 300px;
        }

        .ba-about-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.8) saturate(0.9);
          transition: transform 0.6s ease, filter 0.3s;
        }
        .ba-about-img-main:hover .ba-about-photo {
          transform: scale(1.04);
          filter: brightness(0.9) saturate(1);
        }

        /* Story */
        .ba-about-story {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ba-about-story-h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 20px;
        }

        .ba-about-story-p {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          line-height: 1.9;
          margin-bottom: 16px;
        }

        .ba-about-sig {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 12px;
          margin-bottom: 32px;
        }

        .ba-about-sig-line {
          width: 40px;
          height: 1px;
          background: rgba(255,255,255,0.2);
        }

        .ba-about-sig-text {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Values */
        .ba-about-values {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
        }

        .ba-about-value {
          background: #0a0a0a;
          padding: 24px 20px;
          transition: background 0.2s;
        }
        .ba-about-value:hover { background: #111; }

        .ba-about-value-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 8px;
        }

        .ba-about-value-desc {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }

        /* Achievements */
        .ba-about-ach {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          border: 1px solid #1a1a1a;
        }

        .ba-about-ach-item {
          flex: 1;
          text-align: center;
          padding: 32px 24px;
        }

        .ba-about-ach-stat {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
          margin-bottom: 8px;
        }

        .ba-about-ach-label {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .ba-about-ach-sep {
          width: 1px;
          height: 50px;
          background: #1a1a1a;
        }

        @media (max-width: 900px) {
          .ba-about-content { grid-template-columns: 1fr; }
          .ba-about-img-main { min-height: 200px; }
        }

        @media (max-width: 560px) {
          .ba-about-values { grid-template-columns: 1fr; }
          .ba-about-ach { flex-direction: column; }
          .ba-about-ach-sep { width: 50px; height: 1px; }
          .ba-about-img-side { gap: 6px; }
          .ba-about-img-main { min-height: 140px; }
        }

        /* Light theme */
        [data-theme="light"] .ba-about-section { background: #f9f6f0; }
        [data-theme="light"] .ba-about-story-h3 { color: #111; }
        [data-theme="light"] .ba-about-story-p { color: rgba(0,0,0,0.55); }
        [data-theme="light"] .ba-about-sig-line { background: rgba(0,0,0,0.15); }
        [data-theme="light"] .ba-about-sig-text { color: rgba(0,0,0,0.35); }
        [data-theme="light"] .ba-about-values { background: #ddd; border-color: #ddd; }
        [data-theme="light"] .ba-about-value { background: #f9f6f0; }
        [data-theme="light"] .ba-about-value:hover { background: #f0ede6; }
        [data-theme="light"] .ba-about-value-title { color: #111; }
        [data-theme="light"] .ba-about-value-desc { color: rgba(0,0,0,0.45); }
        [data-theme="light"] .ba-about-ach { border-color: #ddd; }
        [data-theme="light"] .ba-about-ach-stat { color: #111; }
        [data-theme="light"] .ba-about-ach-label { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-about-ach-sep { background: #ddd; }
        [data-theme="light"] .ba-about-sub { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .ba-about-img-main { border-color: #e5e5e5; }
      `}</style>
    </>
  );
};

export default About;
