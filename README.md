# nuxt-domain

A multi-subdomain Nuxt.js v4 application with TailwindCSS and SQLite database integration. Each subdomain displays different content with unique color themes.

## Features

- **Multi-Subdomain Support**: Four subdomains with different color schemes
  - Main site (no subdomain) - Red theme
  - `fir` - Faculty of Information Research - Orange theme
  - `pfb` - Physics and Biology - Blue theme
  - `tf` - Technical Faculty - Green theme

- **SQLite Database**: Local database with faculty and post data
- **Dynamic Theming**: Each subdomain has its own accent color using CSS custom properties
- **Content Filtering**: Posts are filtered based on the current subdomain
- **Responsive Design**: Built with TailwindCSS for mobile-friendly layouts

## Tech Stack

- **Nuxt.js v4**: Modern Vue.js framework
- **Vue 3**: Progressive JavaScript framework
- **TailwindCSS**: Utility-first CSS framework
- **SQLite**: Lightweight database via better-sqlite3
- **TypeScript**: Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TeodorPetrovic/nuxt-domain.git
cd nuxt-domain
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Testing Subdomains Locally

To test different subdomains on your local machine, you need to edit your hosts file:

**On macOS/Linux:**
```bash
sudo nano /etc/hosts
```

**On Windows:**
```
C:\Windows\System32\drivers\etc\hosts
```

Add these lines:
```
127.0.0.1 fir.localhost
127.0.0.1 pfb.localhost
127.0.0.1 tf.localhost
```

Then access the subdomains at:
- Main site: `http://localhost:3000`
- FIR: `http://fir.localhost:3000`
- PFB: `http://pfb.localhost:3000`
- TF: `http://tf.localhost:3000`

## Project Structure

```
nuxt-domain/
├── app/
│   ├── app.vue              # Root application component
│   ├── composables/         # Vue composables
│   │   └── useSubdomain.ts  # Subdomain detection logic
│   └── pages/               # Application pages
│       └── index.vue        # Main page
├── assets/
│   └── css/
│       └── main.css         # Global styles with dynamic theming
├── server/
│   ├── api/
│   │   └── posts.get.ts     # API endpoint for fetching posts
│   └── database/
│       └── db.ts            # SQLite database setup and seeding
├── public/                  # Static assets
├── nuxt.config.ts           # Nuxt configuration
├── tailwind.config.js       # TailwindCSS configuration
└── package.json             # Project dependencies
```

## Database Schema

The SQLite database includes two tables:

### Faculties
- `id`: Primary key
- `name`: Faculty name
- `subdomain`: Associated subdomain
- `created_at`: Timestamp

### Posts
- `id`: Primary key
- `title`: Post title
- `content`: Post content
- `faculty_id`: Foreign key to faculties
- `created_at`: Timestamp

## Subdomain Color Scheme

Each subdomain uses CSS custom properties for dynamic theming:

- **No subdomain** (Main site): `--accent-color: 239 68 68` (Red)
- **fir**: `--accent-color: 249 115 22` (Orange)
- **pfb**: `--accent-color: 59 130 246` (Blue)
- **tf**: `--accent-color: 34 197 94` (Green)

## API Endpoints

### GET `/api/posts`
Fetches posts for the current subdomain based on the host header.

**Response:**
```json
{
  "posts": [...],
  "faculty": {...}
}
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

---

Check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about Nuxt.js.

