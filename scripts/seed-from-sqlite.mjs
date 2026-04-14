import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { createClient } from '@libsql/client';
import path from 'path';
import { config } from 'dotenv';

config({ path: '.env.local' });

async function migrate() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error('❌ TURSO_DATABASE_URL is not set in .env.local');
    process.exit(1);
  }

  // Open local SQLite
  console.log('📂 Opening local sqts.db...');
  const localDb = await open({
    filename: path.join(process.cwd(), 'sqts.db'),
    driver: sqlite3.Database
  });

  // Connect to Turso
  console.log('🔗 Connecting to Turso...');
  const turso = createClient({ url, authToken: authToken || undefined });

  // Create tables in Turso
  console.log('📦 Creating tables in Turso...');
  await turso.executeMultiple(`
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

  // Migrate courses
  console.log('🎓 Migrating courses...');
  const courses = await localDb.all('SELECT * FROM courses');
  for (const c of courses) {
    await turso.execute({
      sql: 'INSERT OR IGNORE INTO courses (id, title, category, description, duration, image, icon, modules, packages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [c.id, c.title, c.category, c.description, c.duration, c.image, c.icon, c.modules, c.packages]
    });
  }
  console.log(`   ✅ ${courses.length} courses migrated`);

  // Migrate students
  console.log('👩‍🎓 Migrating students...');
  const students = await localDb.all('SELECT * FROM students');
  for (const s of students) {
    await turso.execute({
      sql: 'INSERT OR IGNORE INTO students (name, role, company, salary, image) VALUES (?, ?, ?, ?, ?)',
      args: [s.name, s.role, s.company, s.salary, s.image]
    });
  }
  console.log(`   ✅ ${students.length} students migrated`);

  // Migrate reviews
  console.log('⭐ Migrating reviews...');
  const reviews = await localDb.all('SELECT * FROM reviews');
  for (const r of reviews) {
    await turso.execute({
      sql: 'INSERT OR IGNORE INTO reviews (name, course, text, rating, image) VALUES (?, ?, ?, ?, ?)',
      args: [r.name, r.course, r.text, r.rating, r.image]
    });
  }
  console.log(`   ✅ ${reviews.length} reviews migrated`);

  // Migrate users
  console.log('🔐 Migrating users...');
  const users = await localDb.all('SELECT * FROM users');
  for (const u of users) {
    await turso.execute({
      sql: 'INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)',
      args: [u.username, u.password, u.role]
    });
  }
  console.log(`   ✅ ${users.length} users migrated`);

  await localDb.close();
  console.log('\n✅ Migration complete! All data is now in Turso.');
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
