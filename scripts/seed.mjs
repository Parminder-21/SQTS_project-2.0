import fs from 'fs';
import path from 'path';
import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';

// Load env vars from .env.local manually (since this is a plain node script)
import { config } from 'dotenv';
config({ path: '.env.local' });

async function seed() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error('❌ TURSO_DATABASE_URL is not set in .env.local');
    process.exit(1);
  }

  console.log('🔗 Connecting to Turso database...');
  const db = createClient({ url, authToken: authToken || undefined });

  console.log('📦 Creating tables...');
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      title TEXT,
      category TEXT,
      description TEXT,
      duration TEXT,
      image TEXT,
      icon TEXT,
      modules TEXT,
      packages TEXT
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'user'
    );

    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      role TEXT,
      company TEXT,
      salary TEXT,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      course TEXT,
      text TEXT,
      rating INTEGER,
      image TEXT
    );
  `);

  console.log('🎓 Seeding courses...');
  const courses = JSON.parse(fs.readFileSync(path.join(process.cwd(), '_legacy', 'data', 'courses.json'), 'utf8'));
  for (const course of courses) {
    await db.execute({
      sql: 'INSERT OR IGNORE INTO courses (id, title, category, description, duration, image, icon, modules, packages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [course.id, course.title, course.category, course.description, course.duration, course.image, course.icon, JSON.stringify(course.modules), JSON.stringify(course.packages)]
    });
  }

  console.log('⭐ Seeding reviews...');
  const reviews = JSON.parse(fs.readFileSync(path.join(process.cwd(), '_legacy', 'data', 'reviews.json'), 'utf8'));
  for (const review of reviews) {
    await db.execute({
      sql: 'INSERT INTO reviews (name, course, text, rating, image) VALUES (?, ?, ?, ?, ?)',
      args: [review.name, review.course, review.text, review.rating, review.image]
    });
  }

  console.log('👩‍🎓 Seeding students...');
  const students = JSON.parse(fs.readFileSync(path.join(process.cwd(), '_legacy', 'data', 'students.json'), 'utf8'));
  for (const student of students) {
    await db.execute({
      sql: 'INSERT INTO students (name, role, company, salary, image) VALUES (?, ?, ?, ?, ?)',
      args: [student.name, student.role, student.company, student.salary, student.image]
    });
  }

  console.log('🔐 Creating admin user...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  await db.execute({
    sql: 'INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)',
    args: ['admin', adminPassword, 'admin']
  });

  console.log('✅ Database seeded successfully!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
