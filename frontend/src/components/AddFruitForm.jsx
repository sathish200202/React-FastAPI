import React, { useState, useEffect } from "react";
import {
  fetchFruits,
  postFruit,
  deleteFruit,
  viewFruitById,
  updateFruitById,
} from "../api.js";

const AddFruitForm = () => {
  const [fruitData, setFruitData] = useState({
    fruit_name: "",
    quantity: 0,
    price: 0.0,
  });
  const [fruits, setFruits] = useState([]);
  const [viewFruit, setViewFruit] = useState(false);
  const [fruit, setFruit] = useState(null);

  const [editFruitData, setEditFruitData] = useState({
    fruit_name: "",
    quantity: 0,
    price: 0.0,
  });
  const [editing, setEditing] = useState(false);

  const getFruits = async () => {
    const data = await fetchFruits();
    setFruits(data);
  };

  useEffect(() => {
    getFruits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fruitData.fruit_name && fruitData.quantity && fruitData.price) {
      await postFruit(fruitData);
      setFruitData({ fruit_name: "", quantity: 0, price: 0.0 });
      getFruits();
    } else {
      console.log("All fields are required");
    }
  };

  const handleViewFruit = async (fruit_id) => {
    const data = await viewFruitById(fruit_id);
    setFruit(data);

    setViewFruit(true);
    setEditing(false);
  };

  const handleEditFruit = () => {
    if (fruit) {
      setEditFruitData({
        fruit_name: fruit.fruit_name,
        quantity: fruit.quantity,
        price: fruit.price,
      });
      setEditing(true);
    }
  };

  const handleDeleteFruit = async (fruit_id) => {
    await deleteFruit(fruit_id);
    setViewFruit(false);
    getFruits();
  };

  const handleUpdateFruit = async (fruit_id) => {
    await updateFruitById(fruit_id, editFruitData);
    setViewFruit(false);
    getFruits();
  };

  return (
    <div>
      {!viewFruit ? (
        <div className="bg-black">
          <form onSubmit={handleSubmit}>
            <h1>Add Fruit</h1>
            <input
              type="text"
              value={fruitData.fruit_name}
              onChange={(e) =>
                setFruitData({ ...fruitData, fruit_name: e.target.value })
              }
              placeholder="Enter Fruit name"
            />
            <input
              type="number"
              value={fruitData.quantity}
              onChange={(e) =>
                setFruitData({ ...fruitData, quantity: e.target.value })
              }
              placeholder="Enter Fruit name"
            />
            <input
              type="text"
              value={fruitData.price}
              onChange={(e) =>
                setFruitData({ ...fruitData, price: e.target.value })
              }
              placeholder="Enter Fruit name"
            />
            <button type="submit">Add Fruit</button>
          </form>
          <p>Fruit List</p>
          {fruits.length > 0 ? (
            <ul>
              {fruits.map((fruit) => (
                <li key={fruit.id}>
                  {fruit.fruit_name}
                  <span style={{ paddingLeft: "10px" }}>
                    <button onClick={() => handleViewFruit(fruit.id)}>
                      View
                    </button>
                  </span>
                  {/*                                     <span style={{ paddingLeft: "20px" }}> */}
                  {/*                                         <button onClick={() => handleDeleteFruit(fruit.id)}>Delete</button> */}
                  {/*                                     </span> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No fruits available</p>
          )}
        </div>
      ) : (
        <div align="center">
          <h2>Fruit Details</h2>
          {!editing ? (
            <div>
              <p>Fruit: {fruit.fruit_name}</p>
              <p>Quantity: {fruit.quantity}</p>
              <p>Price:₹ {fruit.price}(per fruit)</p>
              <p>Total Price:₹ {fruit.price * fruit.quantity}</p>
              <button onClick={handleEditFruit}>Edit</button>
              <button onClick={() => handleDeleteFruit(fruit.id)}>
                Delete
              </button>
              <button onClick={() => setViewFruit(false)}>
                View All Fruits
              </button>
            </div>
          ) : (
            <div>
              <p>Edit the fruit</p>
              <input
                value={editFruitData.fruit_name}
                onChange={(e) =>
                  setEditFruitData({
                    ...editFruitData,
                    fruit_name: e.target.value,
                  })
                }
              />
              <input
                value={editFruitData.quantity}
                onChange={(e) =>
                  setEditFruitData({
                    ...editFruitData,
                    quantity: e.target.value,
                  })
                }
              />
              <input
                value={editFruitData.price}
                onChange={(e) =>
                  setEditFruitData({ ...editFruitData, price: e.target.value })
                }
              />
              <button onClick={() => handleUpdateFruit(fruit.id)}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddFruitForm;
