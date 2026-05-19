/**
 * POST /api/enquiry
 *
 * Integration strategy (priority order):
 * 1. Formspree (primary) — zero-config, free 50/mo
 * 2. SQLite (fallback) — already present via sqts.db
 *
 * To enable Formspree: set FORMSPREE_ENDPOINT in .env.local
 *   e.g. FORMSPREE_ENDPOINT=https://formspree.io/f/xyzABCDE
 *
 * To enable Google Sheets via Apps Script:
 *   set GSHEET_WEBHOOK in .env.local pointing to your
 *   published Apps Script web app URL.
 *
 * The DB fallback always runs regardless of the above.
 */

import { NextResponse } from 'next/server';
import { dbExec, dbRun } from '@/lib/db';

const REQUIRED = ['name', 'phone', 'email', 'course', 'city'];

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // ── Validate required fields ──────────────────────────────────────────────
  const missing = REQUIRED.filter(k => !body[k]?.toString().trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 422 }
    );
  }

  const payload = {
    name:         body.name.trim(),
    phone:        body.phone.trim(),
    email:        body.email.trim().toLowerCase(),
    course:       body.course.trim(),
    classCollege: body.classCollege?.trim() || '',
    city:         body.city.trim(),
    message:      body.message?.trim() || '',
    submittedAt:  new Date().toISOString(),
    source:       req.headers.get('referer') || 'direct',
  };

  const results = await Promise.allSettled([
    sendToFormspree(payload),
    sendToGSheet(payload),
    saveToDb(payload),
  ]);

  // If at least one integration succeeded, return 200
  const anySuccess = results.some(r => r.status === 'fulfilled' && r.value?.ok);
  const dbSaved    = results[2].status === 'fulfilled' && results[2].value?.ok;

  if (anySuccess || dbSaved) {
    return NextResponse.json({ ok: true, message: 'Enquiry received.' });
  }

  // Log errors for debugging (server-side only)
  console.error('[enquiry] All integrations failed:', results.map(r => r.reason || r.value));
  return NextResponse.json(
    { error: 'Could not save your enquiry. Please call us directly or WhatsApp us.' },
    { status: 500 }
  );
}

/* ── Integration 1: Formspree ────────────────────────────────────────────── */
async function sendToFormspree(data) {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) return { ok: false, reason: 'Not configured' };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Formspree error: ${err}`);
  }
  return { ok: true };
}

/* ── Integration 2: Google Sheets via Apps Script ────────────────────────── */
async function sendToGSheet(data) {
  const webhookUrl = process.env.GSHEET_WEBHOOK;
  if (!webhookUrl) return { ok: false, reason: 'Not configured' };

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    redirect: 'follow',
  });

  if (!res.ok) throw new Error(`GSheet webhook error: ${res.status}`);
  return { ok: true };
}

/* ── Integration 3: SQLite fallback ──────────────────────────────────────── */
async function saveToDb(data) {
  try {
    await dbExec(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        name         TEXT NOT NULL,
        phone        TEXT NOT NULL,
        email        TEXT NOT NULL,
        course       TEXT NOT NULL,
        class_college TEXT,
        city         TEXT NOT NULL,
        message      TEXT,
        source       TEXT,
        submitted_at TEXT NOT NULL
      )
    `);

    await dbRun(`
      INSERT INTO enquiries (name, phone, email, course, class_college, city, message, source, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      data.name, data.phone, data.email, data.course,
      data.classCollege, data.city, data.message,
      data.source, data.submittedAt,
    ]);

    return { ok: true };
  } catch (err) {
    throw new Error(`DB error: ${err.message}`);
  }
}
