# SQTS Training Institute

SQTS Training Institute is a Next.js 16 app for showcasing training programs, managing admin workflows, and serving Turso-backed course data.

## What It Includes

- Public course catalog with search, category filtering, and pagination
- Course detail pages with view tracking
- Admin dashboard with JWT login, logout, and CRUD actions
- Refresh-token auth flow and middleware protection
- Two-factor authentication setup and verification
- Email send endpoint for admin-driven notifications
- Analytics hooks for page, course, and admin events
- Validation, logging, and rate-limiting utilities

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.2.3 |
| UI | React 19.2.4, Framer Motion |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| Database | Turso / libSQL |
| Auth | JWT, bcryptjs, otplib, qrcode |
| Email | Nodemailer |

## Setup

1. Install dependencies.

```bash
npm install
```

2. Create `.env.local` with your Turso credentials.

```env
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

3. Seed the database if needed.

```bash
npm run seed
```

4. Start the app.

```bash
npm run dev
```

## Useful Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run lint` - lint the project
- `npm run seed` - seed Turso from `data/seed/`
- `npm run seed:migrate` - migrate from local SQLite to Turso

## Project Layout

- `src/app` - App Router pages, layouts, errors, and API routes
- `src/components` - Shared UI and tracking helpers
- `src/lib` - Auth, database, email, validation, logging, and rate limit helpers
- `scripts` - Seed and migration scripts
- `data/seed` - Sample JSON fixtures used by the seed script

## Deployment

This project is Vercel-ready. Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in your deployment environment.

## Documentation

- [Project document](docs/PROJECT_DOCUMENTATION.md)

## License

Private project for SQTS Training Institute.
