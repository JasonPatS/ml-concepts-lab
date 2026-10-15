"""Tests for the Settings class itself: no request, so no `client` fixture.

Unlike the override in test_health.py, there's no route here and nothing to swap:
each test builds its own Settings(_env_file=None) directly. It's built fresh because
get_settings() is cached, and _env_file=None skips backend/.env so the result
never depends on your local file. Environment variables are still read, and
monkeypatch changes them for one test only, undoing every change afterwards.

Why not app.dependency_overrides here? An override only changes what a route
receives, and these tests call no route. It would also skip the very thing being
tested: whether Settings reads environment variables and defaults correctly.
"""

import pytest
from pydantic import ValidationError

from app.config import Settings


def test_defaults_are_used_when_nothing_is_set(monkeypatch: pytest.MonkeyPatch) -> None:
    # Remove these environment variables in case your terminal has them set.
    # raising=False: don't complain if they weren't set to begin with.
    monkeypatch.delenv("APP_NAME", raising=False)
    monkeypatch.delenv("ENVIRONMENT", raising=False)

    settings = Settings(_env_file=None)

    # Must match the defaults in app/config.py.
    assert settings.app_name == "JasonPatS's ML Concepts Lab API"
    assert settings.environment == "development"


def test_env_var_overrides_default(monkeypatch: pytest.MonkeyPatch) -> None:
    # Like typing ENVIRONMENT=production in front of a command, for this test only.
    monkeypatch.setenv("ENVIRONMENT", "production")

    settings = Settings(_env_file=None)

    assert settings.environment == "production"


def test_unknown_environment_is_rejected(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("ENVIRONMENT", "staging")

    # pytest.raises is a `with` block that expects an error:
    # - ValidationError raised: the block stops at that line, the error is caught,
    #   and the test carries on after the block.
    # - Nothing raised: on leaving the block, pytest fails the test with
    #   "DID NOT RAISE ValidationError".
    # - A different error (e.g. KeyError): not caught, so the test fails with it.
    with pytest.raises(ValidationError):
        Settings(_env_file=None)
