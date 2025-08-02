from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    DATABASE_URL: str
    API_V1_STR: str
    # CLOUD_NAME: str
    # API_KEY: str
    # API_SECRET: str
     
    class Config:
        env_file = ".env"

settings = Settings()
