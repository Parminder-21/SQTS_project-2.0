# SQTS Training Institute 🎓

> Premium job-focused training with industry-level curriculum, placement assistance, and modern web experience.

[![Live Demo](https://img.shields.io/badge/Live-Vercel-black?logo=vercel)](https://sqts-project-2-0.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![Turso](https://img.shields.io/badge/Database-Turso-blue)](https://turso.tech)

---

## ✨ Features

- 🚀 **Next.js 16** with App Router
- 🎨 **Glassmorphism UI** with gradient aesthetics
- 🌌 **3D Particle Background** powered by Three.js & React Three Fiber
- 🎞️ **Smooth Animations** with Framer Motion
- 🗄️ **Turso (libSQL)** — hosted SQLite database, works on Vercel
- 👤 **Admin Dashboard** — manage courses (edit/delete)
- 🎓 **Alumni Showcase** — placed students from the DB
- 📱 **Fully Responsive** design

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | Vanilla CSS, Framer Motion |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| Database | Turso (hosted libSQL) |
| Auth | bcryptjs + JWT |
| Deployment | Vercel |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```env
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

> Get these from [app.turso.tech](https://app.turso.tech) after creating a database.

### 3. Seed the database (first time only)

```bash
npm run seed
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (routes)/
│   │   ├── admin/        # Admin dashboard
│   │   ├── alumni/       # Alumni showcase
│   │   ├── courses/      # Courses list & detail pages
│   │   └── register/     # Register / Login page
│   ├── api/
│   │   └── courses/      # REST API routes
│   ├── layout.js         # Root layout
│   └── page.js           # Home page
├── components/
│   └── ui/               # Navbar, Custom Cursor
└── lib/
    └── db.js             # Turso DB client & helpers
scripts/
└── seed-from-sqlite.mjs  # One-time local DB migration tool
```

---

## 🌐 Deployment

This project is deployed on **Vercel**. Every push to `main` triggers an automatic re-deployment.

### Required Environment Variables on Vercel

| Key | Description |
|---|---|
| `TURSO_DATABASE_URL` | Your Turso database URL (`libsql://...`) |
| `TURSO_AUTH_TOKEN` | Your Turso auth token |

---

## 📜 License

Private project — © SQTS Training Institute
