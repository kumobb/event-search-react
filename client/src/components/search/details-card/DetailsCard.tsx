import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventsTab from "./EventsTab";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/material";

interface IEventDetails {
  id: string;
  name: string;
  date: string;
  artist: string[];
  venue: string;
  genre: string[];
  price: string;
  status: string;
  link: string;
  map: string;
}

const DetailsCard = ({
  event,
  onBackClick,
}: {
  event: IEventDetails | null;
  onBackClick: () => void;
}) => {
  const [tab, setTab] = useState(0);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!event) return;
    const storedData = localStorage.getItem(event.id);
    if (storedData) {
      setFavorite(true);
    }
  }, [event]);

  useEffect(() => {
    if (!event) return;
    favorite
      ? localStorage.setItem(event.id, "liked")
      : localStorage.removeItem(event.id);
  }, [favorite]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabStyle = { textTransform: "none" };

  return (
    <Container
      id="details-card-container"
      className="my-5 p-0 main-container blur-card"
    >
      <p className="p-3 clickable" onClick={onBackClick}>
        <ArrowBackIosNewIcon fontSize="small" />
        <u>Back</u>
      </p>

      <Row className="mb-3 justify-content-center">
        <Col md={"auto"}>
          <h2 className="text-center">{event?.name}</h2>
        </Col>
        <Col md={"auto"} className="my-auto">
          <Avatar
            sx={{ bgcolor: "white" }}
            className="mx-auto clickable"
            onClick={() => {
              setFavorite(!favorite);
            }}
          >
            {favorite ? (
              <FavoriteIcon sx={{ color: "#ea3323" }} />
            ) : (
              <FavoriteBorderIcon color="action" />
            )}
          </Avatar>
        </Col>
      </Row>

      <Tabs
        id="details-card-tabs"
        value={tab}
        onChange={handleTabChange}
        centered
      >
        <Tab label="Events" className="text-white" sx={tabStyle} />
        <Tab label="Artist/Teams" className="text-white" sx={tabStyle} />
        <Tab label="Venue" className="text-white" sx={tabStyle} />
      </Tabs>
      {tab === 0 && <EventsTab event={event} />}
    </Container>
  );
};

export default DetailsCard;
export type { IEventDetails };
