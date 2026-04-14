import { createClient } from '@libsql/client';

// Singleton client instance
let client = null;

export function getDb() {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
      throw new Error('TURSO_DATABASE_URL environment variable is not set.');
    }

    client = createClient({
      url,
      authToken: authToken || undefined,
    });
  }
  return client;
}

// Convert a libsql Row (special proxy object) into a plain JS object
function toPlainObject(row, columns) {
  const obj = {};
  columns.forEach((col, i) => {
    obj[col] = row[i];
  });
  return obj;
}

// Run a SELECT and return all rows as plain objects
export async function dbAll(sql, args = []) {
  const db = getDb();
  const result = await db.execute({ sql, args });
  return result.rows.map(row => toPlainObject(row, result.columns));
}

// Run an INSERT / UPDATE / DELETE
export async function dbRun(sql, args = []) {
  const db = getDb();
  return await db.execute({ sql, args });
}

// Run a SELECT and return the first row as a plain object
export async function dbGet(sql, args = []) {
  const db = getDb();
  const result = await db.execute({ sql, args });
  if (result.rows.length === 0) return null;
  return toPlainObject(result.rows[0], result.columns);
}

// Run multiple DDL statements
export async function dbExec(sql) {
  const db = getDb();
  await db.executeMultiple(sql);
}
