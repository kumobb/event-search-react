import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventsTab, { IEventDetails } from "./EventsTab";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/material";
import ArtistsTab, { IArtistDetails } from "./ArtistsTab";
import axios from "axios";

const DetailsCard = ({
  eventId,
  onBackClick,
}: {
  eventId: string;
  onBackClick: () => void;
}) => {
  const [tab, setTab] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [eventDetails, setEventDetails] = useState<IEventDetails | null>(null);
  const [artistsDetails, setArtistsDetails] = useState<IArtistDetails[]>([]);
  const [venue, setVenu] = useState<String>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/event`,
          {
            params: {
              id: eventId,
            },
          }
        );

        setEventDetails(eventResponse.data);

        const storedData = localStorage.getItem(eventId);
        if (storedData) {
          setFavorite(true);
        }

        const artists = eventResponse.data.artists as {
          name: string;
          segment: string;
        }[];

        const artistDetails: IArtistDetails[] = [];
        await Promise.all(
          artists
            .filter((a) => a.segment === "Music")
            .map(async (a) => {
              try {
                const artistResponse = await axios.get(
                  `${process.env.REACT_APP_API_URL}/api/artist`,
                  {
                    params: {
                      keyword: a.name,
                    },
                  }
                );
                artistDetails.push(artistResponse.data);
              } catch (error) {
                console.log(error);
              }
            })
        );
        setArtistsDetails(artistDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
          <h2 className="text-center">{eventDetails?.name}</h2>
        </Col>
        <Col md={"auto"} className="my-auto">
          <Avatar
            sx={{ bgcolor: "white" }}
            className="mx-auto clickable"
            onClick={() => {
              if (favorite) {
                alert("Removed form Favorites");
                localStorage.removeItem(eventId);
              } else {
                alert("Event Added to Favorites");
                localStorage.setItem(eventId, "liked");
              }
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
      {tab === 0 && <EventsTab eventDetails={eventDetails} />}
      {tab === 1 && <ArtistsTab artistsDetails={artistsDetails} />}
    </Container>
  );
};

export default DetailsCard;
