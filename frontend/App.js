import "regenerator-runtime/runtime";
import React from "react";
import "./assets/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Boostrap Components
import {
  Container,
  Row,
  Nav,
  Navbar,
  Card,
  NavDropdown,
} from "react-bootstrap";

// React Router Tools
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import Task from "./Components/Task";
import Transactions from "./Components/Transaction";

import { login, logout } from "./assets/js/near/utils";


export default function App() {
  return (
    <div>
      <Router>
        <Navbar bg="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img
                className="logo"
                src="https://cryptologotypes.com/img/logos/basic-attention-token/basic-attention-token-bat-logo.svg"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav.Link className="textWhite mediumText signin" href="/">
                Home
              </Nav.Link>
              <Nav.Link
                className="textWhite mediumText signin"
                href="/transactions"
              >
                Dashboard
              </Nav.Link>
              {window.walletConnection.isSignedIn() ? (
                <Nav.Link
                  className="textWhite mediumText userId signin"
                  onClick={
                    window.walletConnection.isSignedIn() ? logout : login
                  }
                >
                  {window.walletConnection.isSignedIn() ? window.accountId : ""}
                </Nav.Link>
              ) : (
                ""
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>

       

    {/* Manager Login */}

        <Container>

        <div className="heading">Task Creator</div>
        
          {window.walletConnection.isSignedIn() ? (
            <Row>
              <div>
                {window.location.pathname === "/transactions" ? (
                  <Transactions />
                ) : (
                  <Task />
                )}
              </div>
            </Row>
          ) : (
            <Row>
              <Card style={{ marginTop: "100px", borderRadius: "30px" }}>
                <Card.Body>
                  <Card.Title className="signin">
                    Sign-in to Manager Dashboard to Create Task
                  </Card.Title>
                </Card.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    paddingBottom: "10px",
                  }}
                >
                  <button
                    className="mediumText userId signin"
                    style={{ width: "180px", height: "55px", color: "#000" }}
                    onClick={
                      window.walletConnection.isSignedIn() ? logout : login
                    }
                  >
                    {window.walletConnection.isSignedIn()
                      ? window.accountId
                      : "Manager Login"}
                  </button>
                </div>
              </Card>

              {/* Explorer */}

              <Card style={{ marginTop: "70px", borderRadius: "30px" }}>
                <Card.Body>
                  <Card.Title className="signin">
                    View Task on Near Explorer
                  </Card.Title>
                </Card.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    paddingBottom: "10px",
                  }}
                >
                  <button
                    className=" mediumText userId signin"
                    style={{ width: "190px", height: "55px" }}
                    onClick={() =>
                      window.open(
                        "https://explorer.testnet.near.org/",
                        "_blank"
                      )
                    }
                  >
                    Near Explorer
                  </button>
                </div>
              </Card>
            </Row>
          )}
        </Container>
      </Router>
    </div>
  );
}
