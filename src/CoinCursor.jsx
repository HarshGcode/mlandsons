import React, { useState, useEffect } from 'react';

const CoinCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interactiveSelector = 'input, textarea, select, button, a, label, [role="button"]';

    const onMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target instanceof Element ? e.target : null;
      setIsActive(Boolean(target?.closest(interactiveSelector)));
    };

    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    const checkMobile = () => {
      setIsVisible(window.innerWidth > 768 && !isTouchDevice());
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', checkMobile);
    checkMobile();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={`simple-cursor ${isActive ? 'active' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="cursor-coin">
          <div className="coin-symbol">₹</div>
        </div>
      </div>

      <style>{`
        body { 
          cursor: none !important; 
        }
        
        * {
          cursor: none !important;
        }

        .simple-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          transition: transform 0.12s ease;
        }

        .simple-cursor.active {
          transform: translate(-50%, -50%) scale(1.2);
        }

        .cursor-coin {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f5d36b 0%, #c4962a 50%, #e8b84b 100%);
          border-radius: 50%;
          border: 2px solid rgba(255, 200, 100, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(196, 150, 40, 0.4);
          transition: box-shadow 0.12s ease;
        }

        .simple-cursor.active .cursor-coin {
          box-shadow: 0 0 20px rgba(245, 211, 107, 0.65);
        }

        .coin-symbol {
          font-size: 22px;
          font-weight: 700;
          color: rgba(20, 15, 5, 0.9);
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          body, * { 
            cursor: auto !important; 
          }
        }
      `}</style>
    </>
  );
};

export default CoinCursor;
