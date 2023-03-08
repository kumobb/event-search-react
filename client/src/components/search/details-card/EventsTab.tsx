import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FACEBOOK_URL, TWITTER_URL } from "../../../utils/consts";

interface IEventDetails {
  id: string;
  name: string;
  date: string;
  artists: {
    name: string;
    segment: string;
  }[];
  venue: string;
  genre: string[];
  price: string;
  status: string;
  link: string;
  map: string;
}

const ticketStatus = {
  onsale: "On Sale",
  offsale: "Off Sale",
  rescheduled: "Rescheduled",
  postponed: "Postponed",
  cancelled: "Canceled",
  canceled: "Canceled",
};

const EventsTab = ({
  eventDetails,
}: {
  eventDetails: IEventDetails | null;
}) => {
  return (
    <Container className="py-4 text-center">
      {eventDetails && (
        <Row>
          <Col id="details-card-events-details" md={5}>
            <div>
              <h4>Date</h4>
              <p>{eventDetails.date}</p>
            </div>

            {eventDetails.artists && (
              <div>
                <h4>Artist/Team</h4>
                <p>
                  {eventDetails.artists.map((a, i) => {
                    return (
                      a.name +
                      (i < eventDetails.artists.length - 1 ? " | " : "")
                    );
                  })}
                </p>
              </div>
            )}

            {eventDetails.venue && (
              <div>
                <h4>Venue</h4>
                <p>{eventDetails.venue}</p>
              </div>
            )}

            {eventDetails.genre.length > 0 && (
              <div>
                <h4>Genre</h4>
                <p>
                  {eventDetails.genre.map((g, i) => {
                    return g + (i < eventDetails.genre.length - 1 ? " | " : "");
                  })}
                </p>
              </div>
            )}

            {eventDetails.price && (
              <div>
                <h4>Price Ranges</h4>
                <p>{eventDetails.price}</p>
              </div>
            )}

            <div>
              <h4>Ticket Status</h4>
              <div className="my-2">
                <span
                  className="p-1 rounded-3"
                  ticket-status={eventDetails.status}
                >
                  {
                    ticketStatus[
                      eventDetails.status as keyof typeof ticketStatus
                    ]
                  }
                </span>
              </div>
            </div>

            <div>
              <h4>Buy Ticket At:</h4>
              <a href={eventDetails.link}>Ticketmaster</a>
            </div>
          </Col>

          <Col md={7} className="d-flex align-items-center my-1">
            {eventDetails.map && (
              <img
                src={eventDetails.map}
                className="img-fluid"
                alt="Seat Map"
              />
            )}
          </Col>
        </Row>
      )}
      <p>
        Share on:{" "}
        <a
          href={
            `${TWITTER_URL}` +
            `text=Check ${eventDetails?.name} on Ticketmaster.%0a` +
            `&url=${eventDetails?.link}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon sx={{ color: "#6baae8" }} fontSize="large" />
        </a>
        <a
          href={`${FACEBOOK_URL}` + `${eventDetails?.link}`}
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
export type { IEventDetails };
