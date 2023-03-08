import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { IEventDetails } from "./DetailsCard";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FACEBOOK_URL, TWITTER_URL } from "../../../utils/consts";

const ticketStatus = {
  onsale: "On Sale",
  offsale: "Off Sale",
  rescheduled: "Rescheduled",
  postponed: "Postponed",
  cancelled: "Canceled",
  canceled: "Canceled",
};

const EventsTab = ({ event }: { event: IEventDetails | null }) => {
  return (
    <Container className="py-4 text-center">
      {event && (
        <Row>
          <Col id="details-card-events-details" md={5}>
            <div>
              <h4>Date</h4>
              <p>{event.date}</p>
            </div>

            {event.artist && (
              <div>
                <h4>Artist/Team</h4>
                <p>
                  {event.artist.map((a, i) => {
                    return a + (i < event.artist.length - 1 ? " | " : "");
                  })}
                </p>
              </div>
            )}

            {event.venue && (
              <div>
                <h4>Venue</h4>
                <p>{event.venue}</p>
              </div>
            )}

            {event.genre.length > 0 && (
              <div>
                <h4>Genre</h4>
                <p>
                  {event.genre.map((g, i) => {
                    return g + (i < event.genre.length - 1 ? " | " : "");
                  })}
                </p>
              </div>
            )}

            {event.price && (
              <div>
                <h4>Price Ranges</h4>
                <p>{event.price}</p>
              </div>
            )}

            <div>
              <h4>Ticket Status</h4>
              <div className="my-2">
                <span className="p-1 rounded-3" ticket-status={event.status}>
                  {ticketStatus[event.status as keyof typeof ticketStatus]}
                </span>
              </div>
            </div>

            <div>
              <h4>Buy Ticket At:</h4>
              <a href={event.link}>Ticketmaster</a>
            </div>
          </Col>

          <Col md={7} className="d-flex align-items-center my-1">
            {event.map && (
              <img src={event.map} className="img-fluid" alt="Seat Map" />
            )}
          </Col>
        </Row>
      )}
      <p>
        Share on:{" "}
        <a
          href={
            `${TWITTER_URL}` +
            `text=Check ${event?.name} on Ticketmaster.%0a` +
            `&url=${event?.link}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon sx={{ color: "#6baae8" }} fontSize="large" />
        </a>
        <a
          href={`${FACEBOOK_URL}` + `${event?.link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon sx={{ color: "#3975ea" }} fontSize="large" />
        </a>
      </p>
    </Container>
  );
};

export default EventsTab;
