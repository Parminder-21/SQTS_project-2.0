# SQTS Training Institute 🎓

> Premium job-focused training with industry-level curriculum, placement assistance, and a modern dynamic web experience.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-sqts--project--2--0.vercel.app-black?logo=vercel&style=for-the-badge)](https://sqts-project-2-0.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js&style=for-the-badge)](https://nextjs.org)
[![Turso](https://img.shields.io/badge/Database-Turso-4FC6E4?logo=sqlite&style=for-the-badge)](https://turso.tech)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel&style=for-the-badge)](https://vercel.com)

---

## ✨ Features

- 🚀 **Next.js 16** App Router with server & client components
- 🌌 **3D Particle Background** — Three.js + React Three Fiber
- 🎞️ **Smooth Animations** — Framer Motion throughout
- 🎨 **Glassmorphism UI** — dark mode with gradient aesthetics
- 🗄️ **Turso (libSQL)** — cloud-hosted SQLite, fully compatible with Vercel
- 📚 **Courses** — dynamic listing, category badges, module previews, pricing plans
- 🎓 **Alumni Showcase** — placed students fetched live from the DB
- 🛠️ **Admin Dashboard** — edit/delete courses in real time
- 📱 **Fully Responsive** design across all devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Vanilla CSS + Glassmorphism |
| Animations | Framer Motion |
| 3D Graphics | Three.js, @react-three/fiber, @react-three/drei |
| Database | Turso (hosted libSQL / SQLite) |
| Auth | bcryptjs + JWT |
| Deployment | Vercel (Production) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (routes)/
│   │   ├── admin/        # Admin dashboard — edit/delete courses
│   │   ├── alumni/       # Alumni showcase (server component, dynamic)
│   │   ├── courses/      # Courses list & detail pages (dynamic)
│   │   └── register/     # Register / Login page
│   ├── api/
│   │   └── courses/      # REST API — GET all, PUT/DELETE by ID
│   ├── layout.js         # Root layout with Navbar & custom cursor
│   └── page.js           # Home page with 3D background & countdown
├── components/
│   └── ui/               # Navbar, CustomCursor
└── lib/
    └── db.js             # Turso DB client + dbAll / dbGet / dbRun helpers

scripts/
├── seed.mjs              # Seed script (requires _legacy/data JSON files)
└── seed-from-sqlite.mjs  # One-time migration: local sqts.db → Turso
```

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/Parminder-21/SQTS_project-2.0.git
cd SQTS_project-2.0
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```env
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

> Get these from [app.turso.tech](https://app.turso.tech) — create a DB, then generate a token.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🌐 Deployment (Vercel)

This project is deployed on **Vercel** at:
👉 **[sqts-project-2-0.vercel.app](https://sqts-project-2-0.vercel.app)**

Every push to `main` triggers an **automatic redeployment**.

### Required Environment Variables on Vercel

| Key | Description |
|---|---|
| `TURSO_DATABASE_URL` | Your Turso database URL (`libsql://...`) |
| `TURSO_AUTH_TOKEN` | Your Turso auth token |

---

## 🗄️ Database

Data is stored in **Turso** (cloud-hosted SQLite). Tables:

| Table | Contents |
|---|---|
| `courses` | Course title, category, description, modules (JSON), pricing packages (JSON) |
| `students` | Alumni placement records — name, role, company, salary |
| `reviews` | Student reviews with rating |
| `users` | Admin accounts (bcrypt-hashed passwords) |

To migrate data from a local `sqts.db` file to Turso:

```bash
npm run seed
```

---

## 📜 License

Private project — © SQTS Training Institute
