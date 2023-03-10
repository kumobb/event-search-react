import React, { useEffect, useRef, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventsTab, { IEventDetails } from "./EventsTab";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/material";
import ArtistsTab, { IArtistDetails } from "./ArtistsTab";
import axios from "axios";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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

  const [swiper, setSwiper] = useState<SwiperType | null>(null);

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

        if (!artists) {
          setArtistsDetails([]);
          return;
        }
        const artistDetails = await Promise.all(
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
                return artistResponse.data;
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
    if (swiper) {
      setTab(newValue);
      swiper.slideTo(newValue);
    }
  };

  return (
    <Container
      id="details-card-container"
      className="my-5 p-0 main-container blur-card"
    >
      <div className="p-3">
        <span role="button" onClick={onBackClick}>
          <ArrowBackIosNewIcon fontSize="small" />
          <u>Back</u>
        </span>
      </div>

      <Row className="mb-3 justify-content-center">
        <Col md={"auto"}>
          <h2 className="text-center">{eventDetails?.name}</h2>
        </Col>
        <Col md={"auto"} className="my-auto">
          <Avatar
            sx={{ bgcolor: "white" }}
            role={"button"}
            className="mx-auto"
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
        <Tab
          label="Events"
          className="text-white"
          sx={{ textTransform: "none" }}
        />
        <Tab
          label="Artist/Teams"
          className="text-white"
          sx={{ textTransform: "none" }}
        />
        <Tab
          label="Venue"
          className="text-white"
          sx={{ textTransform: "none" }}
        />
      </Tabs>
      <Swiper
        autoHeight={true}
        allowTouchMove={false}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        <SwiperSlide>
          <EventsTab eventDetails={eventDetails} />
        </SwiperSlide>
        <SwiperSlide>
          <ArtistsTab artistsDetails={artistsDetails} />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default DetailsCard;
