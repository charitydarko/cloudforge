# CloudForge

Open-source platform for deploying Next.js + Postgres apps to AWS with one command.

Built in public across 6 episodes of the "Building CloudForge" series. Every episode contributes to this repo. Every trade-off documented.

## Series

- **Episode 1** — AWS Security Foundation ✅
- **Bonus Episode 2A** — Building the Dashboard Frontend with AI ✅
- **Episode 2** — Deploy Frontend to AWS ← current
- **Episode 3** — Deploy API Backend
- **Episode 4** — Production Database with RDS
- **Episode 5** — Observability
- **Episode 6** — Infrastructure as Code (Terraform Capstone)

## Repository structure

```
cloudforge/
├── frontend/   Next.js 16 (App Router) marketing site + dashboard — static export
├── backend/    Express (TypeScript) API, containerized with Docker
└── docs/       Product, design-system, and architecture docs
```

## Getting started

### Frontend

Next.js app configured for **static export** (`output: "export"`), so `npm run build`
emits a self-contained `out/` directory deployable to an S3 bucket root (or any static host).

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000 — local development
npm run build    # generates ./out (static export)
```

Deploy the export to S3 (uploads the *contents* of `out/` to the bucket root):

```bash
aws s3 sync out/ s3://YOUR_BUCKET --delete
```

### Backend

Express API on port `3000` with a `/health` endpoint, run via Docker.

```bash
cd backend
docker compose up -d
curl localhost:3000/health   # {"status":"ok","uptime":...}
```

The container ships with a `HEALTHCHECK` and `restart: unless-stopped`. Without Docker:
`npm install && npm run build && npm start`.

## Documentation

- [docs/PRODUCT.md](docs/PRODUCT.md) — Product definition
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — Design system
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Architecture decisions
- [docs/TASKS.md](docs/TASKS.md) — Task list
- [CLAUDE.md](CLAUDE.md) — Claude Code onboarding

## License

MIT — see [LICENSE](LICENSE) for details.

## Author

Charity Darko — [charitydarko.com](https://charitydarko.com)
