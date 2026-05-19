'use client';
import { useState, useEffect } from 'react';

const WA_NUMBER = '919876543210'; // Replace with real number
const WA_MESSAGE = encodeURIComponent(
  'Hi! I found Shree Balaji Coaching Institute online and I\'m interested in knowing more about your courses. Can you please help me?'
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const showTimer = setTimeout(() => setVisible(true), 3000);
    // Start pulse animation after 5 seconds
    const pulseTimer = setTimeout(() => setPulsing(true), 5000);
    return () => { clearTimeout(showTimer); clearTimeout(pulseTimer); };
  }, []);

  return (
    <>
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with a counsellor on WhatsApp"
        id="whatsapp-float-btn"
        className={`wa-float${visible ? ' wa-float--visible' : ''}${pulsing ? ' wa-float--pulse' : ''}`}
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.44.64 4.72 1.76 6.72L2 30l7.52-1.72A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.4a11.35 11.35 0 0 1-5.8-1.6l-.42-.24-4.34.98 1.02-4.22-.28-.44A11.38 11.38 0 0 1 4.6 16c0-6.3 5.1-11.4 11.4-11.4S27.4 9.7 27.4 16 22.3 27.4 16 27.4zm6.26-8.52c-.34-.18-2.02-1-2.34-1.1-.32-.12-.56-.18-.8.18-.24.34-.92 1.1-1.12 1.34-.2.22-.42.26-.76.08-.34-.18-1.44-.52-2.74-1.68-1.02-.9-1.7-2-1.9-2.34-.2-.34-.02-.52.14-.7.16-.16.34-.42.52-.62.18-.2.24-.34.36-.56.12-.22.06-.42-.02-.6-.08-.18-.8-1.92-1.1-2.62-.28-.68-.58-.58-.8-.6-.2-.02-.44-.02-.68-.02-.24 0-.62.08-.94.42-.32.34-1.22 1.2-1.22 2.9s1.24 3.36 1.42 3.6c.18.22 2.44 3.72 5.9 5.22.82.36 1.46.56 1.96.72.82.26 1.58.22 2.16.14.66-.1 2.02-.82 2.3-1.62.28-.8.28-1.48.2-1.62-.08-.14-.32-.22-.66-.4z"/>
        </svg>
        <span className="wa-float__label">Talk to Counsellor</span>
      </a>

      <style>{`
        .wa-float {
          position: fixed;
          bottom: 28px;
          right: 24px;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #25D366;
          color: #fff;
          padding: 12px 18px 12px 14px;
          border-radius: 999px;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease;
          pointer-events: none;
          white-space: nowrap;
        }
        .wa-float--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .wa-float:hover {
          background: #20BD5C;
          box-shadow: 0 6px 28px rgba(37, 211, 102, 0.6);
          transform: translateY(-2px) scale(1.02);
        }
        .wa-float--pulse::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: #25D366;
          animation: wa-pulse 2.5s ease-out infinite;
        }
        @keyframes wa-pulse {
          0%   { opacity: 0.6; transform: scale(1); }
          70%  { opacity: 0;   transform: scale(1.35); }
          100% { opacity: 0;   transform: scale(1.35); }
        }

        /* Mobile: icon only, keep it minimal */
        @media (max-width: 600px) {
          .wa-float {
            bottom: 20px;
            right: 16px;
            padding: 13px;
            border-radius: 50%;
          }
          .wa-float__label { display: none; }
        }
      `}</style>
    </>
  );
}
