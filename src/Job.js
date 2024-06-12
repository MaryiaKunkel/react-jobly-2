import React, { useContext } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import UserContext from "./UserContext.js";
import { useParams } from "react-router-dom";
import JoblyApi from "./api.js";

function Job({ jobs }) {
  const { handle } = useParams();
  const currentUser = useContext(UserContext);
  const applyForJob = async () => {
    await JoblyApi.applyForJob(username, jobId);
  };
  if (currentUser) {
    return (
      <div className="Job">
        <ListGroup>
          {jobs
            .filter((job) => !handle || job.companyHandle === handle)
            .map((job) => (
              <ListGroupItem key={job.id}>
                <p>{job.title}</p>
                <p>{job.companyHandle}</p>
                <p>Salary: {job.salary}</p>
                <p>Equity: {job.equity}</p>
                <Button type="submit" onClick={applyForJob}>
                  Apply
                </Button>
              </ListGroupItem>
            ))}
        </ListGroup>
      </div>
    );
  } else {
    return <p>Hmmm. I can't seem to find what you want.</p>;
  }
}

export default Job;
