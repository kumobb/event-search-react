import React from "react";
import { Carousel, Container } from "react-bootstrap";
import ArtistCarouselItem from "./ArtistCarouselItem";
import "./MyCarousel.css";

interface IArtistDetails {
  id: string;
  name: string;
  followers: number;
  popularity: number;
  link: string;
  image: string;
  albums: string[];
}

const ArtistsTab = ({
  artistsDetails,
}: {
  artistsDetails: IArtistDetails[];
}) => {
  return (
    <Container className="py-3 text-center details-tab">
      {!artistsDetails || artistsDetails.length === 0 ? (
        <div className="px-3 py-5">
          <p className="text-danger bg-white rounded-4 ">
            No music related artist details to show
          </p>
        </div>
      ) : (
        <Carousel
          interval={null}
          variant="dark"
          indicators={false}
          touch={false}
          controls={artistsDetails.length > 1}
        >
          {artistsDetails.map((a) => (
            <Carousel.Item key={a.id}>
              <ArtistCarouselItem artist={a} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </Container>
  );
};

export default ArtistsTab;
export type { IArtistDetails };
