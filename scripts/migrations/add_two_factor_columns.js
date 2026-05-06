require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@libsql/client');

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
const db = createClient({ url, authToken: authToken || undefined });

async function migrate() {
  try {
    await db.execute('ALTER TABLE users ADD COLUMN two_factor_secret TEXT;');
  } catch (error) {
    console.log('col two_factor_secret might exist');
  }

  try {
    await db.execute('ALTER TABLE users ADD COLUMN two_factor_enabled INTEGER DEFAULT 0;');
  } catch (error) {
    console.log('col two_factor_enabled might exist');
  }

  console.log('migration done');
}

migrate();