from logging import debug

import uvicorn
from fastapi import FastAPI, HTTPException, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from fastapi.responses import JSONResponse

from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
from Schemas import FruitCreate, FruitResponse
from models import Fruit

# class Fruit(BaseModel):
#     id: Optional[int] = None
#     fruit: str
#
#
# class Fruits(BaseModel):
#     fruits: List[Fruit]

app = FastAPI()

#create database table
Base.metadata.create_all(bind=engine)

# Dependency: Get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

memory_db = {"fruits": {}}

current_id = 1

@app.get("/")
def Home():
    print("home page called")
    return "Welcome to the home page!"

@app.get("/fruits", response_model=List[FruitResponse])
def get_fruits(db: Session = Depends(get_db)):
    fruits = db.query(Fruit).all()
    return fruits

@app.post("/fruits", response_model=FruitResponse)
def add_fruit(fruit: FruitCreate, db: Session = Depends(get_db)):
    #print(f"Fruit_data: {fruit}")
    if not fruit.fruit_name or not fruit.quantity or not fruit.price:
        raise HTTPException(status_code=400, detail="All feilds are required")
    db_fruit = db.query(Fruit).filter(Fruit.fruit_name == fruit.fruit_name).first()
    if db_fruit:
        raise HTTPException(status_code=400, detail="Fruit already exists")

    new_fruit = Fruit(
        fruit_name = fruit.fruit_name,
        quantity = fruit.quantity,
        price = fruit.price
    )

    db.add(new_fruit)
    db.commit()
    db.refresh(new_fruit)

    return new_fruit
    # global current_id
    # fruit.id = current_id
    # memory_db['fruits'][current_id] = fruit
    # current_id += 1
    # return fruit

@app.get("/fruit/{id}", response_model=FruitResponse)
def get_by_id(id: int, db: Session = Depends(get_db)):
   fruit = db.query(Fruit).filter(Fruit.id == id).first()
   if not fruit:
       raise HTTPException(status_code=404, detail="Fruit not found")
   return fruit

@app.put("/fruit/{id}", response_model=FruitResponse)
def update_by_id(id: int, update_fruit: FruitCreate, db: Session = Depends(get_db)):
    fruit = db.query(Fruit).filter(Fruit.id == id).first()
    if not fruit:
        raise HTTPException(status_code=404, detail="Fruit not found")

    # if update_fruit.fruit_name is not None:
    fruit.fruit_name = update_fruit.fruit_name
    #f update_fruit.quantity is not None:
    fruit.quantity = update_fruit.quantity
    #if update_fruit.price is not None:
    fruit.price = update_fruit.price

    db.commit()
    db.refresh(fruit)

    return fruit
@app.delete("/fruit/{id}", response_model=FruitResponse)
def delete_by_id(id: int, db: Session = Depends(get_db)):
    fruit = db.query(Fruit).filter(Fruit.id == id).first()
    if not fruit:
        raise HTTPException(status_code=404, detail="Fruit not found")

    db.delete(fruit)
    db.commit()
    print("Fruit deleted successfully")
    return JSONResponse(content={"message": f"Fruit with ID {id} deleted successfully"})


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)





