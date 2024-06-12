import React, { useState } from "react";
import JoblyApi from "./api.js";

import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Login({ handleLogIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await JoblyApi.logIn({ username, password });
    setUsername(username);
    setPassword(password);
    setUser({
      username: username,
      password: password,
    });
    handleLogIn(user, token);
    navigate("/");
  };
  return (
    <div className="Login">
      <h3>Log In</h3>

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
          <Button type="submit">Submit</Button>
        </FormGroup>
      </Form>
    </div>
  );
}

export default Login;
