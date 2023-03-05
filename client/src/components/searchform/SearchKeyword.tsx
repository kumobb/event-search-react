import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchKeyword: React.FC<Props> = ({
  handleInputChange,
  value,
}: Props) => {
  return (
    <Form.Group controlId="keyword" className="mb-3">
      <Form.Label>
        Keyword
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      </Form.Label>
      <Form.Control
        name="keyword"
        type="text"
        value={value}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
  );
};

export default SearchKeyword;
