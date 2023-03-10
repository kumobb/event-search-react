import React, { useState, useEffect, useMemo } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import "./typeahead.css";
import { Autocomplete, CircularProgress } from "@mui/material";
import { debounce } from "@mui/material/utils";

const SearchKeyword = ({
  onChange,
  value,
}: {
  onChange: (keyword: string) => void;
  value: string;
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useMemo(
    () =>
      debounce(async (keyword: string) => {
        setLoading(true);
        setOptions([]);
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/suggest`,
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
      }, 300),
    []
  );

  useEffect(() => {
    if (value.trim() === "") {
      setOptions([]);
      setLoading(false);

      return;
    }
    search(value);
  }, [value, search]);

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
      <Autocomplete
        autoComplete
        includeInputInList
        freeSolo
        loading={loading}
        options={options}
        inputValue={value}
        loadingText={<CircularProgress color="inherit" size={20} />}
        onChange={(event, newValue) => {
          if (!newValue) return;
          onChange(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          onChange(newInputValue);
        }}
        filterOptions={(x) => x}
        renderInput={(params) => {
          return (
            <div ref={params.InputProps.ref}>
              <input
                type="text"
                {...params.inputProps}
                className="form-control"
                required
              />
            </div>
          );
        }}
      />
    </Form.Group>
  );
};

export default SearchKeyword;
