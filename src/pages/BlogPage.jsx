import { useState } from 'react';
import { useNav } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import PageWrapper from '../components/PageWrapper';

const CATEGORIES = ['All', 'Collector Tips', 'History', 'Authentication', 'Gifting'];

export default function BlogPage() {
  const { navigate } = useNav();
  const { blogPosts } = useData();
  const [activeCat, setActiveCat] = useState('All');
  const [expandedPost, setExpandedPost] = useState(null);

  const filtered = activeCat === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCat);
  const featured = blogPosts.filter(p => p.featured);

  return (
    <PageWrapper
      title="Knowledge Centre"
      subtitle="Expert guides, history, and tips for Indian currency collectors"
      breadcrumbs={[{ label: 'Blog' }]}
    >
      {/* Featured Section */}
      <section className="bp-featured">
        <h3 className="bp-section-title">Featured Articles</h3>
        <div className="bp-featured-grid">
          {featured.slice(0, 3).map(post => (
            <div className="bp-feat-card" key={post.id} onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}>
              <div className="bp-feat-icon">{post.icon}</div>
              <div className="bp-feat-badge">{post.category}</div>
              <h4 className="bp-feat-title">{post.title}</h4>
              <p className="bp-feat-excerpt">{post.excerpt}</p>
              <div className="bp-feat-meta">
                <span>{post.readTime}</span>
                <span>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              {expandedPost === post.id && (
                <div className="bp-expanded">
                  <div className="bp-exp-divider" />
                  <p className="bp-exp-content">
                    This is a preview of the full article. The complete guide covers detailed analysis,
                    expert insights, and practical tips that every collector should know.
                    <br /><br />
                    ML & SONS has been dealing in antique Indian currency for over 25 years.
                    Our expertise spans colonial-era banknotes, princely state currencies,
                    and modern collectible serial numbers.
                  </p>
                  <a className="bp-read-full" href="tel:+917453957724">
                    Contact us for the full guide →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* All Articles */}
      <section className="bp-all">
        <h3 className="bp-section-title">All Articles</h3>
        <div className="bp-cat-row">
          {CATEGORIES.map(c => (
            <button key={c} className={`bp-cat-pill ${activeCat === c ? 'active' : ''}`}
              onClick={() => setActiveCat(c)}>{c}</button>
          ))}
        </div>

        <div className="bp-article-list">
          {filtered.map(post => (
            <div className="bp-article-card" key={post.id} onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}>
              <div className="bp-article-left">
                <span className="bp-article-icon">{post.icon}</span>
              </div>
              <div className="bp-article-body">
                <div className="bp-article-top">
                  <span className="bp-article-cat">{post.category}</span>
                  <span className="bp-article-time">{post.readTime}</span>
                </div>
                <h4 className="bp-article-title">{post.title}</h4>
                <p className="bp-article-excerpt">{post.excerpt}</p>
                <div className="bp-article-tags">
                  {post.tags.map(t => <span key={t} className="bp-tag">#{t}</span>)}
                </div>
                <div className="bp-article-date">
                  {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                {expandedPost === post.id && (
                  <div className="bp-expanded" style={{ marginTop: 16 }}>
                    <div className="bp-exp-divider" />
                    <p className="bp-exp-content">
                      Full article content would appear here with in-depth coverage of {post.title.toLowerCase()}.
                      Our team of numismatic experts shares practical knowledge accumulated over 25+ years.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bp-newsletter">
        <div className="bp-news-inner">
          <h3 className="bp-news-title">Stay Updated</h3>
          <p className="bp-news-desc">Get the latest articles, new arrivals, and collector tips delivered to your phone.</p>
          <a className="bp-news-btn" href="https://wa.me/917453957724?text=I'd like to subscribe to ML %26 SONS updates" target="_blank" rel="noopener noreferrer">
            Join on WhatsApp →
          </a>
        </div>
      </section>

      <style>{`
        .bp-featured, .bp-all { padding-bottom: 50px; }

        .bp-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #1a1a1a;
        }

        .bp-featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
        }

        .bp-feat-card {
          background: #0a0a0a;
          padding: 28px 24px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .bp-feat-card:hover { background: #111; }

        .bp-feat-icon {
          font-size: 1.4rem;
          margin-bottom: 14px;
        }

        .bp-feat-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          border: 1px solid #1e1e1e;
          padding: 3px 10px;
          margin-bottom: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        .bp-feat-title {
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          margin: 0 0 10px;
          line-height: 1.4;
        }

        .bp-feat-excerpt {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          margin: 0 0 14px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bp-feat-meta {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          font-family: 'Jost', sans-serif;
        }

        .bp-cat-row {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .bp-cat-pill {
          padding: 6px 14px;
          border: 1px solid #1e1e1e;
          background: none;
          color: rgba(255,255,255,0.4);
          font-size: 12px;
          font-weight: 400;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          transition: all 0.2s;
        }
        .bp-cat-pill:hover { border-color: rgba(255,255,255,0.3); color: rgba(255,255,255,0.7); }
        .bp-cat-pill.active {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
          background: rgba(255,255,255,0.05);
        }

        .bp-article-list {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #1a1a1a;
          border: 1px solid #1a1a1a;
        }

        .bp-article-card {
          display: flex;
          gap: 18px;
          background: #0a0a0a;
          padding: 22px 20px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .bp-article-card:hover { background: #111; }

        .bp-article-left { flex-shrink: 0; }
        .bp-article-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid #1e1e1e;
          font-size: 1.2rem;
        }

        .bp-article-body { flex: 1; min-width: 0; }

        .bp-article-top {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 8px;
        }

        .bp-article-cat {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          border: 1px solid #1e1e1e;
          padding: 2px 8px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
        }

        .bp-article-time {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          font-family: 'Jost', sans-serif;
        }

        .bp-article-title {
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          margin: 0 0 8px;
          line-height: 1.35;
          font-family: 'Jost', sans-serif;
        }

        .bp-article-excerpt {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          line-height: 1.65;
          margin: 0 0 10px;
          font-family: 'Jost', sans-serif;
        }

        .bp-article-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
        .bp-tag {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          border: 1px solid #1e1e1e;
          padding: 2px 7px;
          font-family: 'Jost', sans-serif;
        }

        .bp-article-date {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          font-family: 'Jost', sans-serif;
        }

        .bp-expanded { animation: bpFade 0.3s ease; }
        @keyframes bpFade { from { opacity: 0; } to { opacity: 1; } }

        .bp-exp-divider {
          height: 1px;
          background: #1a1a1a;
          margin: 12px 0;
        }

        .bp-exp-content {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          margin: 0;
          font-family: 'Jost', sans-serif;
        }

        .bp-read-full {
          display: inline-block;
          margin-top: 12px;
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          font-weight: 400;
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          transition: color 0.2s;
        }
        .bp-read-full:hover { color: #fff; }

        .bp-newsletter {
          border-top: 1px solid #1a1a1a;
          padding: 60px 0;
        }

        .bp-news-inner {
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
        }

        .bp-news-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 12px;
        }

        .bp-news-desc {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          margin: 0 0 24px;
        }

        .bp-news-btn {
          display: inline-block;
          padding: 12px 32px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.2s;
        }
        .bp-news-btn:hover {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        @media (max-width: 900px) {
          .bp-featured-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .bp-article-card { flex-direction: column; gap: 12px; }
        }

        /* Light theme */
        [data-theme="light"] .bp-section-title { color: #111; border-bottom-color: #e5e5e5; }
        [data-theme="light"] .bp-featured-grid { background: #e5e5e5; border-color: #e5e5e5; }
        [data-theme="light"] .bp-feat-card { background: #f9f6f0; }
        [data-theme="light"] .bp-feat-card:hover { background: #f0ede6; }
        [data-theme="light"] .bp-feat-badge { color: rgba(0,0,0,0.4); border-color: #e5e5e5; }
        [data-theme="light"] .bp-feat-title { color: #111; }
        [data-theme="light"] .bp-feat-excerpt { color: rgba(0,0,0,0.45); }
        [data-theme="light"] .bp-feat-meta { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .bp-cat-pill { border-color: #e5e5e5; color: rgba(0,0,0,0.4); }
        [data-theme="light"] .bp-cat-pill:hover { border-color: rgba(0,0,0,0.3); color: rgba(0,0,0,0.7); }
        [data-theme="light"] .bp-cat-pill.active { border-color: rgba(0,0,0,0.5); color: #111; background: rgba(0,0,0,0.04); }
        [data-theme="light"] .bp-article-list { background: #e5e5e5; border-color: #e5e5e5; }
        [data-theme="light"] .bp-article-card { background: #f9f6f0; }
        [data-theme="light"] .bp-article-card:hover { background: #f0ede6; }
        [data-theme="light"] .bp-article-icon { border-color: #e5e5e5; }
        [data-theme="light"] .bp-article-cat { color: rgba(0,0,0,0.4); border-color: #e5e5e5; }
        [data-theme="light"] .bp-article-time { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .bp-article-title { color: #111; }
        [data-theme="light"] .bp-article-excerpt { color: rgba(0,0,0,0.45); }
        [data-theme="light"] .bp-tag { color: rgba(0,0,0,0.3); border-color: #e5e5e5; }
        [data-theme="light"] .bp-article-date { color: rgba(0,0,0,0.25); }
        [data-theme="light"] .bp-exp-divider { background: #e5e5e5; }
        [data-theme="light"] .bp-exp-content { color: rgba(0,0,0,0.45); }
        [data-theme="light"] .bp-read-full { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .bp-read-full:hover { color: #111; }
        [data-theme="light"] .bp-newsletter { border-top-color: #e5e5e5; }
        [data-theme="light"] .bp-news-title { color: #111; }
        [data-theme="light"] .bp-news-desc { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .bp-news-btn { border-color: rgba(0,0,0,0.35); color: #111; }
        [data-theme="light"] .bp-news-btn:hover { background: #111; color: #fff; border-color: #111; }
      `}</style>
    </PageWrapper>
  );
}
