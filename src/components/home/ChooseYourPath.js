'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const PATHS = [
  {
    icon: 'school',
    title: 'School Students',
    subtitle: 'Class 3rd – 8th',
    desc: 'Foundation-level computer science, typing, MS Office, and digital literacy programs designed for young learners.',
    color: '#3B82F6',
    cta: 'View School Programs',
    href: '/courses?category=School+Coaching',
  },
  {
    icon: 'graduation',
    title: 'College Students',
    subtitle: 'BCA / BTech / MCA',
    desc: 'Advanced programming, web development, AI tools, and project-based learning to make you industry-ready.',
    color: '#06B6D4',
    cta: 'View College Programs',
    href: '/courses?category=Programming',
  },
  {
    icon: 'briefcase',
    title: 'Job Seekers',
    subtitle: 'Placement Focused',
    desc: 'Resume building, mock interviews, aptitude training, and direct placement assistance with 200+ hiring partners.',
    color: '#8B5CF6',
    cta: 'Start Placement Prep',
    href: '/register?type=placement',
  },
  {
    icon: 'rocket',
    title: 'Internship Learners',
    subtitle: '50+ Domains Available',
    desc: 'Real-world internship programs across web dev, graphic design, digital marketing, AI, and more.',
    color: '#10B981',
    cta: 'Apply for Internship',
    href: '/register?type=internship',
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function ChooseYourPath() {
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '14px', display: 'inline-flex' }}>
              Who We Help
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              Choose Your <span className="text-gradient">Learning Path</span>
            </h2>
            <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '1rem' }}>
              Whether you&apos;re a school student, college learner, job seeker, or internship aspirant — we have a program built for you.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {PATHS.map(({ icon, title, subtitle, desc, color, cta, href }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="card"
                style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', borderTop: `3px solid ${color}` }}
              >
                <div style={{
                  width: '48px', height: '48px',
                  background: `${color}18`,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <Icon name={icon} color={color} size={24} />
                </div>
                <div style={{ marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'Inter, sans-serif', fontWeight: '700', color: '#F1F5F9' }}>
                    {title}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {subtitle}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.65', flexGrow: 1, margin: '12px 0 20px' }}>
                  {desc}
                </p>
                <Link href={href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color, fontWeight: '600', fontSize: '0.88rem', textDecoration: 'none',
                  transition: 'gap 0.2s',
                }}>
                  {cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
