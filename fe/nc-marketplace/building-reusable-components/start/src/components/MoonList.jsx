import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMoons, getPlanets } from "../../api";

function MoonList() {
  const [moons, setMoons] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
    // Fetch planets for the dropdown
    getPlanets()
      .then((data) => {
        setPlanets(data.planets);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    // Fetch moons
    getMoons()
      .then((data) => {
        setMoons(data.moons);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handlePlanetChange = (e) => {
    navigate(`/moons/${e.target.value}`);
  };

  if (isLoading) {
    return <p>Loading moons...</p>;
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="list-container">
      <select onChange={handlePlanetChange}>
        <option value="">Select all</option>
        {planets.map((planet) =>
          planet.moon_count !== "0" ? (
            <option key={planet.planet_id} value={planet.planet_name}>
              {planet.planet_name}
            </option>
          ) : null
        )}
      </select>

      {moons.map((moon) => (
        <div key={moon.moon_id} className="list-item_container">
          <p className="list-item_heading">{moon.moon_name}</p>
          <p className="list-item_detail">{moon.planet_name}</p>
        </div>
      ))}
    </div>
  );
}

export default MoonList;
