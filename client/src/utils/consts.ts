import { GOOGLEMAP_KEY, IPINFO_TOKEN } from "./secrets";

const IPINFO_URL = `https://ipinfo.io/?token=${IPINFO_TOKEN}`;
const GEOCODE_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLEMAP_KEY}&address=`;
const GOOGLEMAP_URL = "https://www.google.com/maps/search/?api=1&query=";
const TWITTER_URL = "https://twitter.com/intent/tweet?";
const FACEBOOK_URL = "https://www.facebook.com/share.php?u=";

export { IPINFO_URL, GEOCODE_URL, GOOGLEMAP_URL, TWITTER_URL, FACEBOOK_URL };
