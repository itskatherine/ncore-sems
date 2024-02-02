import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMoons, getPlanets } from "../../api";
import Error from "./Error";
import Loading from "./Loading";

function MoonList() {
  const [moons, setMoons] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { planet_name } = useParams();

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
    return <Loading />;
  }

  if (error) return <Error error={error} />;

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

      {moons.map((moon) => {
        if (!planet_name) {
          return (
            <div key={moon.moon_id} className="list-item_container">
              <p className="list-item_heading">{moon.moon_name}</p>
              <p className="list-item_detail">{moon.planet_name}</p>
            </div>
          );
        } else {
          return moon.planet_name === planet_name ? (
            <div key={moon.moon_id} className="list-item_container">
              <p className="list-item_heading">{moon.moon_name}</p>
            </div>
          ) : null;
        }
      })}
    </div>
  );
}

export default MoonList;
