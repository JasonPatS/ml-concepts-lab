# JasonPatS's ML Concepts Lab

[![CI](https://github.com/JasonPatS/ml-concepts-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/JasonPatS/ml-concepts-lab/actions/workflows/ci.yml)

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
