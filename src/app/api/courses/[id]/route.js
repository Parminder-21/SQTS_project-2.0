import { NextResponse } from 'next/server';
import { dbRun } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    await dbRun(
      'UPDATE courses SET title = ?, description = ?, category = ? WHERE id = ?',
      [body.title, body.description, body.category, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await dbRun('DELETE FROM courses WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
