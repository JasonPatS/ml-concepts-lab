"""Health check: GET /api/health tells callers the API is up.

The header badge in the frontend (ApiStatus.tsx) calls it when the site loads.
"""

from typing import Annotated

from fastapi import APIRouter, Depends

from app.config import Settings, get_settings
from app.schemas.health import HealthResponse

# A router is a group of routes that main.py mounts under /api.
# tags lists them under "health" on the docs page, http://localhost:8000/docs.
router = APIRouter(tags=["health"])


@router.get("/health")
def health(settings: Annotated[Settings, Depends(get_settings)]) -> HealthResponse:
    # Annotated[Settings, Depends(get_settings)] has two parts:
    # - Settings is only the type hint, so your editor knows `settings` has fields
    #   like .environment. FastAPI doesn't use it to build or check the value.
    # - Depends(get_settings) is the instruction: FastAPI calls get_settings() on
    #   each request and passes the result in as `settings`, unless a test swapped
    #   it using app.dependency_overrides.
    # The -> HealthResponse return type is different: FastAPI does check the
    # returned data against it, and shows it as the example on the docs page.
    return HealthResponse(status="ok", environment=settings.environment)
