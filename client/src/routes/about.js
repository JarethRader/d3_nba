import React, { Component } from "react";
import "./route.css";
import { Container, Row, Col } from "reactstrap";

class About extends Component {
  render() {
    return (
      <div className="pageBody about">
        <Container
          style={{
            textAlign: "center",
            paddingTop: "10%",
            paddingBottom: "5%"
          }}
        >
          <Row>
            <Col sm="6" style={{ textAlign: "left", paddingTop: "25%" }}>
              <h3>
                The Dynamic Duo <br /> behind this NYC Guide
              </h3>
            </Col>
            <Col sm="6" style={{ textAlign: "center" }}>
              <img
                width="90%"
                src={require("../components/resources/JerpNLen.png")}
                alt=""
              ></img>
            </Col>
          </Row>
        </Container>
        <hr className="my-2" />
        <Container style={{ paddingTop: "5%" }}>
          <Row>
            <Col className="aboutPara" sm="6">
              <p>
                Lorem ipsum dolor sit amet, viderer sensibus at cum, sea atqui
                complectitur et. Ad porro putant maluisset his. His idque quando
                ea. Ne cum antiopam periculis, quidam nusquam fastidii ad has,
                possit adipiscing duo ea. No vis zril iudico, augue accusam sea
                te. Ridens iracundia cu est. Accusam instructior per te, at
                novum corrumpit sit. Aperiri singulis mei no, pri esse ipsum
                moderatius ut. Iisque sententiae qui in. Nec atqui impedit at,
                no cum possit facete efficiantur, purto illum convenire in pri.
                Debitis quaestio conclusionemque at quo, an esse quando vim. Pri
                saepe adolescens eu. Nihil facilisis usu an. Meliore interesset
                nec ea, nobis deleniti eam ad. Sit id suscipit forensibus, mel
                ei elit praesent evertitur. Soluta persequeris eum ne. Noster
                iisque per at.
              </p>
            </Col>
            <Col sm="6">
              <img
                src={require("../components/resources/nicCage.jpg")}
                alt="Image of Jethary"
              />
            </Col>
          </Row>
          <br />
          <hr className="my-2" />
          <br />
          <Row>
            <Col sm="6">
              <img
                src={require("../components/resources/nicCage.jpg")}
                alt="Image Of Lenny"
              />
            </Col>
            <Col className="aboutPara" sm="6">
              <p>
                Lorem ipsum dolor sit amet, viderer sensibus at cum, sea atqui
                complectitur et. Ad porro putant maluisset his. His idque quando
                ea. Ne cum antiopam periculis, quidam nusquam fastidii ad has,
                possit adipiscing duo ea. No vis zril iudico, augue accusam sea
                te. Ridens iracundia cu est. Accusam instructior per te, at
                novum corrumpit sit. Aperiri singulis mei no, pri esse ipsum
                moderatius ut. Iisque sententiae qui in. Nec atqui impedit at,
                no cum possit facete efficiantur, purto illum convenire in pri.
                Debitis quaestio conclusionemque at quo, an esse quando vim. Pri
                saepe adolescens eu. Nihil facilisis usu an. Meliore interesset
                nec ea, nobis deleniti eam ad. Sit id suscipit forensibus, mel
                ei elit praesent evertitur. Soluta persequeris eum ne. Noster
                iisque per at.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default About;
