"""Shared pytest fixtures. pytest loads this file itself; tests never import it."""

from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client() -> Iterator[TestClient]:
    """A fake browser that calls the real app directly inside Python, with no server.

    A test asks for it by having a parameter named `client`. Code before `yield`
    runs before the test; code after it runs afterwards, even if the test failed.
    """
    # `with` runs the app's start-up on entry and its shutdown on exit.
    with TestClient(app) as test_client:
        yield test_client  # the test runs while the fixture is paused here
    # Undo any app.dependency_overrides a test set, so the next test gets the real
    # dependencies. This empties the swap list; it never changes the real settings.
    app.dependency_overrides.clear()
