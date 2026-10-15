"""Application settings, read from environment variables and backend/.env.

Priority, highest first: a real environment variable, then a line in .env, then
the default written below. Each field is decided on its own.
"""

from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Every setting the app has, with its type and default.

    Each field is filled from the environment variable with the same name, ignoring
    case: `app_name` comes from APP_NAME and `environment` from ENVIRONMENT.
    """

    # env_file is relative to the folder the app is started from (backend/).
    # extra="ignore" skips lines in .env that don't match a field.
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "JasonPatS's ML Concepts Lab API"
    # Only these three values are allowed; anything else fails at start-up.
    environment: Literal["development", "test", "production"] = "development"


@lru_cache
def get_settings() -> Settings:
    """Return the app's one shared Settings object.

    @lru_cache runs Settings() on the first call only and hands back the saved
    object after that, so .env is read once each time the server starts: restart
    the server after editing it. Routes ask for settings with
    Depends(get_settings), and tests swap them through app.dependency_overrides.
    """
    return Settings()
