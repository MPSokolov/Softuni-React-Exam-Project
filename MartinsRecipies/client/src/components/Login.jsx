import { useState, useContext } from "react";

import { Form, Button, Container } from "react-bootstrap";
import AuthContext from "../contexts/authContext";
import styles from './assets/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginSubmitHandler } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add login logic here (e.g., call an authentication service)
    loginSubmitHandler({ email, password });
    // console.log("Login submitted with:", { email, password });

    // Clear the form fields after submission
    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className={styles.passwordGroup}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
