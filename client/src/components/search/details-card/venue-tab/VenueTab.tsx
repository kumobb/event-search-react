import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ClampableSection from "./ClampableSection";
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
    <Container className="py-3 text-center details-tab">
      {!venueDetails ? (
        <div className="px-3 py-5">
          <p className="text-danger bg-white rounded-4">
            No venue details to show
          </p>
        </div>
      ) : (
        <>
          <Row className="line-clamp-2">
            <Col sm={12} md={6}>
              {venueDetails.name && (
                <ClampableSection name={"Name"} content={venueDetails.name} />
              )}

              {venueDetails.address && (
                <ClampableSection
                  name={"Address"}
                  content={venueDetails.address}
                />
              )}

              {venueDetails.number && (
                <ClampableSection
                  name={"Phone Number"}
                  content={venueDetails.number}
                />
              )}
            </Col>
            <Col sm={12} md={6}>
              {venueDetails.openHours && (
                <ClampableSection
                  name={"Open Hours"}
                  content={venueDetails.openHours}
                />
              )}

              {venueDetails.generalRule && (
                <ClampableSection
                  name={"General Rule"}
                  content={venueDetails.generalRule}
                />
              )}
              {venueDetails.childRule && (
                <ClampableSection
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
