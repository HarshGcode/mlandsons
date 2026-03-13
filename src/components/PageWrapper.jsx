import { useNav } from '../context/NavigationContext';

const PageWrapper = ({ children, title, subtitle, backLabel = 'Back to Home', backPage = 'home', breadcrumbs = [], heroImage }) => {
  const { navigate } = useNav();

  const isHero = !!heroImage;

  return (
    <>
      <div className="pw-root">
        {/* Top Nav Bar */}
        <div className="pw-topbar">
          <button className="pw-back-btn" onClick={() => navigate(backPage)}>
            ← {backLabel}
          </button>

          {/* Breadcrumbs */}
          <div className="pw-breadcrumbs">
            <span className="pw-bc-link" onClick={() => navigate('home')}>Home</span>
            {breadcrumbs.map((bc, i) => (
              <span key={i} className="pw-bc-item">
                <span className="pw-bc-sep">›</span>
                {bc.page ? (
                  <span className="pw-bc-link" onClick={() => navigate(bc.page)}>{bc.label}</span>
                ) : (
                  <span className="pw-bc-current">{bc.label}</span>
                )}
              </span>
            ))}
          </div>

          {/* Logo */}
          <button className="pw-logo" onClick={() => navigate('home')}>
            <span className="pw-logo-text">ML & SONS</span>
          </button>
        </div>

        {/* Page Header — Hero or Standard */}
        {(title || subtitle) && (
          isHero ? (
            <div className="pw-hero">
              <div className="pw-hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
              <div className="pw-hero-overlay" />
              <div className="pw-hero-content">
                <p className="pw-hero-eyebrow">ML & SONS — EST. AGRA</p>
                {title && <h1 className="pw-hero-h1">{title}</h1>}
                {subtitle && <p className="pw-hero-sub">{subtitle}</p>}
              </div>
            </div>
          ) : (
            <div className="pw-header">
              {title && <h1 className="pw-title">{title}</h1>}
              {subtitle && <p className="pw-subtitle">{subtitle}</p>}
            </div>
          )
        )}

        {/* Content */}
        <div className="pw-content">
          {children}
        </div>
      </div>

      <style>{`
        .pw-root {
          min-height: 100vh;
          background: #0a0a0a;
          color: #fff;
        }

        .pw-topbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10,10,10,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #1a1a1a;
          padding: 0 32px;
          height: 56px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pw-back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          padding: 6px 14px;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          font-size: 12px;
          font-weight: 400;
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.04em;
          transition: all 0.2s;
        }
        .pw-back-btn:hover {
          border-color: rgba(255,255,255,0.4);
          color: #fff;
        }

        .pw-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          font-family: 'Jost', sans-serif;
        }

        .pw-bc-link {
          cursor: pointer;
          color: rgba(255,255,255,0.45);
          transition: color 0.2s;
        }
        .pw-bc-link:hover {
          color: #fff;
        }

        .pw-bc-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pw-bc-sep {
          color: rgba(255,255,255,0.2);
        }

        .pw-bc-current {
          color: rgba(255,255,255,0.7);
        }

        .pw-logo {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .pw-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.12em;
        }

        /* ── Standard Header ── */
        .pw-header {
          text-align: center;
          padding: 60px 32px 40px;
          border-bottom: 1px solid #1a1a1a;
        }

        .pw-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 600;
          color: #fff;
          margin: 0 0 12px;
          letter-spacing: 0.02em;
        }

        .pw-subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── Hero Header ── */
        .pw-hero {
          position: relative;
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }

        .pw-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.04);
          animation: pw-ken-burns 14s ease-in-out infinite alternate;
        }

        @keyframes pw-ken-burns {
          from { transform: scale(1.04); }
          to   { transform: scale(1.12); }
        }

        .pw-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.35) 0%,
            rgba(0,0,0,0.55) 50%,
            rgba(0,0,0,0.75) 100%
          );
          pointer-events: none;
        }

        .pw-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 60px 24px;
          max-width: 800px;
        }

        .pw-hero-eyebrow {
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .pw-hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5.5vw, 72px);
          font-weight: 700;
          color: #fff;
          line-height: 1.08;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 20px;
          text-shadow: 0 4px 30px rgba(0,0,0,0.5);
        }

        .pw-hero-sub {
          font-family: 'Assistant', 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.06rem;
          color: rgba(255,255,255,0.65);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .pw-content {
          max-width: 1360px;
          margin: 0 auto;
          padding: 40px 32px;
        }

        /* Light theme */
        [data-theme="light"] .pw-root { background: #f9f6f0; color: #111; }
        [data-theme="light"] .pw-topbar { background: rgba(249,246,240,0.95); border-bottom-color: #e5e5e5; }
        [data-theme="light"] .pw-back-btn { border-color: rgba(0,0,0,0.15); color: rgba(0,0,0,0.5); }
        [data-theme="light"] .pw-back-btn:hover { border-color: rgba(0,0,0,0.4); color: #111; }
        [data-theme="light"] .pw-breadcrumbs { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .pw-bc-link { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .pw-bc-link:hover { color: #111; }
        [data-theme="light"] .pw-bc-sep { color: rgba(0,0,0,0.2); }
        [data-theme="light"] .pw-bc-current { color: rgba(0,0,0,0.7); }
        [data-theme="light"] .pw-logo-text { color: #111; }
        [data-theme="light"] .pw-header { border-bottom-color: #e5e5e5; }
        [data-theme="light"] .pw-title { color: #111; }
        [data-theme="light"] .pw-subtitle { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .pw-hero { background: #f3f3f3; }
        [data-theme="light"] .pw-hero-overlay {
          background: linear-gradient(to bottom, rgba(243,243,243,0.5) 0%, rgba(243,243,243,0.7) 50%, rgba(243,243,243,0.9) 100%);
        }
        [data-theme="light"] .pw-hero-eyebrow { color: rgba(18,18,18,0.5); }
        [data-theme="light"] .pw-hero-h1 { color: #121212; text-shadow: none; }
        [data-theme="light"] .pw-hero-sub { color: rgba(18,18,18,0.55); }
      `}</style>
    </>
  );
};

export default PageWrapper;
