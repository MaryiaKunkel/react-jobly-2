import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import UserContext from "./UserContext.js";

function Copmany({ companies }) {
  const currentUser = useContext(UserContext);
  if (currentUser) {
    return (
      <div className="Copmany">
        <ListGroup>
          {companies.map((company) => (
            <Link to={`/companies/${company.handle}`} key={company.handle}>
              <ListGroupItem>
                <p>{company.name}</p>
                <p>{company.description}</p>
                <img src={company.logoUrl} alt={company.name} />
              </ListGroupItem>
            </Link>
          ))}
        </ListGroup>
      </div>
    );
  } else {
    return <p>Hmmm. I can't seem to find what you want.</p>;
  }
}

export default Copmany;
