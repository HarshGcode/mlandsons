import React, { useEffect } from 'react';
import CoinCursor from './CoinCursor';
import Header from "./Header";
import Hero from "./Hero";
import ProductCategories from "./ProductCategories";
import About from "./About";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import FeaturedCollections from "./components/FeaturedCollections";
import LuckyNoteBanner from "./components/LuckyNoteBanner";
import GiftBanner from "./components/GiftBanner";
import TrustBadges from "./components/TrustBadges";

function HomePage({ onViewCollection, pendingScroll, clearPendingScroll }) {
  useEffect(() => {
    if (!pendingScroll) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(pendingScroll);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      clearPendingScroll();
    }, 80);
    return () => clearTimeout(timer);
  }, [pendingScroll, clearPendingScroll]);

  return (
    <div className="min-h-screen">
      <CoinCursor />
      <Header />
      <Hero onViewCollection={onViewCollection} />
      <FeaturedCollections />
      <ProductCategories />
      <LuckyNoteBanner />
      <About />
      <GiftBanner />
      <Gallery />
      <TrustBadges />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default HomePage;
