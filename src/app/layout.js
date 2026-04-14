import './globals.css';
import { Inter } from 'next/font/google';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/ui/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sparkque Tech Solutions | Premium Learning',
  description: 'Job-focused courses with placement assistance. Start your journey in Data Science, Web Development, Digital Marketing, and AI today.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <footer className="glass-panel" style={{ margin: '40px auto', maxWidth: '1200px', padding: '40px', textAlign: 'center' }}>
          <h2 className="text-gradient">SQTS.</h2>
          <p style={{ color: '#a1a1aa', marginTop: '10px' }}>&copy; {new Date().getFullYear()} Sparkque Tech Solutions. Premium Learning Experience.</p>
        </footer>
      </body>
    </html>
  );
}
