import { db } from '../database/db';

interface Faculty {
  faculty_id: number;
  name: string;
  subdomain: string;
  created_at: string;
}

export default defineEventHandler((event) => {
  const host = event.node.req.headers.host ?? '';
  const subdomain = host.includes('.') ? (host.split('.')[0] ?? '') : '';

  const allowedSubdomains = new Set(['fir', 'pfb', 'tf']);
  const isFacultySubdomain = allowedSubdomains.has(subdomain);

  if (isFacultySubdomain) {
    const faculty = db.prepare(`
      SELECT * FROM faculty WHERE subdomain = ?
    `).get(subdomain) as Faculty | undefined;

    if (!faculty) {
      return { posts: [] };
    }

    const posts = db.prepare(`
      SELECT
        p.post_id,
        p.title,
        p.content,
        p.faculty_id as faculty_id,
        f.name,
        f.subdomain
      FROM post p
      LEFT JOIN faculty f ON p.faculty_id = f.faculty_id
      WHERE p.faculty_id = ?
      ORDER BY p.created_at DESC
    `).all(faculty.faculty_id);

    return {
      posts,
      faculty
    };
  }

  const posts = db.prepare(`
    SELECT
      p.post_id,
      p.title,
      p.content,
      p.faculty_id as faculty_id,
      f.name,
      f.subdomain
    FROM post p
    LEFT JOIN faculty f ON p.faculty_id = f.faculty_id
    ORDER BY p.created_at DESC
  `).all();

  return {
    posts,
    faculty: null
  };
});
