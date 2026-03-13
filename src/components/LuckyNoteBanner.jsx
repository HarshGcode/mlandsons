import { useNav } from '../context/NavigationContext';

export default function LuckyNoteBanner() {
  const nav = useNav();
  if (!nav) return null;
  const { navigate } = nav;

  return (
    <section className="ba-lnb-hero">
      {/* Background */}
      <div className="ba-lnb-hero-bg" />
      <div className="ba-lnb-hero-overlay" />

      {/* Content */}
      <div className="ba-lnb-hero-content">
        <p className="ba-lnb-hero-eyebrow">Exclusive Feature</p>
        <h2 className="ba-lnb-hero-h2">Find Your Lucky Note &#10024;</h2>
        <p className="ba-lnb-hero-sub">
          Enter any birthdate, anniversary, or special date — and we'll find a currency note
          with a matching serial number. The most personal gift you'll ever give.
        </p>

        {/* Demo card */}
        <div className="ba-lnb-hero-demo">
          <div className="ba-lnb-hero-demo-inner">
            <div className="ba-lnb-hero-demo-label">Your Date</div>
            <div className="ba-lnb-hero-demo-date">15 / 08 / 1947</div>
            <div className="ba-lnb-hero-demo-divider" />
            <div className="ba-lnb-hero-demo-result">
              <div className="ba-lnb-hero-result-serial">Serial: 15M <strong>1508194</strong>7</div>
              <div className="ba-lnb-hero-result-name">&#8377;500 Note — Independence Day Match!</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="ba-lnb-hero-btns">
          <button className="ba-lnb-hero-btn-primary" onClick={() => navigate('lucky')}>
            Try It Now
          </button>
          <button className="ba-lnb-hero-btn-ghost" onClick={() => navigate('gift')}>
            Gift Options
          </button>
        </div>
      </div>

      <style>{`
        .ba-lnb-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }

        .ba-lnb-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://www.marketcalls.in/wp-content/uploads/2011/11/History-of-Rupee.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.04);
          animation: ba-lnb-ken 14s ease-in-out infinite alternate;
        }

        @keyframes ba-lnb-ken {
          from { transform: scale(1.04); }
          to   { transform: scale(1.12); }
        }

        .ba-lnb-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.45) 0%,
            rgba(0,0,0,0.65) 50%,
            rgba(0,0,0,0.85) 100%
          );
          pointer-events: none;
        }

        .ba-lnb-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 80px 24px;
          max-width: 720px;
          width: 100%;
        }

        .ba-lnb-hero-eyebrow {
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .ba-lnb-hero-h2 {
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

        .ba-lnb-hero-sub {
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.06rem;
          color: rgba(255,255,255,0.6);
          max-width: 520px;
          margin: 0 auto 48px;
          line-height: 1.7;
        }

        /* Demo card */
        .ba-lnb-hero-demo {
          display: flex;
          justify-content: center;
          margin-bottom: 48px;
        }

        .ba-lnb-hero-demo-inner {
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 36px 48px;
          text-align: center;
          min-width: 320px;
        }

        .ba-lnb-hero-demo-label {
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .ba-lnb-hero-demo-date {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.08em;
          margin-bottom: 20px;
        }

        .ba-lnb-hero-demo-divider {
          width: 40px;
          height: 1px;
          background: rgba(255,255,255,0.2);
          margin: 0 auto 20px;
        }

        .ba-lnb-hero-demo-result {
          text-align: left;
        }

        .ba-lnb-hero-result-serial {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 6px;
          letter-spacing: 0.04rem;
        }
        .ba-lnb-hero-result-serial strong {
          color: #fff;
          background: rgba(255,255,255,0.1);
          padding: 2px 5px;
        }

        .ba-lnb-hero-result-name {
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.04rem;
        }

        /* Buttons */
        .ba-lnb-hero-btns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .ba-lnb-hero-btn-primary {
          padding: 16px 44px;
          background: #fff;
          border: 1.5px solid #fff;
          color: #000;
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ba-lnb-hero-btn-primary:hover {
          background: transparent;
          color: #fff;
        }

        .ba-lnb-hero-btn-ghost {
          padding: 16px 44px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.6);
          color: #fff;
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ba-lnb-hero-btn-ghost:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.9);
        }

        @media (max-width: 768px) {
          .ba-lnb-hero { min-height: auto; }
          .ba-lnb-hero-content { padding: 80px 20px; }
          .ba-lnb-hero-demo-inner { min-width: auto; padding: 28px 24px; }
        }

        /* Light theme */
        [data-theme="light"] .ba-lnb-hero { background: #f3f3f3; }
        [data-theme="light"] .ba-lnb-hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(243,243,243,0.55) 0%,
            rgba(243,243,243,0.75) 50%,
            rgba(243,243,243,0.95) 100%
          );
        }
        [data-theme="light"] .ba-lnb-hero-eyebrow { color: rgba(18,18,18,0.5); }
        [data-theme="light"] .ba-lnb-hero-h2 { color: #121212; text-shadow: none; }
        [data-theme="light"] .ba-lnb-hero-sub { color: rgba(18,18,18,0.55); }
        [data-theme="light"] .ba-lnb-hero-demo-inner {
          border-color: rgba(0,0,0,0.1);
          background: rgba(243,243,243,0.7);
        }
        [data-theme="light"] .ba-lnb-hero-demo-label { color: rgba(18,18,18,0.4); }
        [data-theme="light"] .ba-lnb-hero-demo-date { color: #121212; }
        [data-theme="light"] .ba-lnb-hero-demo-divider { background: rgba(0,0,0,0.15); }
        [data-theme="light"] .ba-lnb-hero-result-serial { color: rgba(18,18,18,0.45); }
        [data-theme="light"] .ba-lnb-hero-result-serial strong { color: #121212; background: rgba(0,0,0,0.06); }
        [data-theme="light"] .ba-lnb-hero-result-name { color: #121212; }
        [data-theme="light"] .ba-lnb-hero-btn-primary { background: #121212; color: #fff; border-color: #121212; }
        [data-theme="light"] .ba-lnb-hero-btn-primary:hover { background: transparent; color: #121212; }
        [data-theme="light"] .ba-lnb-hero-btn-ghost { border-color: rgba(18,18,18,0.5); color: #121212; }
        [data-theme="light"] .ba-lnb-hero-btn-ghost:hover { background: rgba(0,0,0,0.04); border-color: rgba(18,18,18,0.8); }
      `}</style>
    </section>
  );
}
