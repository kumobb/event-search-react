import React, { useState } from "react";
import { Container } from "react-bootstrap";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  return (
    <Container className="main-container text-center">
      <p className="text-danger bg-white rounded-4">
        No favorite events to show
      </p>
    </Container>
  );
};

export default Favorites;
