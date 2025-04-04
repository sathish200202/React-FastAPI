from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# SQLite Database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./fruits.db"


# Create the SQLite engine
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()