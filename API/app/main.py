from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router
from app.routes.dieta_routes import router as dieta_router
from app.routes.plan_routes import router as plan_router
from app.routes.dias_routes import router as dias_router
from app.routes.objetivo_routes import router as objetivo_router
from app.routes.user_routes import router as user_router
from app.routes.home_routes import router as home_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://nutria-project.netlify.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(dieta_router)
app.include_router(plan_router)
app.include_router(dias_router)
app.include_router(objetivo_router)
app.include_router(user_router)
app.include_router(home_router)

@app.get("/")
async def read_root():
    return {"message": "NutrIA API"}