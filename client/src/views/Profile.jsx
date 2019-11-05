import React, { Component } from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";

import { loadUserBeers } from "../services/beer-api";
import BeersCard from "../components/BeersCard";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: null
    };
    this.loadBeers = this.loadBeers.bind(this);
  }
  loadBeers() {
    loadUserBeers(this.props.match.params.username)
      .then(beers => {
        this.setState({
          ...this.state,
          beers
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadBeers();
  }

  render() {
    const user = this.props.user;

    return (
      user && (
        <Container>
          <h2>Welcome {user.username}</h2>
          <p>You have uploaded the following beers:</p>
          <p>
            Click <Link to="/addbeer">here</Link> to add more
          </p>
          {(this.state.beers && (
            <Col sm={12}>
              <CardGroup className="card-set">
                {this.state.beers.map(beer => (
                  <BeersCard beer={beer} />
                ))}
              </CardGroup>
            </Col>
          )) || (
            <Col sm={12}>
              <h1>NO BEERS</h1>
            </Col>
          )}
        </Container>
      )
    );
  }
}
