import { useState, useRef } from 'react';
import { useNav } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import PageWrapper from '../components/PageWrapper';
import NoteCard from '../components/NoteCard';
import { searchByDate } from '../data/currencyData';

const POPULAR_DATES = [
  { label: '26 Jan — Republic Day', day: '26', month: '01', year: '1950' },
  { label: '15 Aug — Independence Day', day: '15', month: '08', year: '1947' },
  { label: '2 Oct — Gandhi Jayanti', day: '02', month: '10', year: '1869' },
  { label: '14 Nov — Children\'s Day', day: '14', month: '11', year: '1889' },
];

const OCCASIONS = ['Birthday', 'Anniversary', 'Republic Day', 'Independence Day', 'Custom'];

export default function LuckyNotePage() {
  const { navigate } = useNav();
  const { products } = useData();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(new Set());
  const resultsRef = useRef(null);

  const toggleSave = (id) => setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const handleSearch = () => {
    const dateStr = `${day.padStart(2, '0')}${month.padStart(2, '0')}${year}`;
    if (dateStr.replace(/0/g, '').length < 2) return;
    setLoading(true);
    setTimeout(() => {
      const found = searchByDate(dateStr, products);
      // Also add relevant category matches
      const extras = products.filter(p =>
        (occasion === 'Birthday' && p.category === 'birthday-notes') ||
        (occasion === 'Anniversary' && p.category === 'anniversary') ||
        (year && String(p.year) === year)
      ).filter(p => !found.find(f => f.id === p.id));
      setResults([...found, ...extras.slice(0, 3)]);
      setLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 1200);
  };

  const autoFillDate = (d) => {
    setDay(d.day);
    setMonth(d.month);
    setYear(d.year);
  };

  const dateDisplay = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year || '____'}`;

  return (
    <PageWrapper
      title="Find Your Lucky Note ✨"
      subtitle="Enter a birthdate or special date and discover matching currency notes"
      breadcrumbs={[{ label: 'Lucky Note' }]}
      heroImage="https://www.marketcalls.in/wp-content/uploads/2011/11/History-of-Rupee.jpg"
    >
      {/* Input Card */}
      <section className="ln-input-section">
        <div className="ln-input-card">
          <div className="ln-card-glow" />
          <h3 className="ln-card-title">Enter Your Special Date</h3>

          <div className="ln-date-row">
            <div className="ln-input-group">
              <label className="ln-label">Day</label>
              <input className="ln-input" type="text" placeholder="DD" maxLength={2} value={day}
                onChange={e => setDay(e.target.value.replace(/\D/g, ''))} />
            </div>
            <span className="ln-sep">/</span>
            <div className="ln-input-group">
              <label className="ln-label">Month</label>
              <input className="ln-input" type="text" placeholder="MM" maxLength={2} value={month}
                onChange={e => setMonth(e.target.value.replace(/\D/g, ''))} />
            </div>
            <span className="ln-sep">/</span>
            <div className="ln-input-group ln-input-year">
              <label className="ln-label">Year</label>
              <input className="ln-input" type="text" placeholder="YYYY" maxLength={4} value={year}
                onChange={e => setYear(e.target.value.replace(/\D/g, ''))} />
            </div>
          </div>

          <div className="ln-name-row">
            <div className="ln-input-group" style={{ flex: 1 }}>
              <label className="ln-label">Name (optional)</label>
              <input className="ln-input" type="text" placeholder="Whose lucky note is this?"
                value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>

          <div className="ln-occasion-row">
            <label className="ln-label" style={{ marginBottom: 8 }}>Occasion</label>
            <div className="ln-occ-pills">
              {OCCASIONS.map(o => (
                <button key={o} className={`ln-occ-pill ${occasion === o ? 'active' : ''}`}
                  onClick={() => setOccasion(o)}>{o}</button>
              ))}
            </div>
          </div>

          <button className="ln-search-btn" onClick={handleSearch}
            disabled={loading || (!day && !month && !year)}>
            {loading ? (
              <span className="ln-spinner" />
            ) : (
              <>✨ Find My Lucky Note</>
            )}
          </button>
        </div>
      </section>

      {/* Popular Dates */}
      <section className="ln-popular">
        <h4 className="ln-pop-title">Quick Pick — Historic Dates</h4>
        <div className="ln-pop-grid">
          {POPULAR_DATES.map((d, i) => (
            <button key={i} className="ln-pop-btn" onClick={() => autoFillDate(d)}>
              <span className="ln-pop-date">{d.day}/{d.month}</span>
              <span className="ln-pop-label">{d.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="ln-how">
        <div className="ln-how-inner">
          <h4 className="ln-how-title">🔍 How We Match Your Date</h4>
          <ul className="ln-how-list">
            <li>We search serial numbers containing your full date (DDMMYYYY)</li>
            <li>We also match partial patterns — day+month, or year alone</li>
            <li>Our inventory of 5,000+ notes means high chance of a match</li>
            <li>Can't find an exact match? We source custom notes within 7 days</li>
          </ul>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="ln-loading">
          <div className="ln-loading-icon">🔮</div>
          <p>Searching through 5,000+ notes for {dateDisplay}...</p>
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <section className="ln-results" ref={resultsRef}>
          <h3 className="ln-results-title">
            {results.length > 0
              ? <>We found <span className="gp-gold">{results.length} matches</span> for {dateDisplay}{name ? ` (${name})` : ''}</>
              : 'No exact match found — but we can source it!'}
          </h3>

          {results.length > 0 ? (
            <div className="ln-results-grid">
              {results.map(p => (
                <NoteCard key={p.id} product={p} saved={saved.has(p.id)} onToggleSave={toggleSave} />
              ))}
            </div>
          ) : (
            <div className="ln-no-result">
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🔎</div>
              <p>We don't have an exact match in our current inventory, but we can source notes matching <strong>{dateDisplay}</strong> within 7 business days.</p>
              <a className="ln-cta-btn" href={`https://wa.me/917453957724?text=${encodeURIComponent(`Hi, I'm looking for a currency note matching the date ${dateDisplay}${name ? ' for ' + name : ''}.`)}`}
                target="_blank" rel="noopener noreferrer">
                Request Custom Note →
              </a>
            </div>
          )}

          {/* Always show request custom */}
          {results.length > 0 && (
            <div className="ln-custom-card">
              <div className="ln-custom-icon">📋</div>
              <div>
                <h4 style={{ margin: '0 0 6px', color: '#e8e0d0', fontSize: '.95rem' }}>Want a different denomination or condition?</h4>
                <p style={{ margin: 0, color: 'rgba(180,175,165,.6)', fontSize: '.82rem' }}>We can source custom date notes. Contact us with your requirements.</p>
              </div>
              <a className="ln-cta-btn" href="tel:+917453957724">📞 Call Us</a>
            </div>
          )}
        </section>
      )}

      {/* Certificate Preview */}
      {name && (
        <section className="ln-cert-section">
          <h4 className="ln-pop-title" style={{ textAlign: 'center' }}>Certificate Preview</h4>
          <div className="ln-cert">
            <div className="ln-cert-inner">
              <div className="ln-cert-top">Certificate of Authenticity</div>
              <div className="ln-cert-divider" />
              <p className="ln-cert-text">This certifies that the currency note presented to</p>
              <h3 className="ln-cert-name">{name}</h3>
              <p className="ln-cert-text">bearing serial number matching the date <strong>{dateDisplay}</strong></p>
              <p className="ln-cert-text">is an authentic Indian currency collectible verified by ML & SONS.</p>
              <div className="ln-cert-divider" />
              <div className="ln-cert-footer">
                <span>ML & SONS</span>
                <span>Rawatpara, Agra</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .ln-input-section{max-width:560px;margin:0 auto;padding:10px 24px 40px}
        .ln-input-card{position:relative;background:#0f1218;border:1px solid rgba(196,150,40,.25);border-radius:18px;padding:36px 32px;overflow:hidden}
        .ln-card-glow{position:absolute;top:-40px;right:-40px;width:160px;height:160px;background:radial-gradient(circle,rgba(196,150,40,.1)0%,transparent 70%);pointer-events:none}
        .ln-card-title{font-family:'Playfair Display',serif;font-size:1.2rem;color:#f0ead6;margin:0 0 24px;text-align:center}

        .ln-date-row{display:flex;align-items:flex-end;gap:8px;margin-bottom:18px;justify-content:center}
        .ln-sep{color:rgba(196,150,40,.4);font-size:1.5rem;font-weight:300;padding-bottom:6px}
        .ln-input-group{display:flex;flex-direction:column;gap:4px}
        .ln-input-year{flex:1.5}
        .ln-label{font-size:.68rem;color:rgba(196,150,40,.6);font-weight:600;letter-spacing:.08em;text-transform:uppercase}
        .ln-input{background:rgba(255,255,255,.04);border:1px solid rgba(196,150,40,.25);border-radius:10px;padding:12px 14px;color:#e8e0d0;font-size:1.1rem;font-family:'Sora',sans-serif;text-align:center;width:70px;transition:all .2s;outline:none}
        .ln-input-year .ln-input{width:100px}
        .ln-input:focus{border-color:rgba(196,150,40,.6);box-shadow:0 0 16px rgba(196,150,40,.15)}
        .ln-name-row{display:flex;gap:12px;margin-bottom:18px}
        .ln-name-row .ln-input{width:100%;text-align:left;font-size:.9rem}
        .ln-occasion-row{margin-bottom:24px}
        .ln-occ-pills{display:flex;gap:6px;flex-wrap:wrap}
        .ln-occ-pill{padding:6px 14px;border-radius:18px;border:1px solid rgba(196,150,40,.2);background:none;color:rgba(180,175,165,.6);font-size:.78rem;font-weight:600;cursor:pointer;font-family:'Sora',sans-serif;transition:all .2s}
        .ln-occ-pill:hover{border-color:rgba(196,150,40,.5);color:#d4a853}
        .ln-occ-pill.active{background:rgba(196,150,40,.15);border-color:rgba(196,150,40,.5);color:#f0c060}

        .ln-search-btn{width:100%;padding:14px;background:linear-gradient(135deg,#d4a853,#e8b845);color:#080a0f;border:none;border-radius:11px;font-size:1rem;font-weight:700;cursor:pointer;font-family:'Sora',sans-serif;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;min-height:52px}
        .ln-search-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 24px rgba(212,168,83,.35)}
        .ln-search-btn:disabled{opacity:.5;cursor:not-allowed}
        .ln-spinner{width:22px;height:22px;border:3px solid rgba(8,10,15,.2);border-top-color:#080a0f;border-radius:50%;animation:lnSpin .7s linear infinite}
        @keyframes lnSpin{to{transform:rotate(360deg)}}

        .ln-popular{max-width:700px;margin:0 auto;padding:0 24px 40px}
        .ln-pop-title{font-size:.85rem;color:rgba(196,150,40,.6);font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin:0 0 16px}
        .ln-pop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
        .ln-pop-btn{display:flex;align-items:center;gap:12px;background:#0f1218;border:1px solid #1e2530;border-radius:10px;padding:12px 14px;cursor:pointer;transition:all .2s;text-align:left}
        .ln-pop-btn:hover{border-color:rgba(196,150,40,.35);background:rgba(196,150,40,.05)}
        .ln-pop-date{font-family:'Courier New',monospace;font-size:.9rem;font-weight:700;color:#d4a853;min-width:40px}
        .ln-pop-label{font-size:.78rem;color:rgba(180,175,165,.6);font-family:'Sora',sans-serif}

        .ln-how{max-width:700px;margin:0 auto;padding:0 24px 50px}
        .ln-how-inner{background:#0f1218;border:1px solid #1e2530;border-radius:14px;padding:24px 28px}
        .ln-how-title{font-size:.95rem;color:#e8e0d0;margin:0 0 14px;font-weight:700}
        .ln-how-list{padding-left:18px;margin:0;display:flex;flex-direction:column;gap:8px}
        .ln-how-list li{font-size:.82rem;color:rgba(180,175,165,.6);line-height:1.6}

        .ln-loading{text-align:center;padding:40px 24px}
        .ln-loading-icon{font-size:3rem;animation:lnBounce 1s ease-in-out infinite}
        .ln-loading p{color:rgba(180,175,165,.6);font-size:.9rem;margin-top:12px}
        @keyframes lnBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

        .ln-results{max-width:1100px;margin:0 auto;padding:0 24px 60px}
        .ln-results-title{font-family:'Playfair Display',serif;font-size:1.4rem;color:#f0ead6;margin:0 0 28px;text-align:center}
        .gp-gold{background:linear-gradient(135deg,#d4a853,#f0c060);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .ln-results-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}

        .ln-no-result{background:#0f1218;border:1px solid #1e2530;border-radius:16px;padding:40px;text-align:center;max-width:500px;margin:0 auto}
        .ln-no-result p{color:rgba(180,175,165,.6);font-size:.9rem;line-height:1.7;margin:0 0 20px}
        .ln-no-result strong{color:#d4a853}
        .ln-cta-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;background:rgba(196,150,40,.12);border:1px solid rgba(196,150,40,.35);border-radius:9px;color:#d4a853;font-size:.85rem;font-weight:600;text-decoration:none;font-family:'Sora',sans-serif;transition:all .2s}
        .ln-cta-btn:hover{background:rgba(196,150,40,.22);border-color:rgba(196,150,40,.6)}

        .ln-custom-card{display:flex;align-items:center;gap:20px;background:#0f1218;border:1px solid rgba(196,150,40,.15);border-radius:14px;padding:20px 24px;margin-top:28px}
        .ln-custom-icon{font-size:2rem}

        .ln-cert-section{max-width:560px;margin:0 auto;padding:0 24px 60px}
        .ln-cert{border:3px double rgba(196,150,40,.5);border-radius:16px;background:linear-gradient(135deg,#0f1218,#121820);padding:6px}
        .ln-cert-inner{border:1px solid rgba(196,150,40,.2);border-radius:12px;padding:40px 32px;text-align:center}
        .ln-cert-top{font-family:'Playfair Display',serif;font-size:1.3rem;color:#d4a853;letter-spacing:.1em;margin-bottom:8px}
        .ln-cert-divider{width:60%;height:1px;background:linear-gradient(90deg,transparent,rgba(196,150,40,.35),transparent);margin:16px auto}
        .ln-cert-text{font-size:.82rem;color:rgba(180,175,165,.6);margin:8px 0;line-height:1.6}
        .ln-cert-text strong{color:#d4a853}
        .ln-cert-name{font-family:'Playfair Display',serif;font-size:1.6rem;color:#f0ead6;margin:12px 0;letter-spacing:.06em}
        .ln-cert-footer{display:flex;justify-content:space-between;font-size:.72rem;color:rgba(196,150,40,.5);font-weight:600;letter-spacing:.08em;text-transform:uppercase}

        @media(max-width:520px){
          .ln-input-card{padding:24px 18px}
          .ln-date-row{gap:4px}
          .ln-input{width:55px;padding:10px 8px;font-size:.95rem}
          .ln-input-year .ln-input{width:80px}
          .ln-custom-card{flex-direction:column;text-align:center}
        }
      `}</style>
    </PageWrapper>
  );
}
