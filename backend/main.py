from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from database import engine, Base
from sqlalchemy.orm import Session
from deps import get_db, get_current_user
import crud, schemas, models
from auth import create_access_token
from dotenv import load_dotenv
import os

# ----------------------------
# Load environment variables
# ----------------------------
load_dotenv()

# ----------------------------
# Initialize app and DB
# ----------------------------
Base.metadata.create_all(bind=engine)
app = FastAPI(title="Sweet Shop Management System API")

# ----------------------------
# ✅ CORS Middleware (Very Important)
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TEMP fix: allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Auth Endpoints
# ----------------------------

@app.post("/api/auth/register", response_model=schemas.UserOut)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = crud.get_user_by_username(db, user_in.username)
    if existing:
        raise HTTPException(status_code=400, detail="Username already registered")
    user = crud.create_user(db, user_in)
    return user


@app.post("/api/auth/login", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}


# ----------------------------
# Sweets Endpoints
# ----------------------------

@app.post("/api/sweets", response_model=schemas.SweetOut, status_code=201)
def create_sweet(
    sweet: schemas.SweetCreate,
    current_user=Depends(get_current_user),
    db: Session=Depends(get_db)
):
    return crud.create_sweet(db, sweet)


@app.get("/api/sweets", response_model=List[schemas.SweetOut])
def list_sweets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_sweets(db, skip, limit)


@app.get("/api/sweets/search", response_model=List[schemas.SweetOut])
def search_sweets(
    name: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    db: Session = Depends(get_db)
):
    return crud.search_sweets(db, name, category, min_price, max_price)


@app.get("/api/sweets/{sweet_id}", response_model=schemas.SweetOut)
def get_sweet(sweet_id: int, db: Session = Depends(get_db)):
    s = crud.get_sweet(db, sweet_id)
    if not s:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return s


@app.put("/api/sweets/{sweet_id}", response_model=schemas.SweetOut)
def update_sweet(
    sweet_id: int,
    data: schemas.SweetUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    s = crud.update_sweet(db, sweet_id, data)
    if not s:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return s


@app.delete("/api/sweets/{sweet_id}")
def delete_sweet(
    sweet_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # only admin can delete
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    ok = crud.delete_sweet(db, sweet_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return {"detail": "Deleted"}


@app.post("/api/sweets/{sweet_id}/purchase", response_model=schemas.SweetOut)
def purchase(
    sweet_id: int,
    qty: int = 1,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    s = crud.purchase_sweet(db, sweet_id, qty)
    if s is None:
        raise HTTPException(status_code=400, detail="Not enough stock or not found")
    return s


@app.post("/api/sweets/{sweet_id}/restock", response_model=schemas.SweetOut)
def restock(
    sweet_id: int,
    qty: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    s = crud.restock_sweet(db, sweet_id, qty)
    if s is None:
        raise HTTPException(status_code=404, detail="Not found")
    return s
