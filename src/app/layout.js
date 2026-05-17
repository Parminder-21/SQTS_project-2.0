import './globals.css';
import { Inter } from 'next/font/google';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SQTS Training Institute | School Coaching, Programming, Web Dev, Internships & Placement',
  description: 'SQTS Training Institute — practical tech education for school students, college learners, job seekers and internship aspirants. Placement assistance, live projects, and 50+ internship domains.',
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
