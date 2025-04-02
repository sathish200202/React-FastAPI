from logging import debug

import uvicorn
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional


class Fruit(BaseModel):
    id: Optional[int] = None
    fruit: str


class Fruits(BaseModel):
    fruits: List[Fruit]

app = FastAPI()

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

@app.get("/fruits", response_model=Fruits)
def get_fruits():
    return Fruits(fruits=list(memory_db['fruits'].values()))

@app.post("/fruits", response_model=Fruit)
def add_fruit(fruit: Fruit):
    global current_id
    fruit.id = current_id
    memory_db['fruits'][current_id] = fruit
    current_id += 1
    return fruit

@app.get("/fruit/{id}", response_model=Fruit)
def get_by_id(id: int):
    if id not in memory_db['fruits']:
        raise HTTPException(status_code=404, detail="Fruit not found")
    return memory_db['fruits'][id]

@app.put("/fruit/{id}", response_model=Fruit)
def update_by_id(id: int, update_fruit: Fruit):
    if id is None:
        print("ID is None!")  # Debugging
    elif id not in memory_db["fruits"]:
        print(f"ID {id} not found in database!")
    else:
        memory_db['fruits'][id].fruit = update_fruit
        print(memory_db['fruits'][id])
        return memory_db['fruits'][id]

@app.delete("/fruit/{id}", response_model=Fruit)
def delete_by_id(id: int):
    if id not in memory_db["fruits"]:
        # raise HTTPException(status_code=404, detail="Fruit not found")
        return Response(status_code=200)

    deleted_fruit = memory_db["fruits"].pop(id)
    print(deleted_fruit)

    return deleted_fruit
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)





