import React, { Component } from "react";
import "./route.css";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="pageBody landing">
        <Container>
          <h3>
            Looking for the best places to dine and hangout in New York City?
          </h3>
          <div></div>
        </Container>

        <Container style={{ paddingTop: "10%", paddingBottom: "10%" }}>
          <h1>Passion is the foundation for the quality of every job we do.</h1>
          <br />
          <hr className="my-2" />
          <br />
          <Link className="toPage" to="/about">
            Who We Are
          </Link>
        </Container>
      </div>
    );
  }
}

export default Home;
