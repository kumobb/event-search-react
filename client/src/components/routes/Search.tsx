import axios from "axios";
import React, { useState } from "react";
import DetailsCard, { IEventDetails } from "../search/details-card/DetailsCard";
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
  const [event, setEvent] = useState<IEventDetails | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [tableOpen, setTableOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  const handleEventsChange = (events: IEvent[]) => {
    setTableOpen(true);
    setEvents(events);
  };

  const handleClear = () => {
    setEvents([]);
    setTableOpen(false);
  };

  const handleEventClick = async (id: string) => {
    setEvent(null);
    setTableOpen(false);
    setCardOpen(true);

    try {
      const response = await axios.get("http://localhost:3001/api/event", {
        params: {
          id,
        },
      });

      setEvent(response.data);
    } catch (error) {
      console.log(error);
    }
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
      {cardOpen && <DetailsCard event={event} onBackClick={handleBackClick} />}
    </>
  );
};

export default Search;
export type { IEvent };
