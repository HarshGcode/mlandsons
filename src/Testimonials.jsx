import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  { id: 1, name: "Rajesh Kumar", location: "Delhi", rating: 5, text: "Found the perfect wedding date note for my anniversary! ML & Sons has an amazing collection of rare currency. Highly recommend!" },
  { id: 2, name: "Priya Sharma", location: "Mumbai", rating: 5, text: "Bought antique coins for my collection. Every piece was authentic and beautifully preserved. Great service and fair pricing!" },
  { id: 3, name: "Amit Verma", location: "Agra", rating: 5, text: "ML & Sons helped me find a birthday date note that matched perfectly! It made for such a unique and memorable gift." },
  { id: 4, name: "Sunita Patel", location: "Jaipur", rating: 5, text: "Visited their store in Rawatpara. The collection is incredible and the staff is very knowledgeable." },
  { id: 5, name: "Vikram Singh", location: "Lucknow", rating: 5, text: "Been collecting antique currency for years. ML & Sons has some of the rarest pieces I've seen. 100% authentic!" },
  { id: 6, name: "Neha Gupta", location: "Bangalore", rating: 5, text: "Perfect place for finding special date notes! Got my parents' anniversary date note — they were absolutely thrilled." },
];

const Testimonials = () => {
  return (
    <>
      <section id="testimonials" className="ba-tm-section">
        <div className="ba-tm-inner">

          {/* Header */}
          <div className="ba-sec-header">
            <h2 className="ba-sec-title">What Our Collectors Say</h2>
          </div>
          <p className="ba-tm-sub">Trusted by collectors and gift buyers across India</p>

          {/* Cards */}
          <div className="ba-tm-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="ba-tm-card">
                {/* Stars */}
                <div className="ba-tm-stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={12} className="ba-tm-star" />
                  ))}
                </div>

                {/* Quote */}
                <p className="ba-tm-text">"{t.text}"</p>

                {/* Author */}
                <div className="ba-tm-divider" />
                <div className="ba-tm-author">
                  <div className="ba-tm-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="ba-tm-name">{t.name}</div>
                    <div className="ba-tm-location">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust bar */}
          <div className="ba-tm-trust">
            <div className="ba-tm-trust-item">
              <div className="ba-tm-trust-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="ba-tm-star" />
                ))}
              </div>
              <div className="ba-tm-trust-val">4.9 / 5</div>
            </div>
            <div className="ba-tm-trust-sep" />
            <div className="ba-tm-trust-item">
              <div className="ba-tm-trust-val">500+</div>
              <div className="ba-tm-trust-label">Happy Customers</div>
            </div>
            <div className="ba-tm-trust-sep" />
            <div className="ba-tm-trust-item">
              <div className="ba-tm-trust-val">100%</div>
              <div className="ba-tm-trust-label">Verified Reviews</div>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .ba-tm-section {
          background: #0a0a0a;
          padding: 80px 0;
          border-top: 1px solid #1a1a1a;
        }

        .ba-tm-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ba-tm-sub {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          margin: 8px 0 36px;
        }

        .ba-tm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
          margin-bottom: 48px;
        }

        .ba-tm-card {
          background: #0a0a0a;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: background 0.2s;
        }
        .ba-tm-card:hover { background: #111; }

        .ba-tm-stars {
          display: flex;
          gap: 3px;
        }

        .ba-tm-star {
          color: #fff;
          fill: #fff;
        }

        .ba-tm-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 16px;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          flex: 1;
        }

        .ba-tm-divider {
          height: 1px;
          background: #1a1a1a;
        }

        .ba-tm-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ba-tm-avatar {
          width: 36px;
          height: 36px;
          background: #1a1a1a;
          border: 1px solid #333;
          display: grid;
          place-items: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }

        .ba-tm-name {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #fff;
        }

        .ba-tm-location {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
        }

        /* Trust bar */
        .ba-tm-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 36px;
          padding: 28px 0;
          border: 1px solid #1a1a1a;
        }

        .ba-tm-trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .ba-tm-trust-stars {
          display: flex;
          gap: 3px;
        }

        .ba-tm-trust-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }

        .ba-tm-trust-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .ba-tm-trust-sep {
          width: 1px;
          height: 40px;
          background: #1a1a1a;
        }

        @media (max-width: 900px) {
          .ba-tm-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ba-tm-grid { grid-template-columns: 1fr; }
          .ba-tm-trust { flex-direction: column; gap: 20px; }
          .ba-tm-trust-sep { width: 40px; height: 1px; }
        }

        /* Light theme */
        [data-theme="light"] .ba-tm-section { background: #f9f6f0; }
        [data-theme="light"] .ba-tm-grid { background: #ddd; border-color: #ddd; }
        [data-theme="light"] .ba-tm-card { background: #f9f6f0; }
        [data-theme="light"] .ba-tm-card:hover { background: #f0ede6; }
        [data-theme="light"] .ba-tm-star { color: #111; fill: #111; }
        [data-theme="light"] .ba-tm-text { color: rgba(0,0,0,0.55); }
        [data-theme="light"] .ba-tm-divider { background: #e5e5e5; }
        [data-theme="light"] .ba-tm-avatar { background: #e5e5e5; border-color: #ccc; color: #111; }
        [data-theme="light"] .ba-tm-name { color: #111; }
        [data-theme="light"] .ba-tm-location { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-tm-trust { border-color: #ddd; }
        [data-theme="light"] .ba-tm-trust-val { color: #111; }
        [data-theme="light"] .ba-tm-trust-label { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-tm-trust-sep { background: #ddd; }
        [data-theme="light"] .ba-tm-sub { color: rgba(0,0,0,0.5); }
      `}</style>
    </>
  );
};

export default Testimonials;
