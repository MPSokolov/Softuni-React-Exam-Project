import { useState, useContext, useEffect } from "react";

import { Form, Button, Container, Alert } from "react-bootstrap";
import AuthContext from "../contexts/authContext";
import styles from './assets/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginSubmitHandler, errors } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    await loginSubmitHandler({ email, password });

    setEmail("");
    setPassword("");

    setError('');
  };

  
  useEffect(() => {
    // This block will run when the error state in the context changes
    if (errors) {
      console.log('Error during login:', errors);
      // Handle the error as needed (e.g., display an alert)
    }
  }, [errors]);

  return (
    <Container>
      <Form className={styles.form} onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {errors && <Alert variant="danger">{errors.message}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            // required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className={styles.passwordGroup}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            // required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
