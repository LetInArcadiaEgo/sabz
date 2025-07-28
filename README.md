# Sabz – Pakistan’s Simple, Modern Real-Estate Marketplace 🏡

[![React](https://img.shields.io/static/v1?label=Frontend&message=React%2018&color=61DAFB&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/static/v1?label=Backend&message=Node%20%2F%20Express&color=339933&logo=node.js)](https://nodejs.org)
[![Supabase](https://img.shields.io/static/v1?label=Database&message=Supabase&color=3ECF8E&logo=supabase)](https://supabase.com)
[![License](https://img.shields.io/badge/license-Non--Commercial-green)](#-license)

Sabz helps homeowners list their properties **in minutes** and lets buyers discover beautiful homes around Pakistan.  
This repo contains the **React front-end**; the Express / Supabase backend lives in a [separate repository](https://github.com/your-org/sabz-backend) and is consumed purely through REST endpoints.

---

## 📑 Table of Contents
1. [Live Demo](#-live-demo)
2. [Feature Tour](#-feature-tour)
3. [System Architecture](#-system-architecture)
4. [Source-Code Layout](#-source-code-layout)
5. [Data-Flow & State Management](#-data-flow--state-management)
6. [API Contract](#-api-contract)
7. [Local Development](#-local-development)
8. [NPM Scripts](#-npm-scripts)
9. [Testing](#-testing)
10. [Deployment](#-deployment)
11. [Contributing](#-contributing)
12. [License](#-license)

---

## 🚀 Live Demo

> **Coming soon** — we’re moving to Vercel! Until then the project runs great locally.

---

## ✨ Feature Tour

### Buyer Experience
- Home page grid of **approved listings** with responsive carousel cards.
- **Detail page** with full-width gallery, features grid, price breakdown, and a copy-link **Share dialog**.

### Seller Experience
- **“List Your Property” wizard** – 2 intuitive steps (Basics → Media & Publish) with inline validation.
- **Drag-and-drop photo manager** powered by Embla + dnd-kit.
- **My Listings dashboard** – edit, share or unpublish your own posts in one place.
- **Inline edit cards** (title, price, amenities, photos…) that update without leaving the page.

### Roadmap
- 🔍 Advanced search & filters (city, price range, bedrooms…)
- 🗺️ Map view powered by Leaflet
- 💬 Supabase Auth + real-time chat between buyers & sellers
- 📱 PWA offline support

---

## 🏗 System Architecture

Below is a bird’s-eye view of how the React app talks to the Express API & Supabase.

```mermaid
graph TD;
  subgraph Frontend (This Repo)
    A[React 18 SPA]
    B[Custom Hooks]
    C[Context Providers]
    D[Components & Pages]
    A --> B --> C --> D
  end
  subgraph Backend (Separate Repo)
    E[Express API]
    F[(Supabase Postgres)]
    G[(Supabase Storage)]
    E --> F
    E --> G
  end
  A -- REST HTTPS --> E
```

---

## 📂 Source-Code Layout

```
realestateproject/
├── public/                  # Static assets served verbatim
│   ├── images/              # Logos + seed/fallback listing images
│   └── index.html           # Single entry HTML with <div id="root" />
│
├── src/                     # All transpiled source lives here
│   ├── index.js             # ReactDOM.createRoot → <App/>
│   ├── App.js               # Global <Router>, layout shells, error boundary
│   ├── api.js               # Thin fetch wrappers around /api endpoints
│   │
│   ├── context/             # React Contexts shared app-wide
│   │   └── ListingDraftProvider.js   # Manages in-progress wizard data
│   │
│   ├── hooks/               # Reusable logic: data-fetching, UI, scroll etc.
│   │   ├── useApprovedListings.js    # Home page data
│   │   ├── useListing.js             # Single listing data
│   │   └── useScrollVisibility.js    # Show/hide bottom nav on scroll
│   │
│   ├── components/          # Presentational & loosely-coupled widgets
│   │   ├── common/          # Generic building blocks
│   │   │   ├── Button/              # ExitButton, NavButtons, ShareButton
│   │   │   ├── Counter/             # Increment/decrement <input>
│   │   │   ├── EditModal/           # Slide-up modal used in wizard
│   │   │   └── PhotoManager/        # Drag-n-drop upload & ordering
│   │   ├── layout/          # App-wide layout chrome
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   └── BottomNav/           # Mobile tab-bar
│   │   └── ListingCard/     # Home-page card + image carousel
│   │
│   ├── features/            # End-to-end user flows (self-contained)
│   │   ├── listing-create/  # 2-step wizard (>10 screens)
│   │   │   ├── intro/
│   │   │   ├── step1/       # Basics (type, address, amenities…)
│   │   │   └── step2/       # Photos, desc, price, publish
│   │   ├── listing-edit/    # "Edit Listing" page with 7 editable cards
│   │   └── my-listings/     # Dashboard of user’s own listings
│   │
│   ├── pages/               # Top-level routes loaded by <Router>
│   │   ├── home/            # <HomePage/> → grid of <ListingCard/>
│   │   └── listing/         # Property detail page
│   │       └── components/  # Header, Gallery, InfoGrid, etc.
│   │
│   ├── styles/              # Global or cross-cutting styles
│   │   └── global.css       # Font-face import + resets + CSS vars
│   │
│   ├── utils/               # Pure JS helpers (formatPrice, slugify…)
│   └── setupTests.js        # Jest & RTL configuration
│
├── .env.example             # Template for local env variables
├── package.json             # CRA scripts + eslint / prettier config
└── README.md                # You are here 🙌
```

### Why This Structure?
- **Vertical slices**: `features/` keeps domain logic close to UI, making it easy to delete or iterate on a flow.
- **Re-usability first**: Generic UI lives under `components/common/`; nothing in there assumes domain.
- **Isolation**: Each module has its own CSS Module (`Component.module.css`), guaranteeing no leaks.

---

## 🔄 Data Flow & State Management
1. **API Layer (`src/api.js`)** — single responsibility: _network I/O_. Converts camelCase JS objects to snake_case for Postgres & vice versa.
2. **React Context** — `ListingDraftProvider` supplies wizard data to >10 screens without prop-drilling.
3. **Custom Hooks** — collocate data fetching logic with UI (`useListing`, `useApprovedListings`).
4. **Local State** — lightweight form inputs handled with `useState` inside each component.

> We deliberately avoid Redux / Zustand for now – React Context + hooks are sufficient for the current scale.

---

## 🛣 API Contract

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/listings` | Fetch **approved** listings for home page |
| GET | `/api/listings/:id` | Fetch single listing detail |
| POST | `/api/listings` | Create new listing (multipart ‑ JSON + images) |
| PUT | `/api/listings/:id` | Update existing listing fields |
| PUT | `/api/listings/:id/photos` | Add additional photos to listing |

### Example: Create Listing
```http
POST /api/listings
Content-Type: multipart/form-data

• listing (JSON) – { title, price, property_type, ... }
• images[]        – 1..n File objects
```
Successful response:
```json
{
  "success": true,
  "id": "32ec9af2-a0a2-4b3e-b2e3-d3c1af1d8c61"
}
```

---

## 💻 Local Development

```bash
# 1. Clone repo & install deps
$ git clone https://github.com/your-org/realestateproject.git
$ cd realestateproject && npm install

# 2. Environment variables
$ cp .env.example .env.local && nano .env.local
  # REACT_APP_API_BASE=https://<your-replit-url>

# 3. Run the dev server
$ npm start
```
The app will open at **http://localhost:3000**.  
The backend can run locally (`npm run dev` in backend repo) or on Replit — just make sure `REACT_APP_API_BASE` points to it.

---

## 📜 NPM Scripts
| Script | What it does |
|--------|--------------|
| `npm start` | CRA dev server + fast refresh |
| `npm run build` | Production build to `build/` |
| `npm test` | Jest + React Testing Library |
| `npm run lint` | ESLint & Prettier checks |
| `npm run format` | Auto-fix style issues |

---

## 🧪 Testing
- **Unit** tests live next to source files: `Component.test.jsx`.
- **RTL** for DOM behavior & accessibility.
- Mocks: [msw](https://mswjs.io/) intercepts API calls.
- _Coming soon_: Cypress E2E.

Run all tests:
```bash
npm test
```

---

## 🚢 Deployment
1. **Frontend**: `npm run build` then upload `build/` to Vercel / Netlify / Firebase Hosting.
2. **Backend**: Replit (always-on ping) or any Node host.
3. **Environment**: set `REACT_APP_API_BASE` on the host dashboard.

---

## 🤝 Contributing
We love contributions! 🫶  
Please follow these steps:
1. **Fork** & create feature branch: `git checkout -b feat/amazing`.
2. **Commit** with [Conventional Commits](https://www.conventionalcommits.org/) (`feat: add share dialog`).
3. Ensure `npm run lint` & `npm test` pass locally.
4. Open a PR. A maintainer will review & merge.

### Code Style
- 2-space indentation, semicolons on, single quotes.
- Run `npm run format` before pushing.

---

## 📝 License

© 2024 Sabz. All rights reserved.  
This project is licensed for **non-commercial, educational** use. Contact us for commercial licensing.

---

> _Built with ❤️ by the Sabz team — bringing transparency to Pakistan’s property market._
