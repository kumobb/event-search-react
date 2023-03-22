import SpotifyWebApi from "spotify-web-api-node";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./secrets";

const spotify = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
});

export default spotify;
