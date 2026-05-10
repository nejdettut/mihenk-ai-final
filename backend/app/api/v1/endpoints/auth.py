from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.config import supabase
import os

router = APIRouter()


class RegisterRequest(BaseModel):
    email: str
    password: str
    full_name: str
    school_name: str = ""


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/register")
async def register(data: RegisterRequest):
    try:
        if os.getenv("TEST_MODE") == "1":
            return {
                "message": "Kayıt başarılı (test modu)",
                "user": {"email": data.email, "full_name": data.full_name},
                "access_token": "test-token-mihenk-123",
            }

        result = supabase.auth.sign_up(
            {
                "email": data.email,
                "password": data.password,
                "options": {
                    "data": {
                        "full_name": data.full_name,
                        "school_name": data.school_name,
                    }
                },
            }
        )

        if result.user is None:
            raise HTTPException(status_code=400, detail="Kayıt başarısız")

        return {
            "message": "Kayıt başarılı",
            "user": {"email": result.user.email, "id": str(result.user.id)},
            "access_token": result.session.access_token if result.session else None,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
async def login(data: LoginRequest):
    try:
        if os.getenv("TEST_MODE") == "1":
            return {
                "message": "Giriş başarılı (test modu)",
                "user": {
                    "email": data.email,
                    "full_name": "Test Öğretmen",
                    "school_name": "Test Okulu",
                },
                "access_token": "test-token-mihenk-123",
            }

        result = supabase.auth.sign_in_with_password(
            {"email": data.email, "password": data.password}
        )

        if result.user is None:
            raise HTTPException(status_code=401, detail="Email veya şifre hatalı")

        return {
            "message": "Giriş başarılı",
            "user": {
                "email": result.user.email,
                "id": str(result.user.id),
                "full_name": result.user.user_metadata.get("full_name", ""),
                "school_name": result.user.user_metadata.get("school_name", ""),
            },
            "access_token": result.session.access_token,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail="Giriş başarısız: " + str(e))


@router.get("/me")
async def me():
    if os.getenv("TEST_MODE") == "1":
        return {
            "email": "test@mihenk.ai",
            "full_name": "Test Öğretmen",
            "school_name": "Test Okulu",
            "subscription_tier": "pro",
        }
    raise HTTPException(status_code=401, detail="Token gerekli")
