import React from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import "../Signup/styles.css";

export default function SignUp() {
  return (
    <div>
      <Container>
        <Row className="vh-100 w-75 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-4">Sign up</h2>
                <div className="mb-3">
                  <Form>
                    <Form.Group className="mb-4" controlId="Name">
                      <Form.Label className="text-center">Name*</Form.Label>
                      <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label className="text-center">Email*</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label>Password*</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                      <div className="mt-2 text-secondary">
                        Must be at least 8 characters.
                      </div>
                    </Form.Group>

                    <Form.Group
                      className="mb-5"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid">
                      <Button
                        style={{ backgroundColor: "#7f56d9" }}
                        className="p-2 rounded-3 purple-button"
                        type="submit"
                      >
                        Create Account
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-5">
                    <p className="mb-0  text-center">
                      Already have an account?{" "}
                      <a
                        href="{''}"
                        className=" fw-bold purple-text text-decoration-none"
                      >
                        Log in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
