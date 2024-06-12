import React, { useContext } from "react";
import Search from "./Search.js";
import CustomCard from "./CustomCard.js";
import UserContext from "./UserContext.js";

function Companies({ companies, setCompanies }) {
  const currentUser = useContext(UserContext);
  if (currentUser) {
    return (
      <div className="Companies">
        <Search setResults={setCompanies} searchType={companies} />
        <CustomCard type="company" data={companies} />
      </div>
    );
  } else {
    return <p>Hmmm. I can't seem to find what you want.</p>;
  }
}

export default Companies;
