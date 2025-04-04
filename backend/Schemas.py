from pydantic import BaseModel


class FruitCreate(BaseModel):
    fruit_name: str
    quantity: int
    price: float


class FruitResponse(FruitCreate):
    id: int

    class Config:
        orm_mode = True  # Ensures ORM mode compatibility