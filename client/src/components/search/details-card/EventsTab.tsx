import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { IEventDetails } from "./DetailsCard";

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
            {event.map && <img src={event.map} className="img-fluid" />}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default EventsTab;
