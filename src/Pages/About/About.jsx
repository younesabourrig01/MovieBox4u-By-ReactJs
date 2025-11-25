import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState } from "react";
import "./About.css";

export const About = () => {
  const [result, setResult] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "575e3bd3-3353-4ef0-b698-e90a605d9304");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="about">
      <Container className="py-5 text-light">
        <h2 className="mb-4 text-center">About This Website</h2>

        <Row className="g-4 mb-5">
          <Col md={6}>
            <Card
              className="bg-dark text-light border-0 shadow-sm p-3"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body>
                <Card.Title className="mb-3">
                  Where We Get the Movies ?
                </Card.Title>
                <Card.Text>
                  All movie data, posters, and categories are fetched directly
                  from the
                  <strong>
                    {" "}
                    TMDB API (
                    <a href="https://www.themoviedb.org/">The Movie Database</a>
                    )
                  </strong>
                  . This website uses the trending, popular, and genre endpoints
                  to provide real-time movie updates.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card
              className="bg-dark text-light border-0 shadow-sm p-3"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body>
                <Card.Title className="mb-3">Created By :</Card.Title>
                <Card.Text>
                  This project was created by <strong>Younes ABOURRIG</strong>,
                  a Junior full‑stack web developer passionate about building
                  modern web applications.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col md={6}>
            <Card
              className="bg-dark text-light border-0 shadow-sm p-3"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body>
                <Card.Title className="mb-3">Social Links</Card.Title>
                <Card.Text>
                  <a
                    href="https://www.linkedin.com/in/younes-abourrig-08103a338/"
                    className="d-block text-info"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/younesabourrig01"
                    className="d-block text-info"
                  >
                    GitHub
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card
              className="bg-dark text-light border-0 shadow-sm p-3"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body>
                <Card.Title className="mb-3">Contact :</Card.Title>
                <form onSubmit={onSubmit}>
                  <label>Your name</label>
                  <input
                    className="rounded"
                    type="text"
                    name="name"
                    placeholder="Enter Your name"
                    required
                  ></input>
                  <label>Phone Number</label>
                  <input
                    className="rounded"
                    type="tel"
                    name="phone"
                    placeholder="Enter Your Phone Number"
                    required
                  ></input>
                  <label>Your Message</label>
                  <textarea
                    className="rounded"
                    name="message"
                    rows="6"
                    placeholder="Message here..."
                    required
                  ></textarea>
                  <button className="btn btn-outline-warning" type="submit">
                    Submit Now
                  </button>
                </form>
                <span>{result}</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card
          className="bg-dark text-light border-0 shadow-sm p-4 text-center"
          style={{ borderRadius: "15px" }}
        >
          <Card.Body>
            <div
              style={{
                width: "100%",
                height: "250px",
                background: "#222",
                borderRadius: "10px",
              }}
            ></div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
