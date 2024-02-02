import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import ItemAdder from "./components/ItemAdder";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/add-item" element={<ItemAdder />} />
      </Routes>
    </>
  );
}

export default App;
