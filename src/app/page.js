'use client';
import { useEffect, useState } from 'react';

import HeroSection         from '@/components/home/HeroSection';
import StatsBar            from '@/components/home/StatsBar';
import ChooseYourPath      from '@/components/home/ChooseYourPath';
import TrainingCategories  from '@/components/home/TrainingCategories';
import WhyChooseUs         from '@/components/home/WhyChooseUs';
import PlacementSection    from '@/components/home/PlacementSection';
import HiringPartners      from '@/components/home/HiringPartners';
import InternshipSection   from '@/components/home/InternshipSection';
import StudentProjects     from '@/components/home/StudentProjects';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection          from '@/components/home/FAQSection';
import CtaBanner           from '@/components/home/CtaBanner';
import SectionCta          from '@/components/home/SectionCta';

/* ── Auth hook ── */
function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const check = () => {
      const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
      if (!token) { setLoggedIn(false); return; }
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('adminToken');
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      } catch { setLoggedIn(false); }
    };
    check();
    window.addEventListener('storage', check);
    return () => window.removeEventListener('storage', check);
  }, []);
  return loggedIn;
}

export default function Home() {
  const loggedIn = useAuth();

  return (
    <div style={{ paddingTop: '70px' }}>
      {/* ── Phase 1: Discovery ──────────────────────────────────── */}
      <HeroSection         loggedIn={loggedIn} />
      <StatsBar            />
      <ChooseYourPath      />
      <TrainingCategories  />
      <WhyChooseUs         />

      {/* ── Phase 3: Trust & Proof ──────────────────────────────── */}
      <PlacementSection    />
      <div style={{ padding: '0 0 48px' }}><SectionCta variant="placement" /></div>

      <HiringPartners      />
      <InternshipSection   />
      <div style={{ padding: '0 0 48px' }}><SectionCta variant="internship" /></div>

      <StudentProjects     />
      <TestimonialsSection />
      <div style={{ padding: '0 0 48px' }}><SectionCta variant="demo" /></div>

      <FAQSection          />

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <CtaBanner           loggedIn={loggedIn} />
    </div>
  );
}
