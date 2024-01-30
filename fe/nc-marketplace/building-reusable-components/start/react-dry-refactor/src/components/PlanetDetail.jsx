import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlanet } from "../../api";

function PlanetDetail() {
  const { planet_id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    getPlanet(planet_id)
      .then((data) => {
        setPlanet(data.planet);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
        setIsLoading(false);
      });
  }, [planet_id]);

  if (isLoading)
    return (
      <div className="loading-container">
        <p>Loading, please wait...</p>
      </div>
    );

  if (isError)
    return (
      <div className="error-display">
        <h2>Houston we have a problem!</h2>
        <p>An error occurred while trying to fetch data:</p>
        <pre>
          {error.status} {error.statusText}
        </pre>
      </div>
    );

  return (
    <div>
      <h2>{planet.planet_name}</h2>
      <img className="list-item_image" src={planet.img} alt={planet.name} />
      <p className="list-item_detail">
        Distance from Sun: {planet.au_from_sun} AU
      </p>
      <p className="list-item_detail">Type: {planet.type}</p>
      <p className="list-item_detail">Moon Count: {planet.moon_count}</p>
      <p className="list-item_detail">Fun fact: {planet.fun_fact}</p>
    </div>
  );
}

export default PlanetDetail;
