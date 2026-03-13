import { useState } from 'react';
import { useNav } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import PageWrapper from '../components/PageWrapper';
import { formatPrice } from '../data/currencyData';

const occasions = ['All', 'Birthday', 'Anniversary', 'Wedding', 'Corporate', 'Any Occasion'];

const TESTIMONIALS = [
  { name: 'Rahul Sharma', city: 'Delhi', text: 'Gifted my father a 1974 note for his 50th birthday. He was moved to tears. Absolutely priceless!', rating: 5 },
  { name: 'Priya Patel', city: 'Mumbai', text: 'The Anniversary Treasure Set made our 25th anniversary unforgettable. Beautifully packaged and authentic.', rating: 5 },
  { name: 'Amit Joshi', city: 'Jaipur', text: 'ML & Sons sourced a custom serial number note for my wedding. My guests were amazed!', rating: 5 },
];

const STEPS = [
  { num: '01', icon: '🎯', title: 'Choose Your Occasion', desc: 'Tell us the special date — birthday, anniversary, wedding, or any celebration.' },
  { num: '02', icon: '🔍', title: 'We Find the Perfect Note', desc: 'Our experts match serial numbers, year, and denomination to your date.' },
  { num: '03', icon: '🎁', title: 'Gift with Pride', desc: 'Receive a premium-packaged, certified collectible ready to amaze.' },
];

export default function GiftPage() {
  const { navigate } = useNav();
  const { giftPackages } = useData();
  const [activeOccasion, setActiveOccasion] = useState('All');

  const filtered = activeOccasion === 'All'
    ? giftPackages
    : giftPackages.filter(p => p.occasion === activeOccasion);

  return (
    <PageWrapper
      title="Gift the Extraordinary"
      subtitle="Turn milestones into heirlooms with rare Indian currency collectibles"
      breadcrumbs={[{ label: 'Gifts' }]}
      heroImage="https://rukminim2.flixcart.com/image/480/640/xif0q/printed-currency/8/z/2/1-10-different-old-note-collection-1-naaz-rare-collection-original-imahfdszbzgf2gfe.jpeg"
    >

      {/* How It Works */}
      <section className="gp-section">
        <h3 className="gp-section-title">How It Works</h3>
        <div className="gp-steps">
          {STEPS.map(s => (
            <div className="gp-step" key={s.num}>
              <div className="gp-step-num">{s.num}</div>
              <div className="gp-step-icon">{s.icon}</div>
              <h4 className="gp-step-title">{s.title}</h4>
              <p className="gp-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gift Packages */}
      <section className="gp-section">
        <h3 className="gp-section-title">Gift Packages</h3>
        <div className="gp-occasions">
          {occasions.map(o => (
            <button key={o} className={`gp-occ-pill ${activeOccasion === o ? 'active' : ''}`} onClick={() => setActiveOccasion(o)}>
              {o}
            </button>
          ))}
        </div>
        <div className="gp-grid">
          {filtered.map(pkg => (
            <div className="gp-pkg-card" key={pkg.id} style={{ '--pkg-color': pkg.color }}>
              {pkg.popular && <div className="gp-popular">★ Popular</div>}
              <div className="gp-pkg-icon" style={{ background: pkg.color + '18', borderColor: pkg.color + '44' }}>{pkg.icon}</div>
              <h4 className="gp-pkg-name">{pkg.name}</h4>
              <span className="gp-pkg-occ">{pkg.occasion}</span>
              <p className="gp-pkg-desc">{pkg.description}</p>
              <ul className="gp-pkg-list">
                {pkg.includes.map((item, i) => <li key={i}>✓ {item}</li>)}
              </ul>
              <div className="gp-pkg-price">Starting from <strong>{formatPrice(pkg.price)}</strong></div>
              <a className="gp-pkg-btn" href={`https://wa.me/917453957724?text=${encodeURIComponent(`Hi, I'm interested in the "${pkg.name}" gift package.`)}`} target="_blank" rel="noopener noreferrer">
                Inquire Now →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="gp-section">
        <h3 className="gp-section-title">What Our Gift Buyers Say</h3>
        <div className="gp-testimonials">
          {TESTIMONIALS.map((t, i) => (
            <div className="gp-testi-card" key={i}>
              <div className="gp-testi-stars">{'★'.repeat(t.rating)}</div>
              <p className="gp-testi-text">"{t.text}"</p>
              <div className="gp-testi-author">— {t.name}, <span>{t.city}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="gp-bottom-cta">
        <div className="gp-bottom-inner">
          <h3 className="gp-bottom-title">Have a Custom Gift in Mind?</h3>
          <p className="gp-bottom-desc">We can source any date, denomination, or serial pattern. Tell us your story and we'll find the note that tells it best.</p>
          <a href="tel:+917453957724" className="gp-btn-primary" style={{ textDecoration: 'none' }}>📞 Contact Us Now</a>
        </div>
      </section>

      <style>{`
        .gp-gold{background:linear-gradient(135deg,#d4a853,#f0c060);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .gp-btn-primary{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:linear-gradient(135deg,#d4a853,#e8b845);color:#080a0f;border:none;border-radius:10px;font-size:.9rem;font-weight:700;cursor:pointer;font-family:'Sora',sans-serif;transition:all .2s}
        .gp-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(212,168,83,.35)}

        .gp-section{max-width:1100px;margin:0 auto;padding:50px 24px}
        .gp-section-title{font-family:'Playfair Display',serif;font-size:1.6rem;color:#f0ead6;text-align:center;margin:0 0 10px}
        .gp-section-title::after{content:'';display:block;width:50px;height:2px;background:linear-gradient(90deg,transparent,#d4a853,transparent);margin:12px auto 30px}

        .gp-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .gp-step{background:#0f1218;border:1px solid #1e2530;border-radius:14px;padding:28px 22px;text-align:center;transition:all .25s}
        .gp-step:hover{border-color:rgba(196,150,40,.3);transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.4)}
        .gp-step-num{font-size:.7rem;font-weight:700;color:rgba(196,150,40,.4);letter-spacing:.15em;margin-bottom:12px}
        .gp-step-icon{font-size:2.2rem;margin-bottom:12px}
        .gp-step-title{font-size:.95rem;font-weight:700;color:#e8e0d0;margin:0 0 8px}
        .gp-step-desc{font-size:.82rem;color:rgba(180,175,165,.6);line-height:1.6;margin:0}

        .gp-occasions{display:flex;gap:8px;justify-content:center;margin-bottom:30px;flex-wrap:wrap}
        .gp-occ-pill{padding:8px 18px;border-radius:20px;border:1px solid rgba(196,150,40,.2);background:none;color:rgba(180,175,165,.6);font-size:.82rem;font-weight:600;cursor:pointer;font-family:'Sora',sans-serif;transition:all .2s}
        .gp-occ-pill:hover{border-color:rgba(196,150,40,.5);color:#d4a853}
        .gp-occ-pill.active{background:linear-gradient(135deg,rgba(196,150,40,.2),rgba(196,150,40,.08));border-color:rgba(196,150,40,.5);color:#f0c060}

        .gp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:24px}
        .gp-pkg-card{position:relative;background:#0f1218;border:1px solid #1e2530;border-radius:16px;padding:28px 24px;transition:all .3s;overflow:hidden}
        .gp-pkg-card:hover{border-color:var(--pkg-color,#d4a853);transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.5)}
        .gp-popular{position:absolute;top:14px;right:14px;background:rgba(212,168,83,.15);border:1px solid rgba(212,168,83,.4);color:#f0c060;font-size:.68rem;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:.05em}
        .gp-pkg-icon{width:56px;height:56px;border-radius:14px;border:1px solid;display:flex;align-items:center;justify-content:center;font-size:1.6rem;margin-bottom:16px}
        .gp-pkg-name{font-size:1.1rem;font-weight:700;color:#e8e0d0;margin:0 0 6px;font-family:'Playfair Display',serif}
        .gp-pkg-occ{font-size:.7rem;color:rgba(196,150,40,.6);text-transform:uppercase;letter-spacing:.08em;font-weight:600}
        .gp-pkg-desc{font-size:.82rem;color:rgba(180,175,165,.6);line-height:1.7;margin:14px 0}
        .gp-pkg-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:6px}
        .gp-pkg-list li{font-size:.78rem;color:rgba(180,175,165,.55)}
        .gp-pkg-price{font-size:.85rem;color:rgba(180,175,165,.5);margin-bottom:16px}
        .gp-pkg-price strong{color:#d4a853;font-size:1.05rem}
        .gp-pkg-btn{display:block;text-align:center;padding:11px;background:rgba(196,150,40,.1);border:1px solid rgba(196,150,40,.3);border-radius:9px;color:#d4a853;font-size:.85rem;font-weight:600;text-decoration:none;font-family:'Sora',sans-serif;transition:all .2s}
        .gp-pkg-btn:hover{background:rgba(196,150,40,.2);border-color:rgba(196,150,40,.6)}

        .gp-testimonials{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
        .gp-testi-card{background:#0f1218;border:1px solid #1e2530;border-radius:14px;padding:24px;transition:all .2s}
        .gp-testi-card:hover{border-color:rgba(196,150,40,.25)}
        .gp-testi-stars{color:#f0c060;font-size:.9rem;margin-bottom:10px;letter-spacing:2px}
        .gp-testi-text{font-size:.85rem;color:rgba(180,175,165,.7);line-height:1.7;margin:0 0 14px;font-style:italic}
        .gp-testi-author{font-size:.78rem;color:rgba(196,150,40,.7);font-weight:600}
        .gp-testi-author span{color:rgba(180,175,165,.4);font-weight:400}

        .gp-bottom-cta{margin-top:40px;background:linear-gradient(180deg,transparent,rgba(196,150,40,.04));border-top:1px solid rgba(196,150,40,.1);padding:60px 24px}
        .gp-bottom-inner{max-width:600px;margin:0 auto;text-align:center}
        .gp-bottom-title{font-family:'Playfair Display',serif;font-size:1.6rem;color:#f0ead6;margin:0 0 14px}
        .gp-bottom-desc{color:rgba(180,175,165,.6);font-size:.9rem;line-height:1.7;margin:0 0 28px}

        @media(max-width:768px){
          .gp-steps{grid-template-columns:1fr}
        }
      `}</style>
    </PageWrapper>
  );
}
