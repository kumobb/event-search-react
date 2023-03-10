import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FACEBOOK_URL, TWITTER_URL } from "../../../../utils/consts";

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
        <Row className="details-tab">
          <Col md={5}>
            <h4>Date</h4>
            <p>{eventDetails.date}</p>

            {eventDetails.artists && (
              <>
                <h4>Artist/Team</h4>
                <p>
                  {eventDetails.artists.map((a, i) => {
                    return (
                      a.name +
                      (i < eventDetails.artists.length - 1 ? " | " : "")
                    );
                  })}
                </p>
              </>
            )}

            {eventDetails.venue && (
              <>
                <h4>Venue</h4>
                <p>{eventDetails.venue}</p>
              </>
            )}

            {eventDetails.genre.length > 0 && (
              <>
                <h4>Genre</h4>
                <p>
                  {eventDetails.genre.map((g, i) => {
                    return g + (i < eventDetails.genre.length - 1 ? " | " : "");
                  })}
                </p>
              </>
            )}

            {eventDetails.price && (
              <>
                <h4>Price Ranges</h4>
                <p>{eventDetails.price}</p>
              </>
            )}

            <h4>Ticket Status</h4>
            <div className="my-2">
              <span
                className="p-1 rounded-3"
                ticket-status={eventDetails.status}
              >
                {ticketStatus[eventDetails.status as keyof typeof ticketStatus]}
              </span>
            </div>

            <h4>Buy Ticket At:</h4>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={eventDetails.link}
            >
              Ticketmaster
            </a>
          </Col>

          <Col md={7} className="d-flex align-items-center my-3">
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
          href={`${FACEBOOK_URL}${eventDetails?.link}`}
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
