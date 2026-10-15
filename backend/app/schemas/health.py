"""Pydantic models describing what the health endpoint sends back."""

from typing import Literal

from pydantic import BaseModel


class HealthResponse(BaseModel):
    """The JSON body of GET /api/health.

    Example: {"status": "ok", "environment": "development"}

    More than a type hint: FastAPI checks the route's return value against this
    class (a wrong value becomes a 500 error), turns it into JSON text for the
    response, and shows it on the docs page.

    If the value is wrong, nothing from it is sent: the browser gets a 500 with the
    plain text "Internal Server Error", and the details appear in the server's
    terminal instead.
    """

    # Literal["ok"]: returning any other value is a bug, so Pydantic raises an error.
    status: Literal["ok"]
    # A plain str: the list of valid environments lives in Settings, in one place.
    environment: str
