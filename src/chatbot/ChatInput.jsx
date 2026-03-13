import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <>
      <form className="cb-input-bar" onSubmit={handleSubmit}>
        <input
          className="cb-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask about notes, coins, pricing..."
          disabled={disabled}
          autoComplete="off"
        />
        <button
          className="cb-send-btn"
          type="submit"
          disabled={!text.trim() || disabled}
        >
          <Send size={16} />
        </button>
      </form>

      <style>{`
        .cb-input-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-top: 1px solid #1a1a1a;
          background: #0a0a0a;
        }
        .cb-input {
          flex: 1;
          background: #111;
          border: 1px solid #222;
          border-radius: 8px;
          padding: 10px 14px;
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
        }
        .cb-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .cb-input:focus {
          border-color: rgba(196, 150, 42, 0.4);
        }
        .cb-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #c4962a 0%, #a07820 100%);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .cb-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(196, 150, 42, 0.3);
        }
        .cb-send-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        /* Light theme */
        [data-theme="light"] .cb-input-bar {
          background: #f9f6f0;
          border-top-color: #e5e5e5;
        }
        [data-theme="light"] .cb-input {
          background: #fff;
          border-color: #ddd;
          color: #111;
        }
        [data-theme="light"] .cb-input::placeholder {
          color: rgba(0,0,0,0.3);
        }
        [data-theme="light"] .cb-input:focus {
          border-color: rgba(196, 150, 42, 0.5);
        }
      `}</style>
    </>
  );
}
