from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import List, Optional
import models, schemas

# Configure bcrypt safely
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__truncate_error=True
)

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    password = str(user.password)
    hashed = pwd_context.hash(password)
    db_user = models.User(
        username=user.username,
        hashed_password=hashed,
        is_admin=user.is_admin
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None
    password_str = str(password)
    if len(password_str.encode("utf-8")) > 72:
        password_str = password_str.encode("utf-8")[:72].decode("utf-8", "ignore")

    if not pwd_context.verify(password_str, user.hashed_password):
        return None
    return user

def create_sweet(db: Session, sweet: schemas.SweetCreate):
    db_sweet = models.Sweet(**sweet.dict())
    db.add(db_sweet)
    db.commit()
    db.refresh(db_sweet)
    return db_sweet

def get_sweets(db: Session, skip: int = 0, limit: int = 100) -> List[models.Sweet]:
    return db.query(models.Sweet).offset(skip).limit(limit).all()

def get_sweet(db: Session, sweet_id: int):
    return db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()

def update_sweet(db: Session, sweet_id: int, data: schemas.SweetUpdate):
    s = get_sweet(db, sweet_id)
    if not s:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(s, key, value)
    db.commit()
    db.refresh(s)
    return s

def purchase_sweet(db: Session, sweet_id: int, qty: int):
    """Reduce quantity when a customer purchases sweets."""
    s = db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()
    if not s:
        return None
    if s.quantity < qty:
        raise ValueError("Not enough stock available!")
    s.quantity -= qty
    db.commit()
    db.refresh(s)
    return s


def restock_sweet(db: Session, sweet_id: int, qty: int):
    """Increase quantity when admin restocks sweets."""
    s = db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()
    if not s:
        return None
    s.quantity += qty
    db.commit()
    db.refresh(s)
    return s

