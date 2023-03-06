import React, { useState, useCallback, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { AsyncTypeahead, Hint } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import "./typeahead.css";
import Typeahead from "react-bootstrap-typeahead/types/core/Typeahead";

const SearchKeyword = ({
  onChange,
  value,
}: {
  onChange: (keyword: string) => void;
  value: string;
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const typeaheadRef = useRef<Typeahead>(null);

  useEffect(() => {
    if (value === "") {
      typeaheadRef.current?.clear();
    }
  }, [value]);

  const handleSearch = async (keyword: string) => {
    setOpen(true);
    setLoading(true);
    try {
      const response: AxiosResponse<string[]> = await axios.get(
        "http://localhost:3001/api/suggest",
        {
          params: {
            keyword,
          },
        }
      );
      setOptions(response.data ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const _handleSearch = useCallback(handleSearch, []);

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
      <AsyncTypeahead
        ref={typeaheadRef}
        className="typeahead"
        id="search-keyword"
        minLength={1}
        filterBy={() => true}
        open={open}
        options={options}
        isLoading={loading}
        onSearch={_handleSearch}
        onChange={(selected) => {
          setOpen(false);
          onChange(selected[0] as string);
        }}
        onInputChange={(text, event) => {
          onChange(event.target.value);
        }}
        onBlur={() => setOpen(false)}
        renderInput={({ inputRef, referenceElementRef, ...inputProps }) => {
          return (
            <Hint>
              <Form.Control
                {...inputProps}
                name="keyword"
                value={inputProps.value as string}
                ref={(node: HTMLInputElement) => {
                  inputRef(node);
                  referenceElementRef(node);
                }}
                required
              />
            </Hint>
          );
        }}
      />
    </Form.Group>
  );
};

export default SearchKeyword;
