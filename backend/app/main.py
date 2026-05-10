from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()  # .env dosyasını os.environ'a yükle

from app.api.v1.endpoints import classes, analyze, reports, auth
from app.api.v1.endpoints import rag as rag_module

app = FastAPI(title="Mihenk.ai API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(classes.router, prefix="/api/v1/classes", tags=["Classes"])
app.include_router(analyze.router, prefix="/api/v1/analyze", tags=["AI Analysis"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["Reports"])
app.include_router(rag_module.router, prefix="/api/v1/rag", tags=["RAG"])


@app.get("/")
async def root():
    return {"message": "Mihenk.ai Backend Aktif!", "status": "Ready"}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "mihenk-ai-backend"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
