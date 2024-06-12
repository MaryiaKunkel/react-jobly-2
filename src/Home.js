import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function Home({ isLoggedIn, firstName }) {
  return (
    <div className="Home">
      <div class="App">
        <div class="pt-5">
          <div class="Homepage">
            <div class="container text-center">
              <h1 class="mb-4 fw-bold">Jobly</h1>
              <p class="lead">All the jobs in one, convenient place.</p>
              {isLoggedIn ? (
                <h2>Welcome Back, {firstName}!</h2>
              ) : (
                <div>
                  <Link to="/login">
                    <Button>Log in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
