from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router
#from fastapi.middleware.cors import CORSMiddleware

#from app.routes import router as api_router

app = FastAPI()

"""
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
"""
app.include_router(auth_router)

@app.get("/")
async def read_root():
    return {"message": "NutrIA API"}