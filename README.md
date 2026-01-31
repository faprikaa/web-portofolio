# Muammar Portfolio - Monorepo

Website portofolio dengan arsitektur terpisah antara frontend dan backend.

## Struktur Project

```
web-portofolio/
├── apps/
│   ├── api/                      # Backend - Hono + Cloudflare Workers
│   │   ├── src/
│   │   │   ├── index.ts          # Entry point Hono app
│   │   │   ├── lib/
│   │   │   │   └── rate-limit.ts # Rate limiting dengan KV
│   │   │   └── routes/
│   │   │       ├── chat.ts       # Chat API (Gemini AI)
│   │   │       └── stats.ts      # Stats API
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── wrangler.jsonc        # Workers config
│   │
│   └── web/                      # Frontend - Next.js 15 + OpenNext
│       ├── app/                  # Next.js App Router
│       ├── components/           # React components
│       ├── hooks/                # Custom hooks
│       ├── lib/                  # Utilities
│       ├── public/               # Static assets
│       ├── scripts/              # Build scripts
│       ├── styles/               # Global styles
│       ├── package.json
│       ├── tsconfig.json
│       └── wrangler.jsonc        # Pages config
│
├── .env.example                  # Environment template
├── .gitignore
├── package.json                  # Root workspace config
├── pnpm-workspace.yaml           # PNPM workspace
└── README.md
```

## Tech Stack

### Backend (`apps/api`)
- **Framework**: [Hono](https://hono.dev/) - Ultrafast web framework for edge
- **Runtime**: Cloudflare Workers
- **Rate Limiting**: Cloudflare KV (15 messages/day per user)
- **AI**: Google Gemini 2.5 Flash API

### Frontend (`apps/web`)
- **Framework**: Next.js 15 (App Router) + React 19
- **Deployment**: [OpenNext](https://opennext.js.org/) untuk Cloudflare Pages
- **UI**: Tailwind CSS + shadcn/ui (Radix UI)
- **Animasi**: Framer Motion + GSAP

## Setup Development

### 1. Clone & Install Dependencies

```bash
git clone <repo-url>
cd web-portofolio
pnpm install
```

### 2. Setup Environment Variables

**Backend** - Buat file `apps/api/.dev.vars`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
ADMIN_SECRET_KEY=your_admin_secret_key_here
```

**Frontend** - Buat file `apps/web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8787
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Setup Cloudflare KV (Rate Limiting)

```bash
cd apps/api

# Buat KV namespace untuk production
wrangler kv namespace create RATE_LIMIT_KV
# Output: id = "xxxxx-xxxxx-xxxxx"

# Buat KV namespace untuk preview/dev
wrangler kv namespace create RATE_LIMIT_KV --preview
# Output: preview_id = "yyyyy-yyyyy-yyyyy"

# Update apps/api/wrangler.jsonc dengan ID yang didapat:
# "id": "xxxxx-xxxxx-xxxxx",
# "preview_id": "yyyyy-yyyyy-yyyyy"
```

### 4. Run Development Server

```bash
# Terminal 1 - Run backend (port 8787)
pnpm dev:api

# Terminal 2 - Run frontend (port 3000)
pnpm dev

# Atau jalankan keduanya sekaligus
pnpm dev:all
```

## Deployment

### Step 1: Deploy Backend ke Cloudflare Workers

```bash
cd apps/api

# Set secrets (akan diminta input)
wrangler secret put GEMINI_API_KEY
wrangler secret put ADMIN_SECRET_KEY

# Deploy
cd ../..
pnpm deploy:api
```

Backend akan live di: `https://muammar-api.apel.workers.dev`

### Step 2: Deploy Frontend ke Cloudflare Pages

```bash
# Update NEXT_PUBLIC_API_URL di apps/web/.env.local atau wrangler.jsonc
# dengan URL backend yang sudah di-deploy

pnpm deploy
```

Frontend akan live di: `https://muammar.pages.dev`

### Deploy Keduanya Sekaligus

```bash
pnpm deploy:all
```

## CI/CD dengan GitHub Actions

Project ini menggunakan GitHub Actions untuk automated deployment.

### Workflows

| Workflow | File | Trigger | Description |
|----------|------|---------|-------------|
| **Deploy All** | `deploy.yml` | Push to `main` | Deploy API lalu Web |
| **Deploy API** | `deploy-api.yml` | Changes di `apps/api/` | Deploy backend only |
| **Deploy Web** | `deploy-web.yml` | Changes di `apps/web/` | Deploy frontend only |
| **CI** | `ci.yml` | PR & Push | Lint, type check, build test |

### Setup GitHub Secrets

Tambahkan secrets berikut di repository settings (`Settings > Secrets and variables > Actions`):

**Secrets (Required):**
| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token dengan permissions: Workers Scripts:Edit, Pages:Edit, Account:Read |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID (dari dashboard) |
| `GEMINI_API_KEY` | Google Gemini API key |
| `ADMIN_SECRET_KEY` | Secret key untuk admin endpoints |

**Variables (Repository Variables):**
| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://muammar-api.apel.workers.dev` |
| `NEXT_PUBLIC_SITE_URL` | `https://muammar.pages.dev` |

### Cara Mendapatkan Cloudflare API Token

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Klik profile icon > **My Profile**
3. Pilih **API Tokens** > **Create Token**
4. Gunakan template **Edit Cloudflare Workers** atau buat custom dengan permissions:
   - Account > Workers Scripts > Edit
   - Account > Cloudflare Pages > Edit  
   - Account > Account Settings > Read
5. Copy token dan simpan sebagai `CLOUDFLARE_API_TOKEN`

### Cara Mendapatkan Account ID

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Pilih account/domain
3. Scroll ke bawah, Account ID ada di sidebar kanan
4. Copy dan simpan sebagai `CLOUDFLARE_ACCOUNT_ID`

## API Endpoints

Base URL: `https://muammar-api.apel.workers.dev`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/chat` | Get remaining message count |
| POST | `/api/chat` | Send chat message to AI |
| GET | `/api/stats` | Get API statistics |

### POST `/api/chat` Request Body

```json
{
  "messages": [
    {
      "id": "1",
      "content": "Apa keahlian Muammar?",
      "sender": "user",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Run frontend dev server (port 3000) |
| `pnpm dev:api` | Run backend dev server (port 8787) |
| `pnpm dev:all` | Run both frontend & backend |
| `pnpm build` | Build frontend untuk production |
| `pnpm build:worker` | Build frontend untuk Cloudflare Pages |
| `pnpm deploy` | Deploy frontend ke Cloudflare Pages |
| `pnpm deploy:api` | Deploy backend ke Cloudflare Workers |
| `pnpm deploy:all` | Deploy both frontend & backend |
| `pnpm lint` | Run ESLint |
| `pnpm clean` | Clean all build artifacts & node_modules |

## Features

- AI-powered chatbot (Google Gemini 2.5 Flash)
- Rate limiting dengan Cloudflare KV (15 messages/day per user)
- Browser fingerprinting untuk anti-abuse
- Chat history tersimpan di cookies (7 hari)
- Quick question suggestions
- Responsive UI (mobile-first)
- Dark/Light mode toggle
- Smooth animations (Framer Motion + GSAP)

## Environment Variables

### Backend (`apps/api`)

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `ADMIN_SECRET_KEY` | Secret key for admin endpoints | Yes |
| `ALLOWED_ORIGINS` | Comma-separated allowed origins | No (default in wrangler.jsonc) |

### Frontend (`apps/web`)

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_SITE_URL` | Frontend site URL | No |

## Troubleshooting

### CORS Error
Pastikan `ALLOWED_ORIGINS` di `apps/api/wrangler.jsonc` sudah include domain frontend.

### Rate Limit Not Working
Pastikan KV namespace sudah dibuat dan ID sudah diupdate di `wrangler.jsonc`.

### Build Error OpenNext
```bash
cd apps/web
rm -rf .next .open-next node_modules
pnpm install
pnpm build:worker
```

## License

This project is private and not licensed for public use.
