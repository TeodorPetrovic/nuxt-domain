import Database from 'better-sqlite3';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Use environment variable or default to data directory at project root
const dataDir = process.env.DB_PATH || join(process.cwd(), 'data');
const dbPath = join(dataDir, 'data.db');

// Ensure data directory exists
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
  console.log(`Created database directory: ${dataDir}`);
}

const db = new Database(dbPath);
console.log(`Database initialized at: ${dbPath}`);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS faculty (
    faculty_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    subdomain TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS post (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    faculty_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
  );
`);

// Check if data already exists
const facultyCount = db.prepare('SELECT COUNT(*) as count FROM faculty').get() as { count: number } | undefined;

if (!facultyCount || facultyCount.count === 0) {
  // Seed faculties
  const insertFaculty = db.prepare('INSERT INTO faculty (name, subdomain) VALUES (?, ?)');
  
  const faculties = [
    { name: 'Tehnicki fakultet', subdomain: 'tf' },
    { name: 'Poslovni fakultet', subdomain: 'pfb' },
    { name: 'Racunarske nauke', subdomain: 'fir' }
  ];

  for (const faculty of faculties) {
    insertFaculty.run(faculty.name, faculty.subdomain);
  }

  const insertPost = db.prepare('INSERT INTO post (title, content, faculty_id) VALUES (?, ?, ?)');
  
  const posts = [
    {
      title: 'Poziv za prijavu studenata za Erasmus+ BIP',
      content: 'Otvoren je poziv za ucesce u kombinovanom intenzivnom programu i potrebna je pravovremena prijava.',
      faculty_id: 1
    },
    {
      title: 'Online kurs za srednjoskolce - Java programiranje',
      content: 'Besplatan online kurs namenjen srednjoskolcima uz prijavu preko sajta.',
      faculty_id: 2
    },
    {
      title: 'Radno vreme tokom praznika',
      content: 'Univerzitet ima izmenjeno radno vreme, uz dezurne studentske sluzbe.',
      faculty_id: 2
    },

    // Tehnicki fakultet (faculty_id: 1)
    {
      title: 'Februarski ispitni rok',
      content: 'Ispitni rok i prijave su rasporedjeni po unapred objavljenom kalendaru.',
      faculty_id: 1
    },
    {
      title: 'Online kurs za srednjoskolce - Java programiranje',
      content: 'Nastavlja se serija online kurseva uz otvorene prijave za novu grupu.',
      faculty_id: 1
    },
    {
      title: 'Nastup profesora na konferenciji "AI Journey"',
      content: 'Predstavljen je rad na medjunarodnoj konferenciji posvecenoj vestackoj inteligenciji.',
      faculty_id: 1
    },

    // Poslovni fakultet (faculty_id: 2)
    {
      title: 'Februarski ispitni rok',
      content: 'Objavljen je termin prijave ispita i period odrzavanja ispita.',
      faculty_id: 2
    },
    {
      title: 'Januarski ispitni rok',
      content: 'Rok je planiran sredinom januara uz online prijave u predvidjenom terminu.',
      faculty_id: 2
    },
    {
      title: 'Nova zgrada Univerziteta Singidunum',
      content: 'Univerzitet je dobio novu lokaciju u centru grada za dodatne aktivnosti.',
      faculty_id: 2
    },

    // Racunarske nauke (faculty_id: 3)
    {
      title: 'Februarski ispitni rok',
      content: 'Studente ocekuje rok sa jasnim pravilima prijave i rokovima.',
      faculty_id: 3
    },
    {
      title: 'Online kurs za srednjoskolce - Java programiranje',
      content: 'Prijave su otvorene za besplatni kurs koji uvodi osnove Java jezika.',
      faculty_id: 3
    },
    {
      title: 'Radno vreme tokom praznika',
      content: 'Objavljeno je izmenjeno radno vreme sa dezurstvima studentskih sluzbi.',
      faculty_id: 3
    }
  ];

  for (const post of posts) {
    insertPost.run(post.title, post.content, post.faculty_id);
  }
}

export { db };
