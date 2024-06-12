import React, { useState } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import JoblyApi from "./api.js";
import { useNavigate } from "react-router-dom";

function Signup({ handleSignUp, isLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
    };
    const token = await JoblyApi.signUp(user);
    handleSignUp(user, token);
    isLoggedIn = true;
    navigate("/");
  };
  return (
    <div className="Signup">
      <h3>Sign Up</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Label for="firstName">First name</Label>
          <Input
            type="firstName"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Input>
          <Label for="lastName">Last name</Label>
          <Input
            type="lastName"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Input>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Button type="submit">Submit</Button>
        </FormGroup>
      </Form>
    </div>
  );
}

export default Signup;
