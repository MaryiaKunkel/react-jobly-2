import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import JoblyApi from "./api.js";
import useLocalStorage from "./useLocalStorage";
import UserContext from "./UserContext.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

import Navbar from "./Navbar.js";
import Home from "./Home.js";
import Companies from "./Companies.js";
import Jobs from "./Jobs.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Profile from "./Profile.js";

function Main() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useLocalStorage("token", "");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let companies = await JoblyApi.getListOfCompanies();
      let jobs = await JoblyApi.getListOfJobs();
      setCompanies(companies);
      setJobs(jobs);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleLogIn = (user, token) => {
    setIsLoggedIn(true);
    setUsername(user.username);
    setToken(token);
    setCurrentUser(user);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUsername("");
    setToken("");
  };

  const handleSignUp = (user, token) => {
    setIsLoggedIn(true);
    setUsername(user.username);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPassword(user.password);
    setEmail(user.email);
    setToken(token);
    setCurrentUser({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { username } = decodedToken;

        if (username) {
          async function fetchCurrentUser() {
            try {
              const user = await JoblyApi.getUser(username);
              setCurrentUser(user);
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          }
          fetchCurrentUser();
          setIsLoggedIn(true);
        } else {
          console.error("No username found in token.");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      setCurrentUser(null);
      setIsLoggedIn(false);
    }
  }, [token]);
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <UserContext.Provider value={currentUser}>
      <div className="Main">
        <BrowserRouter>
          <Navbar
            isLoggedIn={isLoggedIn}
            username={username}
            handleLogIn={handleLogIn}
            handleLogOut={handleLogOut}
          />
          <main>
            <Routes>
              <Route
                path="/"
                element={<Home isLoggedIn={isLoggedIn} firstName={firstName} />}
              />
              <Route
                path="/companies"
                element={
                  <Companies
                    companies={companies}
                    setCompanies={setCompanies}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/companies/:handle"
                element={
                  <Jobs
                    companies={companies}
                    jobs={jobs}
                    currentUser={currentUser}
                  />
                }
              />
              <Route path="/jobs" element={<Jobs jobs={jobs} />} />
              <Route
                path="/login"
                element={<Login handleLogIn={handleLogIn} />}
              />
              <Route
                path="/signup"
                element={
                  <Signup handleSignUp={handleSignUp} isLoggedIn={isLoggedIn} />
                }
              />
              <Route path="/profile" element={<Profile user={currentUser} />} />
              <Route
                path="*"
                element={<p>Hmmm. I can't seem to find what you want.</p>}
              />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default Main;
