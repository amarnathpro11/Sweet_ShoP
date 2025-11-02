from fastapi.testclient import TestClient
from main import app
import os
from database import Base, engine, SessionLocal
import models

client = TestClient(app)

def setup_module():
    # recreate DB for tests
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

def test_register_and_login():
    # register
    resp = client.post("/api/auth/register", json={"username":"testuser","password":"testpass","is_admin":True})
    assert resp.status_code == 200
    data = resp.json()
    assert data["username"] == "testuser"
    # login
    resp = client.post("/api/auth/login", data={"username":"testuser","password":"testpass"})
    assert resp.status_code == 200
    token = resp.json()["access_token"]
    assert token

def test_create_and_purchase_sweet():
    # login to get token
    resp = client.post("/api/auth/login", data={"username":"testuser","password":"testpass"})
    token = resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    # create sweet
    resp = client.post("/api/sweets", json={"name":"Ladoo","category":"Traditional","price":10.5,"quantity":5}, headers=headers)
    assert resp.status_code == 201
    sid = resp.json()["id"]
    # purchase
    resp = client.post(f"/api/sweets/{sid}/purchase", params={"qty":2}, headers=headers)
    assert resp.status_code == 200
    assert resp.json()["quantity"] == 3
