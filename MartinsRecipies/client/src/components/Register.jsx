import { useState, useContext } from 'react';

import AuthContext from '../contexts/authContext';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import styles from './assets/Register.module.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const { registerSubmitHandler } = useContext(AuthContext);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    if (username.length < 5 || password.length < 5) {
      setError('Username and password must be atleast 5 characters long.')
      return;
    }

    if (!isEmailValid(email)) {
      setError('Invalid email');
      return;
    }

    // Add registration logic here (e.g., call a registration service)
    registerSubmitHandler({ username, email, password })
    // console.log("Registration submitted with:", { username, email, password });

    // Clear the form fields after submission
    setUsername("");
    setEmail("");
    setPassword("");

    setError('');
  };

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className={styles.emailGroup}>
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
          Register
        </Button>
      </Form>
    </Container>
  );
}
