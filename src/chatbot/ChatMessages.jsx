import { forwardRef } from 'react';
import ChatProductCard from './ChatProductCard';

const ChatMessages = forwardRef(function ChatMessages(
  { messages, isTyping, onProductClick, onQuickAction },
  ref
) {
  // Simple markdown-like bold
  const renderText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <div key={i} style={{ minHeight: line === '' ? '8px' : 'auto' }}>
          {parts.map((part, j) =>
            j % 2 === 1
              ? <strong key={j} style={{ color: '#c4962a', fontWeight: 600 }}>{part}</strong>
              : <span key={j}>{part}</span>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div className="cb-messages">
        {messages.map((m) => (
          <div key={m.id} className={`cb-msg cb-msg-${m.role}`}>
            {m.role === 'bot' && <div className="cb-msg-avatar">🏛️</div>}
            <div className={`cb-msg-bubble cb-bubble-${m.role}`}>
              <div className="cb-msg-text">{renderText(m.content)}</div>
              {m.products && m.products.length > 0 && (
                <div className="cb-msg-products">
                  {m.products.map((p) => (
                    <ChatProductCard
                      key={p.id}
                      product={p}
                      onProductClick={onProductClick}
                    />
                  ))}
                </div>
              )}
              {m.quickActions && m.quickActions.length > 0 && (
                <div className="cb-quick-actions">
                  {m.quickActions.map((action) => (
                    <button
                      key={action}
                      className="cb-chip"
                      onClick={() => onQuickAction?.(action)}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="cb-msg cb-msg-bot">
            <div className="cb-msg-avatar">🏛️</div>
            <div className="cb-msg-bubble cb-bubble-bot">
              <div className="cb-typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        <div ref={ref} />
      </div>

      <style>{`
        .cb-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scroll-behavior: smooth;
        }
        .cb-messages::-webkit-scrollbar {
          width: 4px;
        }
        .cb-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .cb-messages::-webkit-scrollbar-thumb {
          background: rgba(196, 150, 42, 0.2);
          border-radius: 4px;
        }

        .cb-msg {
          display: flex;
          gap: 8px;
          animation: cb-fade-in 0.3s ease;
        }
        @keyframes cb-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cb-msg-bot {
          align-self: flex-start;
        }
        .cb-msg-user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .cb-msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(196, 150, 42, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .cb-msg-bubble {
          max-width: 85%;
          padding: 10px 14px;
          border-radius: 12px;
        }

        .cb-bubble-bot {
          background: #111;
          border: 1px solid #1a1a1a;
          border-top-left-radius: 4px;
        }
        .cb-bubble-user {
          background: rgba(196, 150, 42, 0.12);
          border: 1px solid rgba(196, 150, 42, 0.25);
          border-top-right-radius: 4px;
        }

        .cb-msg-text {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.85);
          line-height: 1.6;
        }
        .cb-bubble-user .cb-msg-text {
          color: #fff;
        }

        .cb-msg-products {
          margin-top: 4px;
        }

        .cb-quick-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }
        .cb-chip {
          padding: 5px 12px;
          border: 1px solid rgba(196, 150, 42, 0.25);
          background: transparent;
          color: #c4962a;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .cb-chip:hover {
          background: rgba(196, 150, 42, 0.12);
          border-color: #c4962a;
        }

        /* Typing indicator */
        .cb-typing {
          display: flex;
          gap: 4px;
          padding: 4px 0;
        }
        .cb-typing span {
          width: 6px;
          height: 6px;
          background: rgba(196, 150, 42, 0.5);
          border-radius: 50%;
          animation: cb-typing-bounce 1.2s infinite;
        }
        .cb-typing span:nth-child(2) { animation-delay: 0.15s; }
        .cb-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes cb-typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        /* Light theme */
        [data-theme="light"] .cb-bubble-bot {
          background: #fff;
          border-color: #e5e5e5;
        }
        [data-theme="light"] .cb-bubble-user {
          background: rgba(196, 150, 42, 0.08);
          border-color: rgba(196, 150, 42, 0.2);
        }
        [data-theme="light"] .cb-msg-text {
          color: rgba(0,0,0,0.8);
        }
        [data-theme="light"] .cb-bubble-user .cb-msg-text {
          color: #111;
        }
        [data-theme="light"] .cb-msg-avatar {
          background: rgba(196, 150, 42, 0.1);
        }
      `}</style>
    </>
  );
});

export default ChatMessages;
