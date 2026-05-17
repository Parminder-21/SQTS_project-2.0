'use client';
import { useEffect, useState } from 'react';

import HeroSection         from '@/components/home/HeroSection';
import StatsBar            from '@/components/home/StatsBar';
import ChooseYourPath      from '@/components/home/ChooseYourPath';
import TrainingCategories  from '@/components/home/TrainingCategories';
import WhyChooseUs         from '@/components/home/WhyChooseUs';
import PlacementSection    from '@/components/home/PlacementSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import HiringPartners      from '@/components/home/HiringPartners';
import CtaBanner           from '@/components/home/CtaBanner';

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
      <HeroSection         loggedIn={loggedIn} />
      <StatsBar            />
      <ChooseYourPath      />
      <TrainingCategories  />
      <WhyChooseUs         />
      <PlacementSection    />
      <TestimonialsSection />
      <HiringPartners      />
      <CtaBanner           loggedIn={loggedIn} />
    </div>
  );
}
