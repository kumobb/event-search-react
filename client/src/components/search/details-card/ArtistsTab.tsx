import { Avatar } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

interface IArtistDetails {
  id: string;
  name: string;
  followers: number;
  popularity: number;
  link: string;
  image: string;
}

const ArtistsTab = ({
  artistsDetails,
}: {
  artistsDetails: IArtistDetails[];
}) => {
  return (
    <Container>
      <Row>
        <Col>
          {artistsDetails.map((a) => (
            <Avatar key={a.id} alt="Artist Image" src={a.image} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ArtistsTab;
export type { IArtistDetails };
