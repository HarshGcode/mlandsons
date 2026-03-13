import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useNav } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { processMessage } from './chatEngine';
import { getWelcomeMessage } from './chatKnowledge';

export default function ChatBot() {
  const { navigate } = useNav();
  const { products, categories, giftPackages } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef(null);

  // On first open, send welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([getWelcomeMessage()]);
      setHasOpened(true);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: text,
      products: null,
      quickActions: null,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate natural response delay
    setTimeout(() => {
      const botResponse = processMessage(text, messages, { products, categories, giftPackages });
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 400 + Math.random() * 400);
  };

  const handleProductClick = (product) => {
    navigate('product', product);
    setIsOpen(false);
  };

  const handleQuickAction = (action) => {
    // Special navigation actions
    if (action === 'Chat on WhatsApp') {
      window.open('https://wa.me/917453957724?text=' + encodeURIComponent('Hi! I\'m interested in your antique currency collection.'), '_blank');
      return;
    }
    if (action === 'Browse Collection' || action === 'Browse All') {
      navigate('collections');
      setIsOpen(false);
      return;
    }
    if (action === 'Contact Us' || action === 'Open Contact Form') {
      navigate('home');
      setIsOpen(false);
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      return;
    }
    if (action === 'View Gifts' || action === 'Gift Packages') {
      navigate('gift');
      setIsOpen(false);
      return;
    }
    // Otherwise, treat as a chat message
    handleSend(action);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="cb-window">
          {/* Header */}
          <div className="cb-header">
            <div className="cb-header-info">
              <div className="cb-header-avatar">🏛️</div>
              <div>
                <div className="cb-header-title">ML & SONS Assistant</div>
                <div className="cb-header-status">
                  <span className="cb-header-dot" />
                  Online — Ask about our collection
                </div>
              </div>
            </div>
            <button className="cb-close" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            onProductClick={handleProductClick}
            onQuickAction={handleQuickAction}
            ref={messagesEndRef}
          />

          {/* Input */}
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      )}

      {/* Toggle Button */}
      <button
        className={`cb-toggle ${isOpen ? 'cb-toggle-open' : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
        {!isOpen && !hasOpened && <span className="cb-badge">1</span>}
        {!isOpen && <div className="cb-toggle-pulse" />}
      </button>

      <style>{`
        /* ── Toggle Button ──────────────────────────── */
        .cb-toggle {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 10001;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c4962a 0%, #a07820 100%);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(196, 150, 42, 0.35);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cb-toggle:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 32px rgba(196, 150, 42, 0.45);
        }
        .cb-toggle-open {
          background: #333;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .cb-toggle-open:hover {
          background: #444;
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        }

        .cb-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f43f5e;
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(244, 63, 94, 0.5);
          animation: cb-badge-pop 0.3s ease;
        }
        @keyframes cb-badge-pop {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        .cb-toggle-pulse {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(196, 150, 42, 0.4);
          animation: cb-pulse 2.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes cb-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.25); opacity: 0; }
        }

        /* ── Chat Window ───────────────────────────── */
        .cb-window {
          position: fixed;
          bottom: 96px;
          right: 28px;
          width: 380px;
          height: 520px;
          z-index: 10001;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(196, 150, 42, 0.1);
          animation: cb-slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes cb-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Header ────────────────────────────────── */
        .cb-header {
          padding: 14px 16px;
          background: linear-gradient(135deg, #c4962a 0%, #96751e 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .cb-header-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cb-header-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .cb-header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
        }
        .cb-header-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.8);
        }
        .cb-header-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 6px rgba(74, 222, 128, 0.6);
        }
        .cb-close {
          background: rgba(255,255,255,0.15);
          border: none;
          color: #fff;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .cb-close:hover {
          background: rgba(255,255,255,0.3);
        }

        /* ── Light Theme ───────────────────────────── */
        [data-theme="light"] .cb-window {
          background: #f9f6f0;
          border-color: #e0d8c8;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(196, 150, 42, 0.15);
        }

        /* ── Mobile ────────────────────────────────── */
        @media (max-width: 480px) {
          .cb-window {
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            height: 100dvh;
            border-radius: 0;
            border: none;
          }
          .cb-toggle {
            bottom: 20px;
            right: 20px;
          }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .cb-window {
            width: 340px;
            height: 480px;
            right: 16px;
            bottom: 88px;
          }
          .cb-toggle {
            bottom: 20px;
            right: 16px;
          }
        }
      `}</style>
    </>
  );
}
