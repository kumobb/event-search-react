import React, { ChangeEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SearchKeyword from "./SearchKeyword";
import { IEvent } from "../../routes/Search";
import { getCoordinates } from "../../../utils/utils";
import axios from "axios";

interface SearchFormValues {
  keyword: string;
  distance: number;
  category: string;
  location: string;
  auto: boolean;
}

const SearchForm = ({
  onEventsChange,
  onClear,
}: {
  onEventsChange: (events: IEvent[]) => void;
  onClear: () => void;
}) => {
  const defaultFormValues = {
    keyword: "",
    distance: 10,
    category: "Default",
    location: "",
    auto: false,
  };

  const [formValues, setFormValues] =
    useState<SearchFormValues>(defaultFormValues);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const location = await getCoordinates(formValues.auto, formValues.location);

    if (!location) {
      onEventsChange([]);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/api/tickets", {
        params: {
          keyword: formValues.keyword,
          distance: formValues.distance,
          category: formValues.category,
          lat: location?.lat,
          lng: location?.lng,
        },
      });

      const data = response.data;
      onEventsChange(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeywordChange = (keyword: string) => {
    setFormValues({
      ...formValues,
      keyword,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;

    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleClear = () => {
    setFormValues(defaultFormValues);
    onClear();
  };

  return (
    <Container
      id="search-form-container"
      className="main-container blur-card rounded-4"
    >
      <Form id="search-form" className="px-2 py-5" onSubmit={handleSubmit}>
        <h1 className="mb-3 pb-3 border-bottom text-white text-center">
          Event Search
        </h1>

        <SearchKeyword
          onChange={handleKeywordChange}
          value={formValues.keyword}
        />

        <Row>
          <Col md={6}>
            <Form.Group controlId="distance" className="mb-3">
              <Form.Label>Distance</Form.Label>
              <Form.Control
                name="distance"
                type="number"
                value={formValues.distance}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="category" className="mb-3">
              <Form.Label>
                Category<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                name="category"
                value={formValues.category}
                onChange={(e) =>
                  handleInputChange(
                    e as unknown as ChangeEvent<HTMLInputElement>
                  )
                }
                required
              >
                <option>Default</option>
                <option>Music</option>
                <option>Sports</option>
                <option value="Arts">Arts & Theatre</option>
                <option>Film</option>
                <option>Miscellaneous</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="location" className="mb-3">
          <Form.Label>
            Location<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            name="location"
            type="text"
            value={formValues.auto ? "" : formValues.location}
            disabled={formValues.auto}
            required
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="auto" className="mb-3">
          <Form.Check
            name="auto"
            label="Auto-detect your location"
            checked={formValues.auto}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="danger" className="mx-1" type="submit">
            SUBMIT
          </Button>
          <Button variant="primary" className="mx-1" onClick={handleClear}>
            CLEAR
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SearchForm;
