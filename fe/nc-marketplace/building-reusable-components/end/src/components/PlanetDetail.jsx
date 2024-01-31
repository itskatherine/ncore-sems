import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlanet } from "../../api";
import Error from "./Error";
import Loading from "./Loading";

function PlanetDetail() {
  const { planet_id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [isError, setIsError] = useState(false);

  useEffect(() => {
    setError(null);
    getPlanet(planet_id)
      .then((data) => {
        setPlanet(data.planet);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [planet_id]);

  if (isLoading) return <Loading />;

  if (error !== null) return <Error error={error} />;

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
