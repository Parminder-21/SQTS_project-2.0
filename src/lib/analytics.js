const isBrowser = typeof window !== 'undefined';

function safeTrack(eventName, payload = {}) {
  if (!isBrowser) return;

  try {
    if (typeof window.posthog?.capture === 'function') {
      window.posthog.capture(eventName, payload);
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...payload });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.info(`[analytics] ${eventName}`, payload);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[analytics] tracking failed', error);
    }
  }
}

export function trackPageView(pathname, search = '') {
  safeTrack('page_view', { pathname, search });
}

export function trackCourseView(courseId, courseTitle) {
  safeTrack('course_view', { courseId, courseTitle });
}

export function trackAdminLogin(username) {
  safeTrack('admin_login', { username });
}

export function trackCourseSearch(query, filters = {}) {
  safeTrack('course_search', { query, ...filters });
}

export function trackCourseAction(action, details = {}) {
  safeTrack('course_action', { action, ...details });
}
