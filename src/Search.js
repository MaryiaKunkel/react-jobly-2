import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import JoblyApi from "./api.js";

function Search({ setResults, searchType }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let results;
    if (searchType === "companies") {
      results = await JoblyApi.getListOfCompanies(searchInput);
    } else if (searchType === "jobs") {
      results = await JoblyApi.getListOfJobs(searchInput);
    }
    setResults(results);
  };
  return (
    <div className="Search">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="searchInput"
            id="searchInput"
            placeholder="Enter search term..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></Input>
          <Button type="submit">Sumbit</Button>
        </FormGroup>
      </Form>
    </div>
  );
}

export default Search;
