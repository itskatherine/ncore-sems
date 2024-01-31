export function getMoons() {
  return fetch(
    "https://space-facts.herokuapp.com/api/moons?sort_by=moon_name"
  ).then((response) => {
    if (!response.ok) {
      const { status, statusText } = response;
      return Promise.reject({ status, statusText });
    }
    return response.json();
  });
}

export function getPlanets() {
  return fetch("https://space-facts.herokuapp.com/api/planets").then(
    (response) => {
      if (!response.ok) {
        const { status, statusText } = response;
        return Promise.reject({ status, statusText });
      }
      return response.json();
    }
  );
}

export function getPlanetsByType(type) {
  return fetch(
    `https://space-facts.herokuapp.com/api/planets?type=${type}`
  ).then((response) => {
    if (!response.ok) {
      const { status, statusText } = response;
      return Promise.reject({ status, statusText });
    }
    return response.json();
  });
}

export function getPlanet(planet_id) {
  return fetch(
    `https://space-facts.herokuapp.com/api/planets/${planet_id}`
  ).then((response) => {
    if (!response.ok) {
      const { status, statusText } = response;
      return Promise.reject({ status, statusText });
    }
    return response.json();
  });
}
