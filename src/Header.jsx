import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, User, ChevronLeft, ChevronRight, X, Menu } from "lucide-react";
import { useNav } from "./context/NavigationContext";

const announcements = [
  "FREE SHIPPING — WITHIN 5 DAYS | SHIPPING WORLDWIDE",
  "100% AUTHENTIC ANTIQUE CURRENCY | TRUSTED BY COLLECTORS",
  "PERFECT FOR WEDDING & BIRTHDAY GIFTS | CALL +91 7453957724",
];

export default function Header() {
  const navCtx = useNav();
  const [annIdx, setAnnIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAnnIdx(i => (i + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Products", id: "products" },
    { label: "Collections", page: "collections" },
    { label: "About", id: "about" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  const handleNavItem = (item) => {
    setMobileMenuOpen(false);
    if (item.page && navCtx) {
      navCtx.navigate(item.page);
    } else if (item.id) {
      scrollTo(item.id);
    }
  };

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="ba-ann">
        <button className="ba-ann-arrow" onClick={() => setAnnIdx(i => (i - 1 + announcements.length) % announcements.length)}>
          <ChevronLeft size={14} />
        </button>
        <div className="ba-ann-text">
          <span>{announcements[annIdx]}</span>
          <span className="ba-ann-arrow-icon">→</span>
        </div>
        <button className="ba-ann-arrow" onClick={() => setAnnIdx(i => (i + 1) % announcements.length)}>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* ── Main Header ── */}
      <header className={`ba-header ${scrolled ? "ba-header--scrolled" : ""}`}>
        <div className="ba-header-inner">
          {/* Left: Hamburger */}
          <button className="ba-burger" onClick={() => setMobileMenuOpen(true)} aria-label="Menu">
            <Menu size={22} />
          </button>

          {/* Center: Logo */}
          <div className="ba-logo" onClick={() => scrollTo("home")}>
            <span className="ba-logo-text">ML &amp; SONS</span>
            <span className="ba-logo-sub">Antique Currency</span>
          </div>

          {/* Right: Icons */}
          <div className="ba-header-icons">
            <button className="ba-icon-btn" onClick={() => navCtx?.navigate("search")} aria-label="Search">
              <Search size={18} />
            </button>
            <button className="ba-icon-btn" onClick={() => navCtx?.navigate("dashboard")} aria-label="Account">
              <User size={18} />
            </button>
            <button className="ba-icon-btn" aria-label="Cart">
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className="ba-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="ba-drawer" onClick={e => e.stopPropagation()}>
            <div className="ba-drawer-top">
              <span className="ba-drawer-title">Menu</span>
              <button className="ba-drawer-close" onClick={() => setMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <nav className="ba-drawer-nav">
              {navItems.map(item => (
                <button key={item.label} className="ba-drawer-item" onClick={() => handleNavItem(item)}>
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="ba-drawer-footer">
              <a href="tel:+917453957724" className="ba-drawer-call">
                Call Us: +91 7453957724
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Jost', sans-serif;
          background: #0a0a0a;
          color: #fff;
        }

        /* ── Announcement Bar ── */
        .ba-ann {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          height: 40px;
          background: #111;
          border-bottom: 1px solid #1e1e1e;
          position: relative;
          z-index: 200;
        }

        .ba-ann-text {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #ccc;
          text-transform: uppercase;
          animation: ba-fade-in 0.4s ease;
        }

        .ba-ann-arrow-icon {
          color: #888;
        }

        @keyframes ba-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ba-ann-arrow {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 6px;
          transition: color 0.2s;
          border-radius: 4px;
        }
        .ba-ann-arrow:hover { color: #fff; }

        /* ── Header ── */
        .ba-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #0a0a0a;
          border-bottom: 1px solid #1e1e1e;
          transition: box-shadow 0.3s ease;
        }

        .ba-header--scrolled {
          box-shadow: 0 2px 20px rgba(0,0,0,0.6);
        }

        .ba-header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Burger ── */
        .ba-burger {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 6px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .ba-burger:hover { color: #aaa; }

        /* ── Logo ── */
        .ba-logo {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
          border: 1.5px solid rgba(255,255,255,0.6);
          padding: 8px 24px;
          transition: border-color 0.2s;
          user-select: none;
        }
        .ba-logo:hover { border-color: #fff; }

        .ba-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          line-height: 1;
        }

        .ba-logo-sub {
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          line-height: 1;
        }

        /* ── Header Icons ── */
        .ba-header-icons {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .ba-icon-btn {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
        }
        .ba-icon-btn:hover {
          color: #aaa;
          background: rgba(255,255,255,0.06);
        }

        /* ── Mobile Drawer ── */
        .ba-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 300;
          display: flex;
        }

        .ba-drawer {
          width: min(320px, 85vw);
          height: 100%;
          background: #0a0a0a;
          border-right: 1px solid #1e1e1e;
          display: flex;
          flex-direction: column;
          animation: ba-slide-in 0.28s ease;
        }

        @keyframes ba-slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        .ba-drawer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #1e1e1e;
        }

        .ba-drawer-title {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #888;
        }

        .ba-drawer-close {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .ba-drawer-close:hover { color: #aaa; }

        .ba-drawer-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 16px 0;
          overflow-y: auto;
        }

        .ba-drawer-item {
          background: none;
          border: none;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          text-align: left;
          padding: 14px 24px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.04em;
          border-bottom: 1px solid #111;
        }
        .ba-drawer-item:hover {
          color: #aaa;
          padding-left: 32px;
        }

        .ba-drawer-footer {
          padding: 20px 24px;
          border-top: 1px solid #1e1e1e;
        }

        .ba-drawer-call {
          display: block;
          text-align: center;
          color: #888;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ba-drawer-call:hover { color: #fff; }

        /* ── Light theme support ── */
        [data-theme="light"] .ba-ann { background: #f5f5f5; border-color: #e5e5e5; }
        [data-theme="light"] .ba-ann-text { color: #333; }
        [data-theme="light"] .ba-header { background: #fff; border-color: #e5e5e5; }
        [data-theme="light"] .ba-logo-text { color: #111; }
        [data-theme="light"] .ba-logo { border-color: rgba(0,0,0,0.5); }
        [data-theme="light"] .ba-logo:hover { border-color: #000; }
        [data-theme="light"] .ba-logo-sub { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-icon-btn, [data-theme="light"] .ba-burger { color: #111; }
        [data-theme="light"] .ba-drawer { background: #fff; border-color: #e5e5e5; }
        [data-theme="light"] .ba-drawer-item { color: #111; border-color: #f0f0f0; }
        [data-theme="light"] .ba-drawer-item:hover { color: #666; }
        [data-theme="light"] .ba-drawer-overlay { background: rgba(0,0,0,0.4); }
      `}</style>
    </>
  );
}
