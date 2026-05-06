import './globals.css';
import { Inter } from 'next/font/google';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SQTS — Sparkque Tech Solutions | Premium Tech Training',
  description: 'Job-focused tech courses with guaranteed placement assistance. Data Science, Web Development, Digital Marketing, and AI programs in India.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AnalyticsProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
