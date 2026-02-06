import Database from 'better-sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'server/database/data.db');
const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS faculties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    subdomain TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    faculty_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculties(id)
  );
`);

// Check if data already exists
const facultyCount = db.prepare('SELECT COUNT(*) as count FROM faculties').get() as { count: number } | undefined;

if (!facultyCount || facultyCount.count === 0) {
  // Seed faculties
  const insertFaculty = db.prepare('INSERT INTO faculties (name, subdomain) VALUES (?, ?)');
  
  const faculties = [
    { name: 'General Studies', subdomain: '' },
    { name: 'Faculty of Information Research', subdomain: 'fir' },
    { name: 'Physics and Biology', subdomain: 'pfb' },
    { name: 'Technical Faculty', subdomain: 'tf' }
  ];

  for (const faculty of faculties) {
    insertFaculty.run(faculty.name, faculty.subdomain);
  }

  // Seed posts
  const insertPost = db.prepare('INSERT INTO posts (title, content, faculty_id) VALUES (?, ?, ?)');
  
  const posts = [
    // General Studies (faculty_id: 1)
    { title: 'Welcome to General Studies', content: 'This is the main campus with comprehensive programs.', faculty_id: 1 },
    { title: 'Campus Events 2026', content: 'Join us for exciting events throughout the year.', faculty_id: 1 },
    { title: 'Student Resources', content: 'Access library, counseling, and career services.', faculty_id: 1 },
    
    // Faculty of Information Research (faculty_id: 2)
    { title: 'Computer Science Program', content: 'Learn cutting-edge programming and AI technologies.', faculty_id: 2 },
    { title: 'Research Opportunities', content: 'Join our research labs in machine learning and data science.', faculty_id: 2 },
    { title: 'Tech Hackathon 2026', content: 'Annual hackathon with exciting prizes and networking.', faculty_id: 2 },
    
    // Physics and Biology (faculty_id: 3)
    { title: 'Laboratory Safety', content: 'Important guidelines for all lab work and experiments.', faculty_id: 3 },
    { title: 'Quantum Physics Seminar', content: 'Guest lecture series on quantum mechanics.', faculty_id: 3 },
    { title: 'Biology Field Trip', content: 'Ecological research expedition to the rainforest.', faculty_id: 3 },
    
    // Technical Faculty (faculty_id: 4)
    { title: 'Engineering Workshop', content: 'Hands-on experience with mechanical and electrical systems.', faculty_id: 4 },
    { title: 'Industry Partnerships', content: 'Internship opportunities with leading tech companies.', faculty_id: 4 },
    { title: 'Innovation Challenge', content: 'Design competition for sustainable engineering solutions.', faculty_id: 4 }
  ];

  for (const post of posts) {
    insertPost.run(post.title, post.content, post.faculty_id);
  }

  console.log('Database seeded successfully!');
}

export { db };
