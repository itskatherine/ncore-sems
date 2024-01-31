import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import PlanetList from "./components/PlanetList";
import MoonList from "./components/MoonList";
import PlanetDetail from "./components/PlanetDetail";
import Header from "./components/Header";
import Home from "./components/Home";

import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Nav />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planets" element={<PlanetList />} />
            <Route path="/planets/:type" element={<PlanetList />} />
            <Route path="/planet/:planet_id" element={<PlanetDetail />} />
            <Route path="/moons" element={<MoonList />} />
            <Route path="/moons/:planet_name" element={<MoonList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
