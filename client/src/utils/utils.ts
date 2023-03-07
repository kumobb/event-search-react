import { GEOCODE_URL, IPINFO_URL } from "./consts";

const getCoordinates = async (auto: boolean, location: string) => {
  let url: string;

  if (auto) {
    url = IPINFO_URL;
  } else {
    url = GEOCODE_URL + location.split(" ").join("+");
  }

  const resp = await fetch(url);
  const json = await resp.json();

  if (auto) {
    let coord = json.loc.split(",");
    return {
      lat: parseFloat(coord[0]),
      lng: parseFloat(coord[1]),
    };
  } else {
    let coord = json.results[0]?.geometry.location;

    if (!coord) return null;

    return {
      lat: parseFloat(coord.lat),
      lng: parseFloat(coord.lng),
    };
  }
};

export { getCoordinates };
