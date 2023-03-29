import { Icon } from "@iconify/react";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { IArtistDetails } from "./ArtistsTab";

const ArtistCarouselItem = ({ artist }: { artist: IArtistDetails }) => {
  return (
    <>
      <Row className="justify-content-evenly mb-3 flex-md-nowrap">
        <Col sm={12} md={"auto"}>
          <Avatar
            alt="Artist Image"
            src={artist.image}
            sx={{ width: 128, height: 128 }}
            className="mx-auto"
          />
          <h3 className="mx-auto">{artist.name}</h3>
        </Col>
        <Col sm={12} md={"auto"} className="py-3 pt-md-5">
          <h4>Popularity</h4>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              sx={{ color: "#ca3142" }}
              variant="determinate"
              value={artist.popularity}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>{artist.popularity}</Typography>
            </Box>
          </Box>
        </Col>
        <Col sm={12} md={"auto"} className="py-3 pt-md-5">
          <h4>Followers</h4>
          {artist.followers.toLocaleString()}
        </Col>
        <Col sm={12} md={"auto"} className="py-3 pt-md-5">
          <h4>Spotify Link</h4>
          <a href={artist.link}>
            <Icon icon="mdi:spotify" color="#65d46e" width={40} height={40} />
          </a>
        </Col>
      </Row>
      <Row className="justify-content-evenly text-md-start px-5">
        <h5>Album featuring {artist.name}</h5>
        {artist.albums.map((a, i) => (
          <Col sm={12} md={4} key={i} className="my-2">
            <img src={a} alt={`Album cover ${i}`} className="img-fluid"></img>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ArtistCarouselItem;
