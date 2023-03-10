import React from "react";
import { Container, Table } from "react-bootstrap";
import { IEvent } from "../../routes/Search";
import ResultsTableRow from "./ResultsTableRow";

const ResultsTable = ({
  events,
  onEventClick,
}: {
  events: IEvent[];
  onEventClick: (id: string) => void;
}) => {
  return (
    <Container className="mt-5 main-container p-0 text-center table-container">
      {events.length === 0 ? (
        <p className="text-danger bg-white rounded-4">No results available</p>
      ) : (
        <Table
          className="rounded-4 overflow-hidden"
          striped
          hover
          variant="dark"
          responsive="md"
        >
          <thead>
            <tr>
              <th>Date/Time</th>
              <th style={{ width: "20%", minWidth: "100px" }}>Icon</th>
              <th>Event</th>
              <th>Genre</th>
              <th>Venue</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <ResultsTableRow
                event={e}
                key={e.id}
                onClick={() => onEventClick(e.id)}
              />
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ResultsTable;
