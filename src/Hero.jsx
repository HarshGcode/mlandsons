import React, { useEffect, useState } from "react";

const heroSlides = [
  {
    img: "/products/victoria-empress-1889-front.jpeg",
    heading: "ANTIQUE CURRENCY SHOP",
    sub: "RARE COINS, NOTES & COLLECTIBLE TREASURES",
  },
  {
    img: "/products/50rs-solid-trio.jpeg",
    heading: "DISCOVER RARE TREASURES",
    sub: "AUTHENTIC ANTIQUES TRUSTED SINCE GENERATIONS",
  },
  {
    img: "/products/100rs-vintage-single.jpeg",
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
        {/* Background image */}
        <div
          className={`ba-hero-bg ${fading ? "ba-hero-bg--fade" : ""}`}
          style={{ backgroundImage: `url(${current.img})` }}
        />
        <div className="ba-hero-overlay" />

        {/* Content */}
        <div className={`ba-hero-content ${fading ? "ba-hero-content--fade" : ""}`}>
          <p className="ba-hero-eyebrow">ML &amp; SONS — EST. AGRA</p>
          <h1 className="ba-hero-h1">{current.heading}</h1>
          <p className="ba-hero-sub">{current.sub}</p>
          <button className="ba-hero-btn" onClick={handleShopAll}>
            Shop All
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
          height: 100vh;
          min-height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }

        .ba-hero-bg {
          position: absolute;
          inset: 0;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #fff;
          transform: scale(1.04);
          transition: opacity 0.4s ease;
          animation: ba-ken-burns 12s ease-in-out infinite alternate;
        }

        .ba-hero-bg--fade { opacity: 0; }

        @keyframes ba-ken-burns {
          from { transform: scale(1.04); }
          to   { transform: scale(1.12); }
        }

        .ba-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.35) 0%,
            rgba(0,0,0,0.5) 50%,
            rgba(0,0,0,0.7) 100%
          );
          pointer-events: none;
        }

        /* ── Content ── */
        .ba-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 24px;
          max-width: 800px;
          transition: opacity 0.4s ease;
        }

        .ba-hero-content--fade { opacity: 0; }

        .ba-hero-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.65);
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .ba-hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 6vw, 80px);
          font-weight: 700;
          color: #fff;
          line-height: 1.08;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 18px;
          text-shadow: 0 4px 30px rgba(0,0,0,0.5);
        }

        .ba-hero-sub {
          font-family: 'Jost', sans-serif;
          font-size: clamp(12px, 1.5vw, 14px);
          font-weight: 400;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          margin-bottom: 36px;
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
          .ba-hero-btn { padding: 12px 28px; }
        }
      `}</style>
    </>
  );
};

export default Hero;
