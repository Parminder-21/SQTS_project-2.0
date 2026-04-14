import { createClient } from '@libsql/client';

// Singleton client instance
let client = null;

export function getDb() {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
      throw new Error('TURSO_DATABASE_URL environment variable is not set. Please add it to your .env.local file.');
    }

    client = createClient({
      url,
      authToken: authToken || undefined,
    });
  }
  return client;
}

// Helper: run a SELECT and return all rows as plain objects
export async function dbAll(sql, args = []) {
  const db = getDb();
  const result = await db.execute({ sql, args });
  return result.rows;
}

// Helper: run an INSERT / UPDATE / DELETE
export async function dbRun(sql, args = []) {
  const db = getDb();
  const result = await db.execute({ sql, args });
  return result;
}

// Helper: run a SELECT and return the first row
export async function dbGet(sql, args = []) {
  const db = getDb();
  const result = await db.execute({ sql, args });
  return result.rows[0] ?? null;
}

// Helper: run multiple statements (DDL / migrations)
export async function dbExec(sql) {
  const db = getDb();
  await db.executeMultiple(sql);
}
