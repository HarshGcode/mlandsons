import React, { useEffect, useState } from "react";

const heroSlides = [
  {
    images: ["/gallery/img-17.jpeg", "/gallery/img-19.jpeg", "/gallery/img-16.jpeg"],
    heading: "ANTIQUE CURRENCY SHOP",
    sub: "RARE COINS, NOTES & COLLECTIBLE TREASURES",
  },
  {
    images: ["/gallery/img-01.jpeg", "/gallery/img-07.jpeg", "/gallery/img-09.jpeg"],
    heading: "DISCOVER RARE TREASURES",
    sub: "AUTHENTIC ANTIQUES TRUSTED SINCE GENERATIONS",
  },
  {
    images: ["/gallery/img-03.jpeg", "/gallery/img-14.jpeg", "/gallery/img-18.jpeg"],
    heading: "COLLECTIBLES & RARE PIECES",
    sub: "CURATED FROM AGRA — SHIPPED WORLDWIDE",
  },
];

const Hero = ({ onViewCollection }) => {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSlide(s => (s + 1) % heroSlides.length);
        setFading(false);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (idx) => {
    setFading(true);
    setTimeout(() => { setSlide(idx); setFading(false); }, 400);
  };

  const current = heroSlides[slide];

  const handleShopAll = () => {
    if (onViewCollection) onViewCollection();
    else {
      const el = document.getElementById("gallery");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="home" className="ba-hero">
        {/* Background gradient */}
        <div className="ba-hero-gradient" />

        {/* Content */}
        <div className={`ba-hero-content ${fading ? "ba-hero-content--fade" : ""}`}>
          <p className="ba-hero-eyebrow">ML &amp; SONS — EST. AGRA</p>
          <h1 className="ba-hero-h1">{current.heading}</h1>
          <p className="ba-hero-sub">{current.sub}</p>

          {/* Horizontal image strip */}
          <div className="ba-hero-images">
            {current.images.map((img, i) => (
              <div key={i} className="ba-hero-img-card">
                <img src={img} alt="" />
              </div>
            ))}
          </div>

          <button className="ba-hero-btn" onClick={handleShopAll}>
            SHOP ALL
          </button>
        </div>

        {/* Dots */}
        <div className="ba-hero-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`ba-hero-dot ${i === slide ? "ba-hero-dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="ba-hero-scroll">
          <div className="ba-hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');

        .ba-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0a0a0a;
        }

        .ba-hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(40,35,25,0.5) 0%, #0a0a0a 70%);
          pointer-events: none;
        }

        /* ── Content ── */
        .ba-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 80px 24px 60px;
          max-width: 900px;
          width: 100%;
          transition: opacity 0.4s ease;
        }

        .ba-hero-content--fade { opacity: 0; }

        .ba-hero-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .ba-hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 5.5vw, 68px);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .ba-hero-sub {
          font-family: 'Jost', sans-serif;
          font-size: clamp(11px, 1.4vw, 13px);
          font-weight: 400;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        /* ── Horizontal Image Strip ── */
        .ba-hero-images {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 36px;
        }

        .ba-hero-img-card {
          width: 220px;
          height: 180px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          background: #111;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .ba-hero-img-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.3);
        }

        .ba-hero-img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ba-hero-btn {
          display: inline-block;
          padding: 14px 40px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.8);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ba-hero-btn:hover {
          background: #fff;
          color: #000;
        }

        @media (max-width: 600px) {
          .ba-hero-images {
            gap: 10px;
          }
          .ba-hero-img-card {
            width: 110px;
            height: 100px;
            border-radius: 4px;
          }
          .ba-hero-content {
            padding: 60px 16px 40px;
          }
        }

        @media (max-width: 360px) {
          .ba-hero-img-card {
            width: 90px;
            height: 85px;
          }
          .ba-hero-images {
            gap: 8px;
          }
        }

        /* ── Dots ── */
        .ba-hero-dots {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 3;
        }

        .ba-hero-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }

        .ba-hero-dot--active {
          background: #fff;
          width: 20px;
          border-radius: 3px;
        }

        /* ── Scroll indicator ── */
        .ba-hero-scroll {
          position: absolute;
          right: 32px;
          bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 3;
          opacity: 0.5;
        }

        .ba-hero-scroll-line {
          width: 1px;
          height: 48px;
          background: #fff;
          animation: ba-scroll-line 1.8s ease-in-out infinite;
        }

        @keyframes ba-scroll-line {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.5); opacity: 0.5; }
        }

        .ba-hero-scroll span {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        @media (max-width: 600px) {
          .ba-hero-scroll { display: none; }
          .ba-hero-btn { padding: 12px 28px; font-size: 11px; }
          .ba-hero-dots { bottom: 20px; }
        }
      `}</style>
    </>
  );
};

export default Hero;
