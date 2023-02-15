import { React, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, singinGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectPath);
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
  /*** other methods  without context provider   */
  const handleWithoutContextProvider = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data)
      navigate(redirectPath);
    })
  }
  /** other methods  without context provider **/


  async function handleGoogle(e) {
    try {
      setError("");
      setLoading(true);
      await singinGoogle()
      navigate(redirectPath);

    } catch (error) {
      setError("Failed to log in");
    }
  }


  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control id="email" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Log In
            </Button>
            <Button disabled={loading} onClick={handleGoogle} className="w-100 mt-3" type="submit">
              Log In With Google
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
