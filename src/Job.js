import React, { useContext, useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import UserContext from "./UserContext.js";
import { useParams } from "react-router-dom";
import JoblyApi from "./api.js";

function Job({ jobs }) {
  const { handle } = useParams();
  const currentUser = useContext(UserContext);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  console.log("currentUser:", currentUser.user);

  useEffect(() => {
    async function getUserApplication() {
      if (currentUser) {
        const user = await JoblyApi.getUser(currentUser.user.username);
        console.log("Applications: ", user.user.applications);
        setAppliedJobs(new Set(user.user.applications.map((app) => app.jobId)));
      }
    }
    getUserApplication();
  }, [currentUser]);

  const applyForJob = async (jobId) => {
    console.log(currentUser.user.username);
    console.log(jobId);
    try {
      const result = await JoblyApi.applyForJob(
        currentUser.user.username,
        jobId
      );
      console.log(result);
      setAppliedJobs((prevAppliedJobs) => new Set(prevAppliedJobs).add(jobId));
      console.log("Applications: ", currentUser.user.applications);
    } catch (err) {
      console.error("Error applying for job:", err);
    }
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
                <Button
                  type="submit"
                  onClick={() => applyForJob(job.id)}
                  disabled={appliedJobs.has(job.id)}
                >
                  {appliedJobs.has(job.id) ? "Applied" : "Apply"}
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
