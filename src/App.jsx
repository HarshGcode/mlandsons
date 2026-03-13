import { useState } from 'react';
import CoinCursor from './CoinCursor';
import HomePage from './Home';
import CollectionPage from './CollectionPage';
import LiveLocation from './my-location';
import { ThemeProvider } from './ThemeContext';
import { NavContext } from './context/NavigationContext';
import { DataProvider } from './context/DataContext';

// New Pages
import CollectionsFullPage from './pages/CollectionsFullPage';
import ProductDetailPage from './pages/ProductDetailPage';
import GiftPage from './pages/GiftPage';
import LuckyNotePage from './pages/LuckyNotePage';
import SearchPage from './pages/SearchPage';
import BlogPage from './pages/BlogPage';
import DashboardPage from './pages/DashboardPage';
import ChatBot from './chatbot/ChatBot';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState(null);
  const [pendingScroll, setPendingScroll] = useState(null);

  const navigate = (page, data = null) => {
    setPageData(data);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = (scrollTarget) => {
    setCurrentPage('home');
    if (scrollTarget) setPendingScroll(scrollTarget);
    window.scrollTo({ top: 0 });
  };

  return (
    <ThemeProvider>
      <DataProvider>
      <NavContext.Provider value={{ currentPage, navigate, pageData, goHome }}>
        <CoinCursor />

        <div className="app">
          {currentPage === 'home' && (
            <HomePage
              onViewCollection={() => navigate('collections')}
              pendingScroll={pendingScroll}
              clearPendingScroll={() => setPendingScroll(null)}
            />
          )}

          {currentPage === 'collection' && (
            <CollectionPage onBackToHome={goHome} />
          )}

          {currentPage === 'collections' && (
            <CollectionsFullPage />
          )}

          {currentPage === 'product' && (
            <ProductDetailPage product={pageData} />
          )}

          {currentPage === 'gift' && (
            <GiftPage />
          )}

          {currentPage === 'lucky' && (
            <LuckyNotePage />
          )}

          {currentPage === 'search' && (
            <SearchPage />
          )}

          {currentPage === 'blog' && (
            <BlogPage />
          )}

          {currentPage === 'dashboard' && (
            <DashboardPage />
          )}

          {currentPage === 'location' && (
            <LiveLocation />
          )}
        </div>

        <ChatBot />

        <style>{`
          .app {
            min-height: 100vh;
            background: #0a0a0a;
          }
          [data-theme="light"] .app {
            background: #f9f6f0;
          }
        `}</style>
      </NavContext.Provider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
