import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GenericList from "./GenericList";

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://space-facts.herokuapp.com/api/planets")
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.planets);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  const renderPlanets = (planet) => (
    <div key={planet.planet_id} className="list-item_container">
      <Link to={`/planet/${planet.planet_id}`}>
        <p className="list-item_heading">{planet.planet_name}</p>
      </Link>
      <p className="list-item_detail">
        Distance from Sun: {planet.au_from_sun} AU
      </p>
      <p className="list-item_detail">Type: {planet.type}</p>
      {planet.moon_count > 0 ? (
        <Link to={`/moons/${planet.planet_name}`}>
          <p className="list-item_detail">Moon Count: {planet.moon_count}</p>
        </Link>
      ) : (
        <p className="list-item_detail">Moon Count: {planet.moon_count}</p>
      )}
    </div>
  );

  if (isLoading) {
    return <p>Loading planets...</p>;
  }

  return (
    <div className="list-container">
      <GenericList
        items={planets}
        renderItem={renderPlanets}
        itemsPerPage={6}
      />
    </div>
  );
}

export default PlanetList;