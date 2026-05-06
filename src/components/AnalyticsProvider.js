'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const search = typeof window !== 'undefined' && window.location.search ? window.location.search : '';
    trackPageView(pathname, search);
  }, [pathname]);

  return null;
}
