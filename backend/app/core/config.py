from pydantic_settings import BaseSettings
from pydantic import ConfigDict
from supabase import create_client, Client


class Settings(BaseSettings):
    model_config = ConfigDict(extra="ignore", env_file=".env")

    SUPABASE_URL: str
    SUPABASE_KEY: str
    GEMINI_API_KEY: str
    GROQ_API_KEY: str
    TEST_MODE: str = "0"


settings = Settings()

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
