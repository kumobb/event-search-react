import express from "express";
import axios from "axios";
import cors from "cors";
import {
  API_KEY,
  SUGGEST_URL,
  TICKET_URL,
  EVENT_URL,
  SEGMENTS,
  VENUE_URL,
} from "./consts";
import * as geohash from "ngeohash";
import { logRequests } from "./middlewares";
import spotify from "./spotify";
import path from "path";

const app = express();
const port = 8080;

app.use(cors());
app.use(logRequests);
app.use(express.static(path.join(__dirname, "../build")));

app.get("/api/suggest", async (req, res) => {
  const keyword = req.query.keyword;

  try {
    const response = await axios.get(SUGGEST_URL, {
      params: {
        apikey: API_KEY,
        keyword: keyword,
      },
    });

    const suggestions = response.data._embedded?.attractions?.map(
      (a: { name: string }) => a.name
    );
    res.send(suggestions);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching suggestions from Ticketmaster");
  }
});

app.get("/api/tickets", async (req, res) => {
  const lat = parseFloat(req.query.lat as string);
  const lng = parseFloat(req.query.lng as string);

  const geoPoint = geohash.encode(lat, lng, 7);

  try {
    const response = await axios.get(TICKET_URL, {
      params: {
        apikey: API_KEY,
        keyword: req.query.keyword,
        segmentId: SEGMENTS[req.query.category as keyof typeof SEGMENTS],
        radius: req.query.distance,
        geoPoint,
      },
    });

    const data = response.data;

    if (!data._embedded) {
      res.send([]);
      return;
    }

    const events = data._embedded.events.map((e: any) => {
      return {
        id: e.id,
        date: e.dates.start.localDate,
        time: e.dates.start.localTime,
        image: e.images[0].url,
        event: e.name,
        genre:
          e.classifications[0].segment.name.toLowerCase() === "undefined"
            ? ""
            : e.classifications[0].segment.name,
        venue: e._embedded.venues[0].name,
      };
    });

    events.sort((a: any, b: any) => {
      const aDateTime = new Date(`${a.date}` + (a.time ? `T${a.time}` : ""));
      const bDateTime = new Date(`${b.date}` + (b.time ? `T${b.time}` : ""));

      return aDateTime.getTime() - bDateTime.getTime();
    });

    res.send(events);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching ticktes from Ticketmaster");
  }
});

app.get("/api/event", async (req, res) => {
  const id = req.query.id;

  try {
    const response = await axios.get(EVENT_URL + `${id}.json`, {
      params: {
        apikey: API_KEY,
      },
    });

    const data = response.data;

    const event = {
      id: data.id,
      name: data.name,
      date: data.dates.start.localDate,
      time: data.dates.start.localTime,
      artists: data._embedded.attractions?.map((a: any) => {
        return { name: a.name, segment: a.classifications[0].segment.name };
      }),
      venue: data._embedded.venues[0].name,
      genre: [
        data.classifications[0].segment,
        data.classifications[0].genre,
        data.classifications[0].subGenre,
        data.classifications[0].type,
        data.classifications[0].subType,
      ]
        .filter((g) => g)
        .filter((g) => g.name.toLowerCase() !== "undefined")
        .map((g) => g.name),
      price: data.priceRanges
        ? data.priceRanges[0].min +
          " - " +
          data.priceRanges[0].max +
          " " +
          data.priceRanges[0].currency
        : "",
      status: data.dates.status.code,
      link: data.url,
      map: data.seatmap?.staticUrl,
    };

    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching event details from Ticketmaster");
  }
});

app.get("/api/artist", async (req, res) => {
  const keyword = req.query.keyword as string;

  let tryCount = 0;
  const maxTries = 3;

  while (tryCount < maxTries) {
    try {
      const response = await spotify.searchArtists(keyword);

      const artistDetails = response.body.artists?.items
        .filter((a) => a.name.toLowerCase() === keyword.toLowerCase())
        .map((a) => {
          return {
            id: a.id,
            name: keyword,
            followers: a.followers.total,
            popularity: a.popularity,
            link: a.uri,
            image: a.images[0].url,
            albums: [] as string[],
          };
        })[0];

      if (!artistDetails) {
        res.send(artistDetails);
        return;
      }

      const albumResponse = await spotify.getArtistAlbums(artistDetails.id, {
        limit: 3,
      });

      artistDetails.albums = albumResponse.body.items.map(
        (a) => a.images[0].url
      );

      res.send(artistDetails);
      return;
    } catch (error) {
      tryCount++;

      try {
        const data = await spotify.clientCredentialsGrant();
        spotify.setAccessToken(data.body["access_token"]);
      } catch (error) {
        console.log(
          "Something went wrong when retrieving an access token, retrying...",
          error
        );
      }
    }
  }

  res.status(500).send("Error fetching artists details from Spotify");
});

app.get("/api/venue", async (req, res) => {
  const keyword = req.query.keyword;

  try {
    const response = await axios.get(VENUE_URL, {
      params: {
        apikey: API_KEY,
        keyword,
      },
    });

    const venue = response.data._embedded?.venues[0];

    if (!venue) res.send(null);

    res.send({
      name: venue.name,
      address:
        (venue.address?.line1 ? `${venue.address.line1}, ` : "") +
        (venue.city?.name ? `${venue.city.name}, ` : "") +
        (venue.state?.name ? `${venue.state.name}` : ""),
      number: venue.boxOfficeInfo?.phoneNumberDetail,
      openHours: venue.boxOfficeInfo?.openHoursDetail,
      generalRule: venue.generalInfo?.generalRule,
      childRule: venue.generalInfo?.childRule,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching venue details from Ticketmaster");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
