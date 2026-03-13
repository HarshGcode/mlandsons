import { useData } from '../context/DataContext';

export default function TrustBadges() {
  const { platformStats } = useData();
  return (
    <section className="tb-root">
      <div className="tb-inner">
        <div className="tb-divider-top" />

        <div className="tb-grid">
          {platformStats.map((s, i) => (
            <div className="tb-card" key={i}>
              <div className="tb-icon">{s.icon}</div>
              <div className="tb-value">{s.value}</div>
              <div className="tb-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="tb-tagline">
          Trusted by collectors across India &amp; worldwide since generations
        </div>
      </div>

      <style>{`
        .tb-root {
          background: #111;
          padding: 80px 0;
          border-top: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
        }

        .tb-divider-top { display: none; }

        .tb-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .tb-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid #1e1e1e;
          margin-bottom: 40px;
        }

        .tb-card {
          padding: 36px 24px;
          text-align: center;
          border-right: 1px solid #1e1e1e;
          transition: background 0.2s;
        }
        .tb-card:last-child { border-right: none; }
        .tb-card:hover { background: #161616; }

        .tb-icon { font-size: 2rem; margin-bottom: 12px; opacity: 0.7; }

        .tb-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
          margin-bottom: 6px;
        }

        .tb-label {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .tb-tagline {
          text-align: center;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        @media (max-width: 700px) {
          .tb-grid { grid-template-columns: repeat(2, 1fr); }
          .tb-card:nth-child(2) { border-right: none; }
          .tb-card { border-bottom: 1px solid #1e1e1e; }
        }

        @media (max-width: 400px) {
          .tb-grid { grid-template-columns: 1fr; }
          .tb-card { border-right: none; }
        }

        [data-theme="light"] .tb-root { background: #f5f5f5; border-color: #e5e5e5; }
        [data-theme="light"] .tb-grid { border-color: #e5e5e5; }
        [data-theme="light"] .tb-card { border-color: #e5e5e5; }
        [data-theme="light"] .tb-card:hover { background: #efefef; }
        [data-theme="light"] .tb-value { color: #111; }
        [data-theme="light"] .tb-label { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .tb-tagline { color: rgba(0,0,0,0.3); }
      `}</style>
    </section>
  );
}
