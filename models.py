import os
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, DateTime, JSON, text
from sqlalchemy.orm import declarative_base, sessionmaker

# Resolve DATABASE URL with required transformations
_db_url = os.getenv("DATABASE_URL", os.getenv("POSTGRES_URL", "sqlite:///./app.db"))
if _db_url.startswith("postgresql+asyncpg://"):
    _db_url = _db_url.replace("postgresql+asyncpg://", "postgresql+psycopg://")
elif _db_url.startswith("postgres://"):
    _db_url = _db_url.replace("postgres://", "postgresql+psycopg://")

_connect_args = {}
if not _db_url.startswith("sqlite"):
    # Apply SSL for non‑local PostgreSQL connections
    if "localhost" not in _db_url and "127.0.0.1" not in _db_url:
        _connect_args["sslmode"] = "require"

engine = create_engine(_db_url, connect_args=_connect_args, future=True)
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

class Itinerary(Base):
    __tablename__ = "cw_itineraries"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, default="Untitled")
    created_at = Column(DateTime, default=datetime.utcnow)
    data = Column(JSON, nullable=False)  # Structured itinerary JSON
