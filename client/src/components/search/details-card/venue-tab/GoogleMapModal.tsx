import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import { getCoordinates } from "../../../../utils/coordinates";
import { GOOGLEMAP_KEY } from "../../../../utils/consts";

interface Coord {
  lat: number;
  lng: number;
}

const GoogleMapModal = ({
  show,
  onCloseClick,
  address,
}: {
  show: boolean;
  onCloseClick: () => void;
  address: string;
}) => {
  const [coordinates, setCoordinates] = useState<Coord | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLEMAP_KEY,
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  useEffect(() => {
    const fetchCord = async () => {
      const cord = await getCoordinates(false, address);
      setCoordinates(cord);
    };

    fetchCord();
  }, [address]);

  return (
    <Modal show={show} backdropClassName={"map-backdrop"} centered>
      <Modal.Header>
        <Modal.Title>Event Venue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoaded && coordinates && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinates}
            zoom={15}
          >
            <MarkerF position={coordinates} />
          </GoogleMap>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <Button variant="dark" onClick={onCloseClick}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GoogleMapModal;
