import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NavbarView = props => {
  return (
    <Navbar
      expand="lg"
      bg="bg-transparent"
      variant="light"
      className="shadow-sm"
    >
      <Navbar.Brand>
        <Link
          to="/"
          className="nav-link"
          style={{
            fontFamily: "Crimson Text",
            fontSize: "0.8em"
          }}
        >
          BeerCellar
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>
      <Navbar.Collapse>
        <Nav className="ml-auto">
          {(!props.user && (
            <Fragment>
              <Link to="/" className="nav-link">
                Beers
              </Link>
              <Link to="/signin" className="nav-link">
                Sign In{" "}
              </Link>

              <Link to="/signup" className="nav-link">
                Sign Up{" "}
              </Link>
            </Fragment>
          )) || (
            <Fragment>
              <Link to={`/profile/${props.user.username}`} className="nav-link">
                {props.user && props.user.username}
              </Link>
              <Link to="/" className="nav-link">
                Beers
              </Link>
              <Link to="/addbeer" className="nav-link">
                Add Beer
              </Link>

              <Form inline onSubmit={props.signOut}>
                <Button
                  type="submit"
                  className="nav-link"
                  style={{ background: "none", border: "none" }}
                >
                  Sign Out
                </Button>
              </Form>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarView;
