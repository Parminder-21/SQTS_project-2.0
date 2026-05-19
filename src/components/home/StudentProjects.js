'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STUDENT_PROJECTS } from '@/data/trust';

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const PROJECT_TYPES = ['All', 'Full Stack App', 'Data Dashboard', 'AI Project', 'Portfolio', 'Python App', 'Design Project'];

function ProjectCard({ project }) {
  const { title, student, course, type, desc, tags, color, icon } = project;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.28 }}
      className="card"
      style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}
      whileHover={{ borderColor: `${color}40` }}
    >
      {/* Icon + Type badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{
          width: '48px', height: '48px',
          background: `${color}15`,
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', flexShrink: 0,
        }}>
          {icon}
        </div>
        <span style={{
          fontSize: '0.7rem', fontWeight: '700',
          padding: '3px 10px', borderRadius: '999px',
          background: `${color}15`, color,
          border: `1px solid ${color}30`,
          whiteSpace: 'nowrap',
        }}>
          {type}
        </span>
      </div>

      {/* Title + desc */}
      <div>
        <h4 style={{ fontSize: '1rem', color: '#F1F5F9', marginBottom: '6px' }}>{title}</h4>
        <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>{desc}</p>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontSize: '0.7rem', padding: '2px 8px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            borderRadius: '6px', fontWeight: '500',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Student credit */}
      <div style={{
        paddingTop: '12px', borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '28px', height: '28px',
          background: `${color}20`,
          border: `1.5px solid ${color}40`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem', fontWeight: '800', color,
          flexShrink: 0,
        }}>
          {student.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#CBD5E1' }}>{student}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{course}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StudentProjects() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? STUDENT_PROJECTS
    : STUDENT_PROJECTS.filter(p => p.type === filter);

  return (
    <section id="projects" style={{ padding: '90px 0', background: 'var(--bg)' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              💼 Student Projects
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', marginBottom: '14px' }}>
              What Our Students{' '}
              <span className="text-gradient">Actually Build</span>
            </h2>
            <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
              Every student leaves with a project portfolio — real, deployable work that speaks for itself in interviews.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={fadeUp} style={{
            display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center',
            marginBottom: '36px',
          }}>
            {PROJECT_TYPES.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '999px',
                  border: '1.5px solid',
                  borderColor: filter === t ? 'var(--primary-light)' : 'var(--border)',
                  background: filter === t ? 'var(--primary-dim)' : 'transparent',
                  color: filter === t ? '#93C5FD' : 'var(--text-muted)',
                  fontSize: '0.82rem', fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {t}
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-faint)', marginTop: '32px' }}>
              No projects in this category yet.
            </p>
          )}

          <motion.p
            variants={fadeUp}
            style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '28px' }}
          >
            * Sample project showcase. Real student project links will be added with consent.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
