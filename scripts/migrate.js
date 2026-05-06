/**
 * Run all database migrations in order.
 * Usage: node scripts/migrate.js
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@libsql/client');

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error('❌ TURSO_DATABASE_URL is not set in .env.local');
  process.exit(1);
}

const db = createClient({ url, authToken: authToken || undefined });

async function migrate() {
  console.log('🔗 Connecting to Turso database…');

  // ── Migration 1: refresh_tokens table ─────────────────────────────────────
  console.log('📦 [1/2] Creating refresh_tokens table…');
  await db.execute(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      token     TEXT UNIQUE NOT NULL,
      username  TEXT NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // ── Migration 2: 2FA columns on users ─────────────────────────────────────
  console.log('📦 [2/2] Adding 2FA columns to users table…');
  try {
    await db.execute('ALTER TABLE users ADD COLUMN two_factor_secret TEXT;');
  } catch {
    // Column already exists — safe to ignore
  }
  try {
    await db.execute('ALTER TABLE users ADD COLUMN two_factor_enabled INTEGER DEFAULT 0;');
  } catch {
    // Column already exists — safe to ignore
  }

  console.log('✅ All migrations completed successfully.');
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
