'use client';

import { useEffect } from 'react';
import { trackCourseView } from '@/lib/analytics';

export default function CourseViewTracker({ courseId, courseTitle }) {
  useEffect(() => {
    if (courseId) {
      trackCourseView(courseId, courseTitle);
    }
  }, [courseId, courseTitle]);

  return null;
}
