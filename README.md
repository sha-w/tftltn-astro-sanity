# TFTLTN - The First The Last The Nerdom

A modern Astro-powered website with Sanity CMS integration for The First The Last The Nerdom podcast and blog.

## 🚀 Live Sites

- **Website**: [Deploy to Cloudflare Pages]
- **Content Management**: https://firstlastnerdom.sanity.studio/
- **GitHub Repository**: https://github.com/sha-w/tftltn-astro-sanity

## 🏗️ Tech Stack

- **Frontend**: Astro + TypeScript
- **CMS**: Sanity
- **Hosting**: Cloudflare Pages
- **Styling**: Custom CSS (Original TFTLTN Design)

## 📁 Project Structure

```
/
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── lib/
│   │   └── sanity.ts   # Sanity client & queries
│   ├── pages/          # Astro pages (index.astro, blog/)
│   └── styles/         # CSS files (original.css, blog.css)
├── my-sanity-project/  # Sanity CMS configuration
└── package.json
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Start dev server: `npm run dev`

### Sanity Studio
The Sanity Studio is deployed at https://firstlastnerdom.sanity.studio/ for content management.

## 🌐 Environment Variables

For Cloudflare Pages deployment, set these environment variables:

```
SANITY_PROJECT_ID=df24xwzm
SANITY_DATASET=tftltn-dev-blog
SANITY_API_VERSION=2024-01-01
SANITY_USE_CDN=true
```

## 📋 Build Settings for Cloudflare Pages

- **Framework preset**: Astro
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`
- **Node version**: 18

## 🎨 Features

- Pixel-perfect recreation of original TFTLTN design
- Responsive layout for all devices
- Blog integration with Sanity CMS
- YouTube video integration
- Newsletter signup (coming soon)
- Fast static site generation
- Smart fallback system (Sanity content when available, mock data otherwise)

## 📝 Content Management

1. Visit https://firstlastnerdom.sanity.studio/
2. Sign in with your Sanity account
3. Create and manage:
   - Blog posts
   - Authors (Tom & Mike)
   - Categories (Reviews, Analysis, etc.)
   - Rich text content blocks

The website automatically updates when content is published in Sanity.

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`     |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
