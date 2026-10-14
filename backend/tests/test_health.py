from fastapi.testclient import TestClient

from app.config import Settings, get_settings
from app.main import app


def test_health_returns_ok(client: TestClient) -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_health_reports_the_configured_environment(client: TestClient) -> None:
    app.dependency_overrides[get_settings] = lambda: Settings(environment="production")

    response = client.get("/api/health")

    assert response.json() == {"status": "ok", "environment": "production"}


def test_unknown_route_returns_404(client: TestClient) -> None:
    response = client.get("/api/does-not-exist")

    assert response.status_code == 404
