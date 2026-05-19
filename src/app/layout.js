import './globals.css';
import { Inter } from 'next/font/google';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shree Balaji Coaching Institute | Premium Tech Education & Placement',
  description: 'Practical tech education for students and job seekers. 50+ internship domains, guaranteed placement assistance, and live projects in Chandigarh & Online.',
  keywords: ['Shree Balaji', 'Tech Education', 'Coding Classes', 'Internship Chandigarh', 'Web Development', 'AI Training', 'Placement Training'],
  openGraph: {
    title: 'Shree Balaji Coaching Institute',
    description: 'Transform your career with practical tech education, internships, and guaranteed placement assistance.',
    url: 'https://shreebalaji.in',
    siteName: 'Shree Balaji',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shree Balaji Coaching Institute',
    description: 'Practical tech education, internships & placements.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AnalyticsProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
