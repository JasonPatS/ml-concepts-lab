# Image for the FastAPI backend. Docker Compose replaces the CMD at the bottom with
# `fastapi dev` for local work; `fastapi run` is the production start command.
FROM python:3.14-slim

# Copy the uv binaries in from uv's official image instead of installing them.
COPY --from=ghcr.io/astral-sh/uv:0.12 /uv /uvx /bin/

WORKDIR /app

# Settings for uv: pre-compile Python files so the server starts faster, copy
# installed files instead of linking them, and use the project's .venv for every
# command.
ENV UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    PATH="/app/.venv/bin:$PATH"

# Install dependencies before copying the code: Docker saves the result of this
# step and reuses it until pyproject.toml or uv.lock change, so rebuilds are fast.
# --no-dev skips pytest and Ruff, which the running app doesn't need.
COPY pyproject.toml uv.lock ./
RUN uv sync --locked --no-dev --no-install-project

# Then the code (minus what .dockerignore excludes), and the project itself.
COPY . .
RUN uv sync --locked --no-dev

EXPOSE 8000

CMD ["fastapi", "run", "app/main.py", "--port", "8000"]
