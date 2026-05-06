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

## Local Setup & Running

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```env
# Turso database (required)
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token

# JWT secrets — generate with: node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
JWT_SECRET=your-64-char-random-secret
JWT_REFRESH_SECRET=your-other-64-char-random-secret

# Optional: SMTP for real emails (falls back to mock/console if not set)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=your-smtp-password
SMTP_FROM="SQTS <noreply@example.com>"
```

> **Never commit `.env.local` to git.** It is already in `.gitignore`.

### 3. Run database migrations

Creates the `refresh_tokens` table and adds 2FA columns to `users`:

```bash
npm run migrate
```

### 4. Seed the database (first time only)

Inserts courses, students, reviews, and the default admin user:

```bash
npm run seed
```

Or run both in one command:

```bash
npm run setup
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Default admin credentials** (created by the seed script):
- Username: `admin`
- Password: `admin123`

> Change the admin password in production by updating the bcrypt hash in the database.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint |
| `npm run migrate` | Run database migrations |
| `npm run seed` | Seed the database from `data/seed/` |
| `npm run setup` | Migrate + seed in one step |

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "ready for deployment"
git push origin main
```

### 2. Import the project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js — no build config needed

### 3. Add environment variables

In your Vercel project → **Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `TURSO_DATABASE_URL` | Your Turso DB URL |
| `TURSO_AUTH_TOKEN` | Your Turso auth token |
| `JWT_SECRET` | A long random string (48+ bytes) |
| `JWT_REFRESH_SECRET` | A different long random string |
| `SMTP_HOST` | *(optional)* Your SMTP host |
| `SMTP_PORT` | *(optional)* 587 or 465 |
| `SMTP_USER` | *(optional)* SMTP username |
| `SMTP_PASS` | *(optional)* SMTP password |
| `SMTP_FROM` | *(optional)* From address |

### 4. Run migrations on Turso

Migrations must be run once against your production Turso database. With your production `.env.local` values set locally:

```bash
npm run migrate
npm run seed   # only if you want to seed production data
```

### 5. Deploy

Vercel deploys automatically on every push to `main`. You can also trigger a manual deploy from the Vercel dashboard.

---

## Project Layout

```
src/
  app/
    (routes)/         # Page routes: admin, courses, register
    api/              # API routes: auth, courses, emails
    layout.js         # Root layout with Navbar, Analytics
    page.js           # Home page
    proxy.js          # Route protection (Next.js 16 proxy)
  components/         # Shared UI and tracking components
  lib/                # auth, db, email, validation, logger, rateLimit
scripts/
  migrate.js          # Database migrations
  seed.mjs            # Database seeding
data/seed/            # JSON fixtures for courses, students, reviews
docs/                 # Project documentation
```

## Documentation

- [Project Documentation](docs/PROJECT_DOCUMENTATION.md)

## License

Private project for SQTS Training Institute.
