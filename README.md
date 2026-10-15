# JasonPatS's ML Concepts Lab

[![CI](https://github.com/JasonPatS/ml-concepts-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/JasonPatS/ml-concepts-lab/actions/workflows/ci.yml)

**Live site:** https://jasonpats-ml-concepts-lab.onrender.com

The site runs on Render's free plan, so the first visit after a quiet spell can take
about a minute while the backend wakes up.

An interactive website that teaches machine learning concepts, one page per concept,
each with an explanation and a live demo.

**Stack:** React + TypeScript + Tailwind (Vite) · FastAPI + scikit-learn · PostgreSQL · Docker

## Run locally

```bash
docker compose up --build
```

Then open http://localhost:5173.

The backend reads its settings from environment variables, or from `backend/.env` if
that file exists. To change them, copy the example file and edit the copy:

```bash
cp backend/.env.example backend/.env
```

## Run the checks

These are the same checks GitHub Actions runs on every pull request.

```bash
# Backend: lint, formatting and tests
cd backend
uv run ruff check
uv run ruff format --check
uv run pytest

# Frontend: formatting, lint, type-check and build
cd ../frontend
npm run format:check
npm run lint
npm run build
```

## Deployment

Both parts are hosted on [Render](https://render.com) and redeploy automatically when
`main` changes.

- **Frontend:** a Render static site built with `cd frontend && npm ci && npm run build`.
  Two rewrite rules send `/api/*` to the backend and every other path to `index.html`,
  so React Router handles page URLs.
- **Backend:** a Render web service built from `backend/Dockerfile` in the Singapore
  region, with `ENVIRONMENT=production` set in Render and `/api/health` as its health
  check.
