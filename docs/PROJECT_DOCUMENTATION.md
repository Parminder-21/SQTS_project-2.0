# Shree Balaji Coaching Institute (previously SQTS) Project Document

**🚀 Live Demo Link:** [https://sqts-project-2-0.vercel.app/](https://sqts-project-2-0.vercel.app/)

## Overview
Shree Balaji Coaching Institute is a premium tech training, school coaching, and career placement platform built as a high-performance Next.js 16 web application. It handles student registrations, detailed dynamic course catalog pre-rendering, multi-fallback lead storage, and admin dashboards.

## Current Capabilities
- **Dynamic Course Catalog:** Catalog with detailed roadmaps, search, category filtering, and pre-rendering support for 13 custom courses.
- **Syllabus Accordions:** Dynamic course syllabus modules and pricing plan custom cards.
- **Audience Funneling:** Targeted paths for School Coaching, College Programs, Job Seekers, and Internship Aspirants.
- **Placement & Partners Showcase:** Verified placement stories with verified badges and recruiter monograms.
- **Corporate Internship Grid:** Displays active domains, openings, mentor support, and certification info.
- **Multi-fallback Lead Capture:** intake endpoint `/api/enquiry` storing registrations across Formspree, Google Sheets webhooks, and SQLite backups.
- **WhatsApp Counsellor float:** Delay-timed, pulse-animated WhatsApp counselor button.
- **Admin Dashboard:** authenticated login, refresh tokens, and 2FA authentication management.
- **Analytics Provider:** Analytics hooks tracking pages, course views, and admin logins.
- **Robust System Utilities:** Global and route-specific error boundaries, rate limiters, input validation, and structured loggers.

## Main Routes
- `/` Home page (Hero, Stats, Paths, Placement, Internships, Testimonials, FAQ)
- `/courses` Course catalog with search & filters
- `/courses/[id]` Course detail dynamic roadmaps
- `/register` Multi-purpose lead intake form (Demo, Course, Internship, Placement)
- `/contact` Map, address, and interactive enquiry submission form
- `/alumni` Verified placement showcase
- `/admin` Admin dashboard with credentials audit
- `/api/auth/*` Authentication endpoints
- `/api/courses/*` Course APIs
- `/api/enquiry` Lead capture endpoints
- `/api/emails/send` Notification triggers

## Stack
- Next.js 16.2.3 (Turbopack)
- React 19.2.4
- Turso / libSQL (SQLite compatible)
- JWT, bcryptjs, otplib, qrcode
- Nodemailer
- Framer Motion
- Custom CSS design tokens (globals.css)

## Key Files
- [src/app/layout.js](../src/app/layout.js)
- [src/app/page.js](../src/app/page.js)
- [src/app/(routes)/courses/page.js](../src/app/(routes)/courses/page.js)
- [src/app/(routes)/admin/page.js](../src/app/(routes)/admin/page.js)
- [src/lib/auth.js](../src/lib/auth.js)
- [src/lib/db.js](../src/lib/db.js)
- [src/lib/email.js](../src/lib/email.js)
- [src/lib/validation.js](../src/lib/validation.js)
- [src/lib/rateLimit.js](../src/lib/rateLimit.js)
- [src/lib/logger.js](../src/lib/logger.js)

## Data and Scripts
- Seed fixtures: [data/seed](../data/seed)
- Seed command: `npm run seed`
- SQLite migration command: `npm run seed:migrate`
- One-off DB helpers: [scripts/migrations](../scripts/migrations)

## Setup
1. Install dependencies with `npm install`.
2. Create `.env.local` with `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`.
3. Run `npm run seed` if you want the sample content loaded.
4. Start development with `npm run dev`.

## Notes
- The project is currently organized around App Router routes and route handlers.
- Root documentation has been consolidated into this file and the README.