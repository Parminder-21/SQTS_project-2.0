import { NextResponse } from 'next/server';
import { dbAll } from '@/lib/db';

export async function GET() {
  try {
    const courses = await dbAll('SELECT * FROM courses');

    // Parse the JSON strings back to objects
    const parsedCourses = courses.map(course => ({
      ...course,
      modules: JSON.parse(course.modules),
      packages: JSON.parse(course.packages)
    }));

    return NextResponse.json(parsedCourses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
