import axios from "axios";
import React, { useState } from "react";
import DetailsCard from "../search/details-card/DetailsCard";
import ResultsTable from "../search/results-table/ResultsTable";
import SearchForm from "../search/search-form/SearchForm";

interface IEvent {
  id: string;
  date: string;
  time: string;
  image: string;
  event: string;
  genre: string;
  venue: string;
}

const Search = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [tableOpen, setTableOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  const handleEventsChange = (events: IEvent[]) => {
    setTableOpen(true);
    setCardOpen(false);
    setEvents(events);
  };

  const handleClear = () => {
    setEvents([]);
    setTableOpen(false);
    setCardOpen(false);
  };

  const handleEventClick = (id: string) => {
    setSelectedEventId(id);
    setTableOpen(false);
    setCardOpen(true);
  };

  const handleBackClick = () => {
    setCardOpen(false);
    setTableOpen(true);
  };

  return (
    <>
      <SearchForm onEventsChange={handleEventsChange} onClear={handleClear} />
      {tableOpen && (
        <ResultsTable events={events} onEventClick={handleEventClick} />
      )}
      {cardOpen && (
        <DetailsCard eventId={selectedEventId} onBackClick={handleBackClick} />
      )}
    </>
  );
};

export default Search;
export type { IEvent };
