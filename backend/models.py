from sqlalchemy import Column, Integer, String, Float
from database import Base


class Fruit(Base):
    __tablename__ = "fruits"

    id = Column(Integer, primary_key=True, index=True)
    fruit_name = Column(String, unique=True, index=True)
    quantity = Column(Integer, index=True)
    price = Column(Float, index=True)