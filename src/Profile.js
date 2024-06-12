import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import UserContext from "./UserContext.js";
import { useNavigate } from "react-router-dom";

function Profile() {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(currentUser.user.firstName);
  const [lastName, setLastName] = useState(currentUser.user.lastName);
  const [email, setEmail] = useState(currentUser.user.email);

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    currentUser.user.firstName = firstName;
    currentUser.user.lastName = lastName;
    currentUser.user.email = email;
    navigate("/");
  };

  if (currentUser) {
    return (
      <div className="Profile">
        <h3>Profile</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username:</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={currentUser.user.username}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First name:</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last name:</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  } else {
    return <p>Hmmm. I can't seem to find what you want.</p>;
  }
}

export default Profile;
