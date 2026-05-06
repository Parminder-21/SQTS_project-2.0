# SQTS Project 2.0 Project Document

## Overview
SQTS Training Institute is a Next.js 16 application for showcasing training programs, handling admin operations, and serving database-backed course content.

## Current Capabilities
- Public course catalog with server-side filtering and pagination
- Course detail pages with view tracking
- Admin dashboard with authenticated login, logout, and CRUD actions
- JWT auth with refresh tokens and route protection
- Two-factor authentication setup, verification, and disable flow
- Email sending support for admin-driven notifications
- Analytics hooks for page views, course views, and admin logins
- Global and route-specific error boundaries
- Structured logging, validation, and rate limiting helpers

## Main Routes
- `/` Home page
- `/courses` Course catalog
- `/courses/[id]` Course detail page
- `/register` Registration page
- `/alumni` Alumni showcase
- `/admin` Admin dashboard
- `/api/auth/*` Authentication endpoints
- `/api/courses/*` Course APIs
- `/api/emails/send` Admin email endpoint

## Stack
- Next.js 16.2.3
- React 19.2.4
- Turso / libSQL
- JWT, bcryptjs, otplib, qrcode
- Nodemailer
- Framer Motion
- Three.js / React Three Fiber

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