import React, { useState, useEffect } from "react";
import { fetchFruits, postFruit, deleteFruit, viewFruitById, updateFruitById } from "../api.js";

const AddFruitForm = () => {
    const [fruitName, setFruitName] = useState("");
    const [fruits, setFruits] = useState([]);
    const [viewFruit, setViewFruit] = useState(false);
    const [fruit, setFruit] = useState(null);
    const [editFruit, setEditFruit] = useState("");
    const [editing, setEditing] = useState(false);


    const getFruits = async () => {
        const data = await fetchFruits();
        const cleanedData = data.map(item => ({
            id: item.id,
            fruit: typeof item.fruit === "object" ? item.fruit.fruit : item.fruit
        }));
        setFruits(cleanedData);
    };

    useEffect(() => {
        getFruits();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fruitName.trim()) {
            await postFruit(fruitName);
            setFruitName("");
            getFruits();
        }
    };

    const handleViewFruit = async (fruit_id) => {
        const data = await viewFruitById(fruit_id);
        setFruit({
            id: data.id,
            fruit: typeof data.fruit === "object" ? data.fruit.fruit : data.fruit
        });

        setViewFruit(true);
        setEditing(false);
    };

    const handleEditFruit = () => {
        if (fruit) {
            setEditFruit(fruit.fruit);
            setEditing(true);
        }
    };

    const handleDeleteFruit = async (fruit_id) => {
        await deleteFruit(fruit_id);
        setViewFruit(false);
        getFruits();
    };

    const handleUpdateFruit = async (fruit_id) => {
        await updateFruitById(fruit_id, editFruit);
        setViewFruit(false);
        getFruits();
    };

    return (
        <div>
            {!viewFruit ? (
                <div>
                    <form onSubmit={handleSubmit}>
                        <h1>Add Fruit</h1>
                        <input
                            type="text"
                            value={fruitName}
                            onChange={(e) => setFruitName(e.target.value)}
                            placeholder="Enter Fruit name"
                        />
                        <button type="submit">Add Fruit</button>
                    </form>
                    <p>Fruit List</p>
                    {fruits.length > 0 ? (
                        <ul>
                            {fruits.map((fruit) => (
                                <li key={fruit.id}>
                                    {fruit.fruit}
                                    <span style={{ paddingLeft: "10px" }}>
                                        <button onClick={() => handleViewFruit(fruit.id)}>View</button>
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
                    <h2>Fruit</h2>
                    {!editing ? (
                        <div>
                            <p>Fruit: {fruit?.fruit || "No fruit selected"}</p>
                            <button onClick={handleEditFruit}>Edit</button>
                            <button onClick={() => handleDeleteFruit(fruit.id)}>Delete</button>
                            <button onClick={() => setViewFruit(false)}>View All Fruits</button>
                        </div>
                    ) : (
                        <div>
                            <p>Edit the fruit</p>
                            <input value={editFruit} onChange={(e) => setEditFruit(e.target.value)} />
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
