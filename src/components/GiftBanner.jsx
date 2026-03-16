import { useNav } from '../context/NavigationContext';

const gifts = [
  { icon: '🎂', label: 'Birthday Notes', desc: 'Serial matching their birthdate' },
  { icon: '💍', label: 'Anniversary', desc: 'Currency from your wedding year' },
  { icon: '👑', label: 'Wedding Gift', desc: 'Premium heirloom set' },
  { icon: '🍀', label: 'Lucky Number', desc: 'Your special number on a note' },
];

export default function GiftBanner() {
  const nav = useNav();
  if (!nav) return null;
  const { navigate } = nav;

  return (
    <section className="ba-gb-hero">
      {/* Background */}
      <div className="ba-gb-hero-bg" />
      <div className="ba-gb-hero-overlay" />

      {/* Content */}
      <div className="ba-gb-hero-content">
        <p className="ba-gb-hero-eyebrow">Curated Gifting</p>
        <h2 className="ba-gb-hero-h2">Gift the Extraordinary</h2>
        <p className="ba-gb-hero-sub">
          Make every milestone unforgettable with authenticated Indian currency collectibles.
        </p>

        {/* Gift cards row */}
        <div className="ba-gb-hero-grid">
          {gifts.map((g, i) => (
            <div className="ba-gb-hero-card" key={i} onClick={() => navigate('gift')}>
              <div className="ba-gb-hero-icon">{g.icon}</div>
              <h4 className="ba-gb-hero-card-label">{g.label}</h4>
              <p className="ba-gb-hero-card-desc">{g.desc}</p>
            </div>
          ))}
        </div>

        <button className="ba-gb-hero-btn" onClick={() => navigate('gift')}>
          Explore All Gift Packages
        </button>
      </div>

      <style>{`
        .ba-gb-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }

        .ba-gb-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/gallery/img-18.jpeg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.04);
          animation: ba-gb-ken 14s ease-in-out infinite alternate;
        }

        @keyframes ba-gb-ken {
          from { transform: scale(1.04); }
          to   { transform: scale(1.12); }
        }

        .ba-gb-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.5) 0%,
            rgba(0,0,0,0.7) 50%,
            rgba(0,0,0,0.85) 100%
          );
          pointer-events: none;
        }

        .ba-gb-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 80px 24px;
          max-width: 960px;
          width: 100%;
        }

        .ba-gb-hero-eyebrow {
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .ba-gb-hero-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5.5vw, 72px);
          font-weight: 700;
          color: #fff;
          line-height: 1.08;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 20px;
          text-shadow: 0 4px 30px rgba(0,0,0,0.5);
        }

        .ba-gb-hero-sub {
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.06rem;
          color: rgba(255,255,255,0.6);
          margin-bottom: 48px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        .ba-gb-hero-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 48px;
        }

        .ba-gb-hero-card {
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 36px 20px;
          text-align: center;
          cursor: pointer;
          transition: background 0.3s;
        }
        .ba-gb-hero-card:hover {
          background: rgba(255,255,255,0.08);
        }

        .ba-gb-hero-icon {
          font-size: 32px;
          margin-bottom: 14px;
        }

        .ba-gb-hero-card-label {
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.06rem;
          margin-bottom: 6px;
        }

        .ba-gb-hero-card-desc {
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
          letter-spacing: 0.04rem;
        }

        .ba-gb-hero-btn {
          display: inline-block;
          padding: 16px 44px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.8);
          color: #fff;
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ba-gb-hero-btn:hover {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        @media (max-width: 768px) {
          .ba-gb-hero-grid { grid-template-columns: repeat(2, 1fr); }
          .ba-gb-hero { min-height: auto; padding: 0; }
          .ba-gb-hero-content { padding: 80px 20px; }
        }
        @media (max-width: 450px) {
          .ba-gb-hero-grid { grid-template-columns: 1fr; }
        }

        /* Light theme */
        [data-theme="light"] .ba-gb-hero { background: #f3f3f3; }
        [data-theme="light"] .ba-gb-hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(243,243,243,0.6) 0%,
            rgba(243,243,243,0.8) 50%,
            rgba(243,243,243,0.95) 100%
          );
        }
        [data-theme="light"] .ba-gb-hero-eyebrow { color: rgba(18,18,18,0.5); }
        [data-theme="light"] .ba-gb-hero-h2 { color: #121212; text-shadow: none; }
        [data-theme="light"] .ba-gb-hero-sub { color: rgba(18,18,18,0.55); }
        [data-theme="light"] .ba-gb-hero-grid { background: rgba(0,0,0,0.08); border-color: rgba(0,0,0,0.08); }
        [data-theme="light"] .ba-gb-hero-card { background: rgba(243,243,243,0.8); }
        [data-theme="light"] .ba-gb-hero-card:hover { background: rgba(0,0,0,0.04); }
        [data-theme="light"] .ba-gb-hero-card-label { color: #121212; }
        [data-theme="light"] .ba-gb-hero-card-desc { color: rgba(18,18,18,0.45); }
        [data-theme="light"] .ba-gb-hero-btn { border-color: rgba(18,18,18,0.8); color: #121212; }
        [data-theme="light"] .ba-gb-hero-btn:hover { background: #121212; color: #fff; border-color: #121212; }
      `}</style>
    </section>
  );
}
