'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [isMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
        el.addEventListener('mouseover', () => setLinkHovered(true));
        el.addEventListener('mouseout', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    // Re-bind occasionally or use mutation observer in a real app
    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      className={`custom-cursor ${linkHovered ? 'hover' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${clicked ? 0.9 : 1})`,
      }}
    />
  );
}
