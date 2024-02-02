import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlanets } from "../../api";
import Error from "./Error";
import Loading from "./Loading";

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { type } = useParams();

  useEffect(() => {
    setError(null);
    getPlanets(type)
      .then((data) => {
        setPlanets(data.planets);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching data");
        setIsLoading(false);
      });
  }, [type]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) return <Error error={error} />;

  return (
    <div className="list-container">
      {planets.map((planet) => (
        <div key={planet.planet_id} className="list-item_container">
          <Link to={`/planet/${planet.planet_id}`}>
            <p className="list-item_heading">{planet.planet_name}</p>
          </Link>
          <p className="list-item_detail">
            Distance from Sun: {planet.au_from_sun} AU
          </p>
          <Link to={`/planets/${planet.type}`}>
            <p className="list-item_detail">Type: {planet.type}</p>
          </Link>
          {planet.moon_count > 0 ? (
            <Link to={`/moons/${planet.planet_name}`}>
              <p className="list-item_detail">
                Moon Count: {planet.moon_count}
              </p>
            </Link>
          ) : (
            <p className="list-item_detail">Moon Count: {planet.moon_count}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default PlanetList;
