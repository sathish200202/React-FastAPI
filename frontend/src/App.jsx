import AddFruitForm from "./components/AddFruitForm";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/NavBar";
function App() {
  return (
    <div>
      <p className="">Welcome</p>
      <Navbar />
      <AddFruitForm />
    </div>
  );
}

export default App;
