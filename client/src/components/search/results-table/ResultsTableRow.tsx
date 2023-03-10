import React from "react";
import { IEvent } from "../../routes/Search";

const ResultsTableRow = ({
  event,
  onClick,
}: {
  event: IEvent;
  onClick: () => void;
}) => {
  return (
    <tr role="button" onClick={onClick}>
      <td>
        {event.date}
        <br />
        {event.time ? event.time : ""}
      </td>
      <td>
        <img alt="Event" src={event.image} className="w-100 img-fluid" />
      </td>
      <td>{event.event}</td>
      <td>{event.genre}</td>
      <td>{event.venue}</td>
    </tr>
  );
};

export default ResultsTableRow;
