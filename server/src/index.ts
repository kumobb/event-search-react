import express from "express";
import axios from "axios";
import cors from "cors";
import { API_KEY, SUGGEST_URL } from "./consts";

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/suggest", async (req, res) => {
  const keyword = req.query.keyword;

  try {
    const response = await axios.get(SUGGEST_URL, {
      params: {
        apikey: API_KEY,
        keyword: keyword,
      },
    });

    const suggestions = response.data._embedded?.attractions.map(
      (a: { name: string }) => a.name
    );
    res.send(suggestions);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching suggestions from Ticketmaster");
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
