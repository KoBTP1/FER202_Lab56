
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:9000/accounts"
      );

      const account = response.data.find(
        (acc) =>
          acc.email === email &&
          acc.password === password
      );

      if (!account) {
        setError("Invalid email or password!");
        return;
      }

      if (account.status.toLowerCase() === "inactive") {
        setError("Your account is inactive!");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: account.id,
          email: account.email,
          role: account.role,
          status: account.status,
        })
      );

      navigate("/subjects");

    } catch (error) {
      console.error(error);
      setError("Tài khoản đã bị khóa!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "500px" }} className="p-4">
        <Card.Title className="text-center fw-bold fs-4 mb-4">
          Sign In
        </Card.Title>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email of student or lecturer"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && (
            <p className="text-danger text-center">
              {error}
            </p>
          )}

          <div className="d-grid">
            <Button type="submit" variant="primary">
              Login
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
