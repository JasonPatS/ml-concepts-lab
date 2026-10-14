import pytest
from pydantic import ValidationError

from app.config import Settings


def test_defaults_are_used_when_nothing_is_set(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("APP_NAME", raising=False)
    monkeypatch.delenv("ENVIRONMENT", raising=False)

    settings = Settings(_env_file=None)

    assert settings.app_name == "JasonPatS's ML Concepts Lab API"
    assert settings.environment == "development"


def test_env_var_overrides_default(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("ENVIRONMENT", "production")

    settings = Settings(_env_file=None)

    assert settings.environment == "production"


def test_unknown_environment_is_rejected(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("ENVIRONMENT", "staging")

    with pytest.raises(ValidationError):
        Settings(_env_file=None)
