# Pokédex Lite

A full-featured Pokédex web app built with **Next.js**, **JavaScript**, and **CSS Modules**.

## Live Demo
Deploy to Vercel in one click after setup.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 | Framework (Pages Router, SSR-ready) |
| NextAuth.js | Google OAuth authentication |
| PokéAPI | Free public Pokémon data API |
| CSS Modules | Scoped, component-level styles |
| localStorage | Favorites persistence (no DB needed) |

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/pokedex-lite.git
cd pokedex-lite
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Setting Up Google OAuth (5 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Go to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Add Authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Copy **Client ID** and **Client Secret** into your `.env.local`

For production, also add:
```
https://your-domain.com/api/auth/callback/google
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

---

## Features

- Browse 1,000+ Pokémon with pagination (24 per page)
- Search by name or Pokédex number (real-time)
- Filter by type (Fire, Water, Grass, etc.)
- Favourite Pokémon — persisted in localStorage
- Detail modal: stats, abilities, height, weight, base XP
- Google OAuth sign-in with NextAuth
- Fully responsive: mobile, tablet, desktop
- Animations: card hover lift, modal spring entry, sprite float

---

## Folder Structure

```
pokedex-lite/
├── pages/
│   ├── _app.js             # SessionProvider wrapper
│   ├── index.js            # Main page
│   └── api/auth/
│       └── [...nextauth].js  # OAuth handler
├── components/
│   ├── Layout.js
│   ├── Navbar.js           # Auth UI (sign in/out)
│   ├── PokemonCard.js
│   ├── PokemonGrid.js
│   ├── PokemonModal.js     # Detail view
│   ├── SearchBar.js
│   ├── TypeFilter.js
│   ├── Pagination.js
│   └── LoadingSpinner.js
├── hooks/
│   ├── usePokemon.js       # Data fetching + filtering logic
│   └── useFavorites.js     # localStorage favorites
├── lib/
│   └── pokeapi.js          # All API calls
├── styles/
│   ├── globals.css
│   └── *.module.css        # Per-component styles
├── .env.local.example
└── next.config.js
```

---

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.
