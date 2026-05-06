import { NextResponse } from 'next/server';
import { dbRun } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function POST(request) {
  try {
    const token = getTokenFromRequest(request);

    if (!token) {
      return NextResponse.json({ success: true, message: 'Already logged out' });
    }

    try {
      await dbRun('DELETE FROM refresh_tokens WHERE token = ?', [token]);
    } catch (dbError) {
      console.error('Failed to revoke refresh token on logout:', dbError.message);
    }

    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Failed to process logout' }, { status: 500 });
  }
}
