'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COURSES = [
  'School Coaching (Class 6–12)',
  'Programming Fundamentals',
  'Web Development (Full-Stack)',
  'Python & Data Science',
  'AI & Machine Learning',
  'Graphic Design & Digital Marketing',
  'Internship Program',
  'Placement Preparation',
  'Other / Not sure yet',
];

const CITIES = [
  'Chandigarh', 'Mohali', 'Panchkula', 'Ambala',
  'Ludhiana', 'Amritsar', 'Jalandhar', 'Delhi NCR',
  'Other',
];

const INITIAL = {
  name: '', phone: '', email: '',
  course: '', classCollege: '', city: '', message: '',
};

function validate(fields) {
  const errors = {};
  if (!fields.name.trim())               errors.name    = 'Your name is required.';
  if (!fields.phone.trim())              errors.phone   = 'Phone number is required.';
  else if (!/^[6-9]\d{9}$/.test(fields.phone.replace(/\s+/g, '')))
                                         errors.phone   = 'Enter a valid 10-digit Indian mobile number.';
  if (!fields.email.trim())             errors.email   = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                                         errors.email   = 'Enter a valid email address.';
  if (!fields.course)                    errors.course  = 'Please select a course or program.';
  if (!fields.city)                      errors.city    = 'Please select your city.';
  return errors;
}

export default function EnquiryForm() {
  const [fields,   setFields]   = useState(INITIAL);
  const [errors,   setErrors]   = useState({});
  const [touched,  setTouched]  = useState({});
  const [status,   setStatus]   = useState('idle'); // idle | loading | success | error
  const [apiError, setApiError] = useState('');

  const update = (key, val) => {
    setFields(f => ({ ...f, [key]: val }));
    if (touched[key]) {
      // Re-validate this field live
      const errs = validate({ ...fields, [key]: val });
      setErrors(e => ({ ...e, [key]: errs[key] || undefined }));
    }
  };

  const blur = (key) => {
    setTouched(t => ({ ...t, [key]: true }));
    const errs = validate({ ...fields });
    setErrors(e => ({ ...e, [key]: errs[key] || undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all as touched
    setTouched({ name:1, phone:1, email:1, course:1, city:1 });
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    setApiError('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setApiError(err.message || 'Something went wrong. Please try again.');
    }
  };

  const reset = () => {
    setFields(INITIAL);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setApiError('');
  };

  if (status === 'success') {
    return <SuccessState onReset={reset} name={fields.name} />;
  }

  return (
    <div className="enq-form-wrap">
      <AnimatePresence>
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="alert-error" style={{ marginBottom: '20px' }}
          >
            ⚠️ {apiError}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate aria-label="Enquiry form">
        {/* Row 1: Name + Phone */}
        <div className="enq-row">
          <Field
            id="enq-name" label="Full Name" required
            error={touched.name && errors.name}
          >
            <input
              id="enq-name" type="text" autoComplete="name"
              placeholder="Amanpreet Singh"
              value={fields.name}
              onChange={e => update('name', e.target.value)}
              onBlur={() => blur('name')}
              className={`input${touched.name && errors.name ? ' input--error' : ''}`}
              aria-describedby={errors.name ? 'enq-name-err' : undefined}
              aria-invalid={!!(touched.name && errors.name)}
            />
          </Field>

          <Field
            id="enq-phone" label="Phone Number" required
            error={touched.phone && errors.phone}
          >
            <input
              id="enq-phone" type="tel" autoComplete="tel" inputMode="numeric"
              placeholder="98765 43210"
              value={fields.phone}
              onChange={e => update('phone', e.target.value)}
              onBlur={() => blur('phone')}
              className={`input${touched.phone && errors.phone ? ' input--error' : ''}`}
              aria-describedby={errors.phone ? 'enq-phone-err' : undefined}
              aria-invalid={!!(touched.phone && errors.phone)}
            />
          </Field>
        </div>

        {/* Email */}
        <Field
          id="enq-email" label="Email Address" required
          error={touched.email && errors.email}
        >
          <input
            id="enq-email" type="email" autoComplete="email"
            placeholder="you@example.com"
            value={fields.email}
            onChange={e => update('email', e.target.value)}
            onBlur={() => blur('email')}
            className={`input${touched.email && errors.email ? ' input--error' : ''}`}
            aria-describedby={errors.email ? 'enq-email-err' : undefined}
            aria-invalid={!!(touched.email && errors.email)}
          />
        </Field>

        {/* Row 2: Course + City */}
        <div className="enq-row">
          <Field
            id="enq-course" label="Course Interested In" required
            error={touched.course && errors.course}
          >
            <select
              id="enq-course"
              value={fields.course}
              onChange={e => update('course', e.target.value)}
              onBlur={() => blur('course')}
              className={`input enq-select${touched.course && errors.course ? ' input--error' : ''}`}
              aria-describedby={errors.course ? 'enq-course-err' : undefined}
              aria-invalid={!!(touched.course && errors.course)}
            >
              <option value="">Select a program…</option>
              {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          <Field
            id="enq-city" label="Your City" required
            error={touched.city && errors.city}
          >
            <select
              id="enq-city"
              value={fields.city}
              onChange={e => update('city', e.target.value)}
              onBlur={() => blur('city')}
              className={`input enq-select${touched.city && errors.city ? ' input--error' : ''}`}
              aria-describedby={errors.city ? 'enq-city-err' : undefined}
              aria-invalid={!!(touched.city && errors.city)}
            >
              <option value="">Select city…</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        {/* Class / College */}
        <Field id="enq-class" label="Class / College Name (optional)">
          <input
            id="enq-class" type="text"
            placeholder="e.g. Class 10, DAV College Chandigarh"
            value={fields.classCollege}
            onChange={e => update('classCollege', e.target.value)}
            className="input"
          />
        </Field>

        {/* Message */}
        <Field id="enq-msg" label="Message (optional)">
          <textarea
            id="enq-msg" rows={3}
            placeholder="Any specific questions or requirements? Let us know…"
            value={fields.message}
            onChange={e => update('message', e.target.value)}
            className="input enq-textarea"
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary enq-submit"
          disabled={status === 'loading'}
          id="enq-submit-btn"
        >
          {status === 'loading' ? (
            <><span className="enq-spinner" aria-hidden="true" /> Sending…</>
          ) : (
            <>Send Enquiry →</>
          )}
        </button>
      </form>

      {/* Trust note */}
      <TrustNote />

      <style>{`
        .enq-form-wrap { width: 100%; }

        .enq-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 560px) {
          .enq-row { grid-template-columns: 1fr; }
        }

        .enq-field { margin-bottom: 18px; }

        .enq-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #CBD5E1;
          margin-bottom: 7px;
        }
        .enq-required { color: #F87171; margin-left: 3px; }

        .input--error {
          border-color: var(--danger) !important;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12) !important;
        }
        .enq-error-msg {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          color: #FCA5A5;
          margin-top: 5px;
        }

        .enq-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 38px;
          cursor: pointer;
        }
        .enq-select option { background: #162B45; }

        .enq-textarea { resize: vertical; min-height: 80px; }

        .enq-submit {
          width: 100%;
          padding: 15px;
          font-size: 1rem;
          margin-top: 4px;
          position: relative;
        }
        .enq-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .enq-spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: enq-spin 0.7s linear infinite;
        }
        @keyframes enq-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

/* ── Field wrapper ── */
function Field({ id, label, required, error, children }) {
  const errId = `${id}-err`;
  return (
    <div className="enq-field">
      <label className="enq-label" htmlFor={id}>
        {label}
        {required && <span className="enq-required" aria-hidden="true">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errId}
            role="alert"
            className="enq-error-msg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            ⚠ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Trust note ── */
function TrustNote() {
  const items = [
    { icon: '⚡', text: 'Typically replies within 2 hours' },
    { icon: '🕐', text: 'Support: Mon–Sat, 9 AM – 7 PM' },
    { icon: '🔒', text: 'Your details are safe with us — no spam' },
  ];
  return (
    <div className="trust-note">
      {items.map(({ icon, text }) => (
        <div key={text} className="trust-note__item">
          <span aria-hidden="true">{icon}</span>
          <span>{text}</span>
        </div>
      ))}
      <style>{`
        .trust-note {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1px solid var(--border);
        }
        .trust-note__item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

/* ── Success state ── */
function SuccessState({ onReset, name }) {
  const firstName = name.split(' ')[0] || 'there';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{ textAlign: 'center', padding: '40px 24px' }}
      role="status"
      aria-live="polite"
    >
      {/* Checkmark */}
      <div style={{
        width: '72px', height: '72px',
        background: 'rgba(16,185,129,0.15)',
        border: '2px solid rgba(16,185,129,0.4)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px',
        fontSize: '2rem',
      }}>✓</div>

      <h3 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.6rem',
        color: '#F1F5F9',
        marginBottom: '12px',
      }}>
        Got it, {firstName}! 🎉
      </h3>
      <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '28px', maxWidth: '360px', margin: '0 auto 28px' }}>
        Your enquiry has been received. Our counsellor will reach out within 2 hours during working hours.
      </p>

      {/* WhatsApp shortcut */}
      <a
        href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I just submitted an enquiry on the Shree Balaji website. My name is ${name}.`)}`}
        target="_blank" rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#25D366', color: '#fff',
          padding: '11px 24px', borderRadius: '999px',
          fontWeight: '600', fontSize: '0.9rem',
          textDecoration: 'none', marginBottom: '16px',
        }}
      >
        <svg viewBox="0 0 32 32" width="18" height="18" fill="white" aria-hidden="true">
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.44.64 4.72 1.76 6.72L2 30l7.52-1.72A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm6.26 19.28c-.34.18-.66.4-1.02.4-.34 0-.76-.16-1.14-.34-.38-.18-2.26-1.12-2.6-1.26-.34-.14-.58-.2-.82.2s-.94 1.18-1.16 1.42c-.22.24-.44.28-.8.08-.34-.18-1.44-.52-2.74-1.68-1.02-.9-1.7-2-1.9-2.34-.2-.34-.02-.52.14-.7.16-.16.34-.42.52-.62.18-.2.24-.34.36-.56.12-.22.06-.42-.02-.6-.08-.18-.8-1.92-1.1-2.62-.28-.68-.58-.58-.8-.6-.2-.02-.44-.02-.68-.02-.24 0-.62.08-.94.42-.32.34-1.22 1.2-1.22 2.9s1.24 3.36 1.42 3.6c.18.22 2.44 3.72 5.9 5.22.82.36 1.46.56 1.96.72.82.26 1.58.22 2.16.14.66-.1 2.02-.82 2.3-1.62.28-.8.28-1.48.2-1.62-.08-.14-.32-.22-.66-.4z"/>
        </svg>
        Chat on WhatsApp Now
      </a>

      <div>
        <button
          onClick={onReset}
          style={{
            background: 'none', border: 'none',
            color: 'var(--text-muted)', cursor: 'pointer',
            fontSize: '0.85rem', textDecoration: 'underline',
          }}
        >
          Submit another enquiry
        </button>
      </div>
    </motion.div>
  );
}
