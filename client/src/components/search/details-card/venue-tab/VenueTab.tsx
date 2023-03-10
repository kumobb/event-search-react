import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ClamppableSection from "./ClamppableSection";
import GoogleMapModal from "./GoogleMapModal";

interface IVenueDetails {
  name: string;
  address: string;
  number: string;
  openHours: string;
  generalRule: string;
  childRule: string;
}

const VenueTab = ({ venueDetails }: { venueDetails: IVenueDetails | null }) => {
  const [showMap, setShowMap] = useState(false);

  const openMap = () => {
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
  };

  return (
    <Container className="py-4 text-center details-tab">
      {!venueDetails ? (
        <div className="py-5">
          <p className="text-danger bg-white rounded-4">
            No event details to show
          </p>
        </div>
      ) : (
        <>
          <Row className="line-clamp-2">
            <Col sm={12} md={6}>
              <h4>Name</h4>
              <p>{venueDetails.name}</p>

              <h4>Address</h4>
              <p>{venueDetails.address}</p>

              {venueDetails.number && (
                <ClamppableSection
                  name={"Phone Number"}
                  content={venueDetails.number}
                />
              )}
            </Col>
            <Col sm={12} md={6}>
              {venueDetails.openHours && (
                <ClamppableSection
                  name={"Open Hours"}
                  content={venueDetails.openHours}
                />
              )}

              {venueDetails.generalRule && (
                <ClamppableSection
                  name={"General Rule"}
                  content={venueDetails.generalRule}
                />
              )}
              {venueDetails.childRule && (
                <ClamppableSection
                  name={"Child Rule"}
                  content={venueDetails.childRule}
                />
              )}
            </Col>
          </Row>
          <Button className="mt-4" variant="danger" onClick={openMap}>
            Show venue on Google map
          </Button>
          <GoogleMapModal
            show={showMap}
            onCloseClick={closeMap}
            address={venueDetails.address}
          />
        </>
      )}
    </Container>
  );
};

export default VenueTab;
export type { IVenueDetails };
