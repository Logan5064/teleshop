"""
Database Configuration for PostgreSQL
PostgreSQL connection for Constructor API
"""

from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
import os

# PostgreSQL connection
DATABASE_URL = "postgresql://cloud_user:u61e&ke&!Ty1@ladixoofilad.beget.app:5432/default_db"

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

def get_db():
    """Dependency for getting DB session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_database():
    """Initialize database connection"""
    print("🐘 Connecting to PostgreSQL...")
    
    try:
        # Test connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ PostgreSQL connection successful!")
            print(f"📍 Database: ladixoofilad.beget.app:5432/default_db")
            return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

if __name__ == "__main__":
    init_database() 