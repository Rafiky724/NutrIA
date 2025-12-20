from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    #SECRET_KEY: str
    #ALGORITHM: str
    #ACCESS_TOKEN_EXPIRE_MINUTES: int
    #DATABASE_URL: str
    #API_V1_STR: str
    # CLOUD_NAME: str
    # API_KEY: str
    # API_SECRET: str

    MONGO_URI: str
    DB_NAME: str = "nutria_db" 

    SECRET_KEY: str
    #ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 900
    GOOGLE_API_KEY: str
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
