'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CATEGORIES = [
  {
    icon: '🏫',
    title: 'School Coaching',
    desc: 'Computer basics, MS Office, typing, and digital literacy for Class 3–8 students.',
    tags: ['MS Office', 'Typing', 'Internet Basics', 'Digital Safety'],
    color: '#3B82F6',
    href: '/courses?category=School+Coaching',
  },
  {
    icon: '💻',
    title: 'Programming Courses',
    desc: 'Python, C, C++, Java, and DSA — from beginner to placement-ready.',
    tags: ['Python', 'Java', 'C/C++', 'DSA'],
    color: '#06B6D4',
    href: '/courses?category=Programming',
  },
  {
    icon: '🌐',
    title: 'Web Development',
    desc: 'Full-stack web development with HTML, CSS, JavaScript, React, and Node.js.',
    tags: ['HTML/CSS', 'React', 'Node.js', 'MongoDB'],
    color: '#8B5CF6',
    href: '/courses?category=Web+Development',
  },
  {
    icon: '🤖',
    title: 'AI & Future Tech',
    desc: 'Practical AI tools, prompt engineering, machine learning basics, and data science.',
    tags: ['AI Tools', 'Prompt Eng.', 'ML Basics', 'Data Science'],
    color: '#10B981',
    href: '/courses?category=Artificial+Intelligence',
  },
  {
    icon: '📋',
    title: 'Internship Programs',
    desc: '50+ domains — get real work experience with a certificate and mentor guidance.',
    tags: ['Web Dev', 'Graphic Design', 'Digital Marketing', 'AI'],
    color: '#F59E0B',
    href: '/register?type=internship',
  },
  {
    icon: '🎨',
    title: 'Graphic Design & Digital Skills',
    desc: 'Canva, Photoshop, video editing, social media marketing, and SEO.',
    tags: ['Canva', 'Photoshop', 'Video Editing', 'SEO'],
    color: '#EC4899',
    href: '/courses?category=Digital+Marketing',
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function TrainingCategories() {
  return (
    <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '14px', display: 'inline-flex' }}>
              Training Programs
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              What We <span className="text-gradient">Teach</span>
            </h2>
            <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '1rem' }}>
              Practical, industry-aligned programs across 6 domains — from school-level basics to advanced tech skills.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {CATEGORIES.map(({ icon, title, desc, tags, color, href }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="card"
                style={{ padding: '28px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
              >
                {/* Top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: color }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: `${color}18`, borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem',
                  }}>{icon}</div>
                  <h3 style={{ fontSize: '1.05rem', fontFamily: 'Inter, sans-serif', fontWeight: '700', color: '#F1F5F9' }}>
                    {title}
                  </h3>
                </div>

                <p style={{ fontSize: '0.87rem', lineHeight: '1.65', flexGrow: 1, marginBottom: '16px' }}>
                  {desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.72rem', fontWeight: '600',
                      background: `${color}14`,
                      color,
                      border: `1px solid ${color}30`,
                      padding: '3px 10px',
                      borderRadius: '999px',
                    }}>{tag}</span>
                  ))}
                </div>

                <Link href={href} style={{
                  color, fontWeight: '600', fontSize: '0.88rem',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px',
                }}>
                  Explore Program →
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/courses" className="btn-outline">View All Programs</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
