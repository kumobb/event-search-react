import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventsTab from "./EventsTab";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/material";

interface IEventDetails {
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
  const [fav, setFav] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabStyle = { textTransform: "none" };

  return (
    <Container
      id="details-card-container"
      className="my-5 p-0 main-container blur-card"
    >
      <p className="p-3 clickable">
        <ArrowBackIosNewIcon fontSize="small" />
        <u onClick={onBackClick}>Back</u>
      </p>

      <Row className="mb-3 justify-content-center">
        <Col md={"auto"}>
          <h1 className="text-center">{event?.name}</h1>
        </Col>
        <Col md={"auto"} className="my-auto">
          <Avatar
            sx={{ bgcolor: "white" }}
            className="mx-auto clickable"
            onClick={() => {
              setFav(!fav);
            }}
          >
            {fav ? (
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
