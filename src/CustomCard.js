import React, { useContext } from "react";
import Company from "./Company.js";
import Job from "./Job.js";
import UserContext from "./UserContext.js";

import { Card, CardBody } from "reactstrap";

function CustomCard({ type, data }) {
  const currentUser = useContext(UserContext);
  if (currentUser) {
    return (
      <div className="CustomCard">
        <Card>
          <CardBody>
            {type === "company" && <Company companies={data} />}
            {type === "job" && <Job jobs={data} />}
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <p>Hmmm. I can't seem to find what you want.</p>;
  }
}

export default CustomCard;
