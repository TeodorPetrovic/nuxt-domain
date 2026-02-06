import { db } from '../database/db';

export default defineEventHandler((event) => {
  const subdomain = event.node.req.headers.host?.split('.')[0] || '';
  
  let facultySubdomain = '';
  if (subdomain === 'fir' || subdomain === 'pfb' || subdomain === 'tf') {
    facultySubdomain = subdomain;
  }
  
  const faculty = db.prepare(`
    SELECT * FROM faculties WHERE subdomain = ?
  `).get(facultySubdomain);
  
  if (!faculty) {
    return { posts: [] };
  }
  
  const posts = db.prepare(`
    SELECT p.*, f.name as faculty_name, f.subdomain
    FROM posts p
    JOIN faculties f ON p.faculty_id = f.id
    WHERE p.faculty_id = ?
    ORDER BY p.created_at DESC
  `).all(faculty.id);
  
  return {
    posts,
    faculty
  };
});
