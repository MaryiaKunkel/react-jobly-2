import React from "react";
import Search from "./Search.js";
import CustomCard from "./CustomCard.js";

function Jobs({ jobs, setJobs }) {
  return (
    <div className="Jobs">
      <Search setResults={setJobs} searchType={jobs} />
      <CustomCard type="job" data={jobs} />
    </div>
  );
}

export default Jobs;
