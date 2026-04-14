'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky-nav ${scrolled ? 'glass-panel' : ''}`} style={{ 
      borderRadius: scrolled ? '30px' : '0', 
      margin: scrolled ? '10px auto' : '0',
      maxWidth: scrolled ? '1200px' : '100%',
      padding: scrolled ? '15px 30px' : '20px 5%'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          SQTS<span className="text-gradient">.</span>
        </Link>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }} className="desktop-menu">
          <Link href="/courses" style={{ color: '#a1a1aa', textDecoration: 'none', fontWeight: 500 }}>Courses</Link>
          <Link href="/alumni" style={{ color: '#a1a1aa', textDecoration: 'none', fontWeight: 500 }}>Alumni</Link>
          <Link href="/admin" style={{ color: '#ec4899', textDecoration: 'none', fontWeight: 500 }}>Admin</Link>
          
          <Link href="/register" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
            Register Now
          </Link>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
