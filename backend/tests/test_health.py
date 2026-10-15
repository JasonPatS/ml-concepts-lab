"""Tests for GET /api/health, sent through the `client` fixture in conftest.py."""

from fastapi.testclient import TestClient

from app.config import Settings, get_settings
from app.main import app


def test_health_returns_ok(client: TestClient) -> None:
    response = client.get("/api/health")

    # No override here, so the route gets the app's real shared Settings, built
    # from your .env (or the defaults when there's none, as on GitHub).
    # Two layers are checked: the HTTP status code, then the "status" key in the
    # JSON body. "environment" is ignored, so it passes whatever .env says.
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_health_reports_the_configured_environment(client: TestClient) -> None:
    # Normally the route receives the app's one shared Settings from get_settings().
    # This swaps it for this test only: FastAPI calls the lambda instead, which
    # builds a brand-new Settings(environment="production"). The shared object is
    # never changed, and the client fixture removes the swap after the test.
    # "production" differs from the default, so a hard-coded "development" in the
    # route would make this test fail.
    # Why not monkeypatch.setenv("ENVIRONMENT", ...) here? The shared Settings was
    # already built and cached when the app loaded, so the route would never see
    # the changed variable. Swapping what the route receives avoids that.
    app.dependency_overrides[get_settings] = lambda: Settings(environment="production")

    response = client.get("/api/health")

    # Comparing the whole body also catches unexpected extra fields.
    assert response.json() == {"status": "ok", "environment": "production"}


def test_unknown_route_returns_404(client: TestClient) -> None:
    # A URL that matches no route should give a clean 404, not a crash.
    response = client.get("/api/does-not-exist")

    assert response.status_code == 404
