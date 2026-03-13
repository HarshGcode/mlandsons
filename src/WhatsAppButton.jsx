import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mouseNear, setMouseNear] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = '+917453957724';
  const message = encodeURIComponent('Hi! I\'m interested in your antique currency collection.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <>
      <div className={`wa-wrapper ${isVisible ? 'wa-visible' : ''}`}>
        {/* Main Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`wa-btn ${isExpanded ? 'wa-expanded' : ''}`}
          onMouseEnter={() => setMouseNear(true)}
          onMouseLeave={() => setMouseNear(false)}
          onClick={() => setIsExpanded(false)}
        >
          <div className="wa-glow" />
          <div className="wa-pulse" />
          <div className="wa-icon-wrap">
            <MessageCircle size={24} className="wa-icon" />
          </div>
          <span className="wa-text">Chat with us</span>
          <div className="wa-shine" />
        </a>

        {/* Tooltip */}
        {!isExpanded && mouseNear && (
          <div className="wa-tooltip">
            <span>Need help? Chat on WhatsApp</span>
            <div className="wa-tooltip-arrow" />
          </div>
        )}

        {/* Status Indicator */}
        <div className="wa-status">
          <div className="wa-status-dot" />
          <span>Online</span>
        </div>
      </div>

      <style>{`
        .wa-wrapper {
          position: fixed;
          bottom: 96px;
          right: 28px;
          z-index: 9999;
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .wa-wrapper.wa-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }

        /* Main Button */
        .wa-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border-radius: 50px;
          text-decoration: none;
          overflow: hidden;
          box-shadow: 
            0 8px 24px rgba(37, 211, 102, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .wa-btn:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 
            0 16px 40px rgba(37, 211, 102, 0.45),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .wa-btn:active {
          transform: translateY(-2px) scale(1.02);
        }

        /* Glow Effect */
        .wa-glow {
          position: absolute;
          inset: -2px;
          border-radius: 50px;
          background: radial-gradient(circle, rgba(37, 211, 102, 0.4), transparent 70%);
          filter: blur(12px);
          opacity: 0;
          transition: opacity 0.4s;
        }

        .wa-btn:hover .wa-glow {
          opacity: 1;
        }

        /* Pulse Animation */
        .wa-pulse {
          position: absolute;
          inset: -8px;
          border-radius: 50px;
          border: 2px solid rgba(37, 211, 102, 0.4);
          animation: wa-pulse-anim 2.5s ease-in-out infinite;
        }

        @keyframes wa-pulse-anim {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.15);
            opacity: 0;
          }
        }

        /* Icon Wrapper */
        .wa-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.3s;
        }

        .wa-btn:hover .wa-icon-wrap {
          background: rgba(255, 255, 255, 0.25);
          transform: rotate(-12deg) scale(1.1);
        }

        .wa-icon {
          color: #fff;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        /* Text */
        .wa-text {
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          white-space: nowrap;
          max-width: 0;
          overflow: hidden;
          transition: max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .wa-btn.wa-expanded .wa-text,
        .wa-btn:hover .wa-text {
          max-width: 200px;
          padding-right: 4px;
        }

        /* Shine Effect */
        .wa-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          transition: left 0.6s;
        }

        .wa-btn:hover .wa-shine {
          left: 100%;
        }

        /* Tooltip */
        .wa-tooltip {
          position: absolute;
          bottom: calc(100% + 16px);
          right: 0;
          padding: 10px 16px;
          background: rgba(10, 8, 4, 0.95);
          border: 1.5px solid rgba(37, 211, 102, 0.3);
          border-radius: 12px;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
          white-space: nowrap;
          animation: wa-tooltip-in 0.3s ease;
        }

        @keyframes wa-tooltip-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .wa-tooltip span {
          color: #e8e8e8;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 500;
        }

        .wa-tooltip-arrow {
          position: absolute;
          bottom: -6px;
          right: 24px;
          width: 10px;
          height: 10px;
          background: rgba(10, 8, 4, 0.95);
          border-right: 1.5px solid rgba(37, 211, 102, 0.3);
          border-bottom: 1.5px solid rgba(37, 211, 102, 0.3);
          transform: rotate(45deg);
        }

        /* Status Indicator */
        .wa-status {
          position: absolute;
          top: -6px;
          right: -6px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: rgba(10, 8, 4, 0.95);
          border: 1.5px solid rgba(37, 211, 102, 0.4);
          border-radius: 100px;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .wa-status-dot {
          width: 6px;
          height: 6px;
          background: #25D366;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(37, 211, 102, 0.8);
          animation: wa-status-pulse 2s ease-in-out infinite;
        }

        @keyframes wa-status-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        .wa-status span {
          color: #25D366;
          font-family: 'Sora', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .wa-wrapper {
            bottom: 92px;
            right: 20px;
          }

          .wa-btn {
            padding: 12px 16px;
          }

          .wa-icon-wrap {
            width: 36px;
            height: 36px;
          }

          .wa-tooltip {
            display: none;
          }

          .wa-text {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .wa-wrapper {
            bottom: 88px;
            right: 16px;
          }

          .wa-btn {
            padding: 10px 14px;
          }

          .wa-icon-wrap {
            width: 32px;
            height: 32px;
          }

          .wa-text {
            display: none;
          }

          .wa-status {
            top: -4px;
            right: -4px;
            padding: 3px 8px;
          }

          .wa-status span {
            font-size: 9px;
          }
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;
