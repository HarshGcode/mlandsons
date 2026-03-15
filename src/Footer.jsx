import React, { useState } from "react";
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowRight } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <>
      {/* ── Trust Badges ── */}
      <div className="ba-trust">
        <div className="ba-trust-inner">
          {[
            { icon: "🚚", title: "Free Shipping", sub: "No Extra Costs" },
            { icon: "↩", title: "Easy Returns", sub: "Return with Ease" },
            { icon: "🔒", title: "Secure Checkout", sub: "100% Safe & Trusted" },
            { icon: "✓", title: "Authentic Only", sub: "100% Genuine Items" },
          ].map((b) => (
            <div key={b.title} className="ba-trust-item">
              <span className="ba-trust-icon">{b.icon}</span>
              <div>
                <div className="ba-trust-title">{b.title}</div>
                <div className="ba-trust-sub">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="ba-footer">
        <div className="ba-footer-inner">

          {/* Brand */}
          <div className="ba-footer-brand">
            <div className="ba-footer-logo">
              <span className="ba-footer-logo-text">ML &amp; SONS</span>
              <span className="ba-footer-logo-sub">Antique Currency Dealers</span>
            </div>
            <p className="ba-footer-desc">
              Authentic antique currency, rare coins, and collectible pieces.
              Trusted by collectors across India for over 25 years.
            </p>
            <div className="ba-footer-social">
              <a href="https://www.instagram.com/mlandsons7/" target="_blank" rel="noopener noreferrer" className="ba-social-link" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ba-social-link" aria-label="Facebook">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="ba-footer-links">
            <h4 className="ba-footer-heading">Quick Links</h4>
            <ul className="ba-footer-list">
              {["home", "products", "about", "gallery", "contact"].map((item) => (
                <li key={item}>
                  <button className="ba-footer-link" onClick={() => scrollTo(item)}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="ba-footer-contact">
            <h4 className="ba-footer-heading">Contact</h4>
            <div className="ba-footer-contact-list">
              <div className="ba-footer-contact-item">
                <MapPin size={13} />
                <span>Rawatpara, Near Mankameshwar Mandir, Agra, UP – 282003</span>
              </div>
              <a href="tel:+917453957724" className="ba-footer-contact-item ba-footer-contact-link">
                <Phone size={13} />
                <span>+91 7453957724</span>
              </a>
              <a href="mailto:contact@mlandsons.com" className="ba-footer-contact-item ba-footer-contact-link">
                <Mail size={13} />
                <span>contact@mlandsons.com</span>
              </a>
              <div className="ba-footer-hours">
                <div className="ba-footer-hours-row">
                  <span>Mon – Sat</span>
                  <span>10:00 AM – 7:00 PM</span>
                </div>
                <div className="ba-footer-hours-row">
                  <span>Sunday</span>
                  <span className="ba-footer-closed">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="ba-footer-newsletter">
            <h4 className="ba-footer-heading">Subscribe</h4>
            <p className="ba-footer-nl-desc">Get updates on new arrivals and special offers.</p>
            {subscribed ? (
              <div className="ba-footer-nl-success">✓ Thank you for subscribing!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="ba-footer-nl-form">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="ba-footer-nl-input"
                  required
                />
                <button type="submit" className="ba-footer-nl-btn" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="ba-footer-bottom">
          <div className="ba-footer-bottom-inner">
            <span>© {new Date().getFullYear()} ML &amp; SONS. All rights reserved.</span>
            <div className="ba-footer-bottom-links">
              <button className="ba-footer-bottom-link">Privacy Policy</button>
              <button className="ba-footer-bottom-link">Terms &amp; Conditions</button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');

        /* ── Trust Badges ── */
        .ba-trust {
          background: #111;
          border-top: 1px solid #1e1e1e;
          border-bottom: 1px solid #1e1e1e;
        }

        .ba-trust-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }

        .ba-trust-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 28px 24px;
          border-right: 1px solid #1e1e1e;
        }
        .ba-trust-item:last-child { border-right: none; }

        .ba-trust-icon {
          font-size: 22px;
          flex-shrink: 0;
          opacity: 0.7;
        }

        .ba-trust-title {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.04em;
          margin-bottom: 2px;
        }

        .ba-trust-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.04em;
        }

        @media (max-width: 768px) {
          .ba-trust-inner { grid-template-columns: repeat(2, 1fr); }
          .ba-trust-item:nth-child(2) { border-right: none; }
          .ba-trust-item { border-bottom: 1px solid #1e1e1e; }
        }
        @media (max-width: 400px) {
          .ba-trust-inner { grid-template-columns: 1fr; }
          .ba-trust-item { border-right: none; }
        }

        /* ── Footer ── */
        .ba-footer {
          background: #0a0a0a;
          font-family: 'Jost', sans-serif;
        }

        .ba-footer-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 72px 32px 48px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.3fr 1.2fr;
          gap: 56px;
        }

        /* Brand */
        .ba-footer-logo {
          display: flex;
          flex-direction: column;
          gap: 3px;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 10px 18px;
          width: fit-content;
          margin-bottom: 20px;
        }

        .ba-footer-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          line-height: 1;
        }

        .ba-footer-logo-sub {
          font-size: 8px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .ba-footer-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          margin-bottom: 20px;
          max-width: 300px;
        }

        .ba-footer-social {
          display: flex;
          gap: 10px;
        }

        .ba-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: 1px solid #2a2a2a;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: all 0.2s;
          border-radius: 2px;
        }
        .ba-social-link:hover {
          border-color: #fff;
          color: #fff;
        }

        /* Headings */
        .ba-footer-heading {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 20px;
        }

        /* Links */
        .ba-footer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ba-footer-link {
          background: none;
          border: none;
          font-family: 'Jost', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          text-align: left;
          padding: 5px 0;
          transition: color 0.2s;
        }
        .ba-footer-link:hover { color: #fff; }

        /* Contact */
        .ba-footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ba-footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          text-decoration: none;
          color: rgba(255,255,255,0.5);
          font-size: 12.5px;
          line-height: 1.6;
        }
        .ba-footer-contact-item svg { flex-shrink: 0; margin-top: 2px; opacity: 0.6; }

        .ba-footer-contact-link {
          transition: color 0.2s;
          cursor: pointer;
        }
        .ba-footer-contact-link:hover { color: #fff; }

        .ba-footer-hours {
          margin-top: 4px;
          border-top: 1px solid #1e1e1e;
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ba-footer-hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
        }

        .ba-footer-closed { color: rgba(255,100,100,0.6); }

        /* Newsletter */
        .ba-footer-nl-desc {
          font-size: 12.5px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 16px;
          line-height: 1.6;
        }

        .ba-footer-nl-form {
          display: flex;
          border: 1px solid #2a2a2a;
          transition: border-color 0.2s;
        }
        .ba-footer-nl-form:focus-within { border-color: rgba(255,255,255,0.4); }

        .ba-footer-nl-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 12px 14px;
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
        }
        .ba-footer-nl-input::placeholder { color: rgba(255,255,255,0.25); }

        .ba-footer-nl-btn {
          background: #fff;
          border: none;
          color: #000;
          width: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .ba-footer-nl-btn:hover { background: #ddd; }

        .ba-footer-nl-success {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          padding: 12px 0;
          letter-spacing: 0.04em;
        }

        /* Bottom Bar */
        .ba-footer-bottom {
          border-top: 1px solid #1a1a1a;
        }

        .ba-footer-bottom-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          flex-wrap: wrap;
          gap: 10px;
        }

        .ba-footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .ba-footer-bottom-link {
          background: none;
          border: none;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: color 0.2s;
          padding: 0;
        }
        .ba-footer-bottom-link:hover { color: #fff; }

        @media (max-width: 1100px) {
          .ba-footer-inner { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 600px) {
          .ba-footer-inner { grid-template-columns: 1fr; padding: 48px 20px 32px; gap: 32px; }
          .ba-footer-bottom-inner { flex-direction: column; align-items: flex-start; }
        }

        /* Light theme */
        [data-theme="light"] .ba-trust { background: #f5f5f5; border-color: #e5e5e5; }
        [data-theme="light"] .ba-trust-item { border-color: #e5e5e5; }
        [data-theme="light"] .ba-trust-title { color: #111; }
        [data-theme="light"] .ba-trust-sub { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-footer { background: #f9f6f0; }
        [data-theme="light"] .ba-footer-logo { border-color: rgba(0,0,0,0.3); }
        [data-theme="light"] .ba-footer-logo-text { color: #111; }
        [data-theme="light"] .ba-footer-logo-sub { color: rgba(0,0,0,0.35); }
        [data-theme="light"] .ba-footer-desc { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .ba-footer-heading { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-footer-link { color: rgba(0,0,0,0.55); }
        [data-theme="light"] .ba-footer-link:hover { color: #000; }
        [data-theme="light"] .ba-footer-contact-item { color: rgba(0,0,0,0.55); }
        [data-theme="light"] .ba-footer-contact-link:hover { color: #000; }
        [data-theme="light"] .ba-social-link { border-color: #ddd; color: rgba(0,0,0,0.5); }
        [data-theme="light"] .ba-social-link:hover { border-color: #000; color: #000; }
        [data-theme="light"] .ba-footer-bottom { border-color: #e5e5e5; }
        [data-theme="light"] .ba-footer-bottom-inner { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .ba-footer-bottom-link { color: rgba(0,0,0,0.3); }
        [data-theme="light"] .ba-footer-bottom-link:hover { color: #000; }
        [data-theme="light"] .ba-footer-nl-form { border-color: #ddd; }
        [data-theme="light"] .ba-footer-nl-input { color: #000; }
        [data-theme="light"] .ba-footer-nl-input::placeholder { color: rgba(0,0,0,0.25); }
        [data-theme="light"] .ba-footer-nl-btn { background: #000; color: #fff; }
        [data-theme="light"] .ba-footer-nl-btn:hover { background: #333; }
        [data-theme="light"] .ba-footer-hours-row { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-footer-hours { border-color: #e5e5e5; }
      `}</style>
    </>
  );
};

export default Footer;
