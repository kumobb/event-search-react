import express from "express";
import axios from "axios";
import cors from "cors";
import {
  API_KEY,
  SUGGEST_URL,
  TICKET_URL,
  EVENT_URL,
  SEGMENTS,
} from "./consts";
import * as geohash from "ngeohash";
import { logRequests } from "./middlewares";

const app = express();
const port = 3001;

app.use(cors());
app.use(logRequests);

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

    const genre: string[] = [];
    const eventGenres = data.classifications[0];

    if (
      eventGenres.segment &&
      eventGenres.segment.name.toLowerCase() !== "undefined"
    ) {
      genre.push(eventGenres.segment.name);
    }
    if (
      eventGenres.genre &&
      eventGenres.genre.name.toLowerCase() !== "undefined"
    ) {
      genre.push(eventGenres.genre.name);
    }
    if (
      eventGenres.subGenre &&
      eventGenres.subGenre.name.toLowerCase() !== "undefined"
    ) {
      genre.push(eventGenres.subGenre.name);
    }
    if (
      eventGenres.type &&
      eventGenres.type.name.toLowerCase() !== "undefined"
    ) {
      genre.push(eventGenres.type.name);
    }
    if (
      eventGenres.subType &&
      eventGenres.subType.name.toLowerCase() !== "undefined"
    ) {
      genre.push(eventGenres.subType.name);
    }

    const event = {
      id: data.id,
      name: data.name,
      date:
        data.dates.start.localDate +
        " " +
        (data.dates.start.localTime ? data.dates.start.localTime : ""),
      artist: data._embedded.attractions?.map((a: any) => a.name),
      venue: data._embedded.venues[0].name,
      genre,
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

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
