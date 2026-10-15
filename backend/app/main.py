"""Entry point of the API: create the FastAPI app and plug in the routers.

Start it from backend/ with `uv run fastapi dev app/main.py`, or with Docker Compose.
"""

from fastapi import FastAPI

from app.config import get_settings
from app.routers import health

# The first get_settings() call builds the app's one shared Settings (see config.py);
# every route then receives this same object.
settings = get_settings()

app = FastAPI(
    # The heading on the auto-generated docs page, http://localhost:8000/docs.
    title=settings.app_name,
    version="0.1.0",
)

# Every route in health.router gets the /api prefix: "/health" becomes "/api/health".
app.include_router(health.router, prefix="/api")
