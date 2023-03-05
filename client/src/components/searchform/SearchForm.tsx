import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SearchKeyword from "./SearchKeyword";

interface SearchFormValues {
  keyword: string;
  distance: number;
  category: string;
  location: string;
  auto: boolean;
}

const SearchForm: React.FC = () => {
  const defaultFormValues: SearchFormValues = {
    keyword: "",
    distance: 10,
    category: "Default",
    location: "",
    auto: false,
  };

  const [formValues, setFormValues] =
    useState<SearchFormValues>(defaultFormValues);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`
      keyword: ${formValues.keyword}
      distance: ${formValues.distance}
      category: ${formValues.category}
      location: ${formValues.location}
      auto: ${formValues.auto}
    `);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;

    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleClear = () => {
    setFormValues(defaultFormValues);
  };

  return (
    <Container id="search-form-container" className="blur-card">
      <Form id="search-form" className="px-2 py-5" onSubmit={handleSubmit}>
        <h1 id="search-form-title" className="mb-3 pb-3">
          Event Search
        </h1>

        <SearchKeyword
          handleInputChange={handleInputChange}
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
              <Form.Control
                as="select"
                name="category"
                value={formValues.category}
                onChange={handleInputChange}
                required
              >
                <option>Default</option>
                <option>Music</option>
                <option>Sports</option>
                <option value="Arts">Arts & Theatre</option>
                <option>Film</option>
                <option>Miscellaneous</option>
              </Form.Control>
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
