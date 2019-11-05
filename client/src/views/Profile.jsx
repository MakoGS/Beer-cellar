import React, { Component } from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardColumns from "react-bootstrap/CardColumns";
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
      (user && (
        <Container>
          <h2>Welcome {user.username}</h2>
          <p>You have upload the following beers:</p>
          <p>
            Click <Link to="/addbeer">here</Link> to add more
          </p>
          {(this.state.beers && (
            <CardColumns>
              <div className="card-set">
                {this.state.beers.map(beer => (
                  <BeersCard beer={beer} />
                ))}
              </div>
            </CardColumns>
          )) || (
            <Container>
              <h2>YOU HAVE NO BEERS</h2>
              <p>
                Click <Link to="/addbeer">here</Link> to add more
              </p>
            </Container>
          )}
        </Container>
      )) || (
        <Container>
          {(this.state.beers && (
            <Container>
              <h2>{this.props.match.params.username}'s profile</h2>
              <p>
                {this.props.match.params.username} has upload the following
                beers:
              </p>

              <div className="card-set">
                <CardColumns>
                  {this.state.beers.map(beer => (
                    <BeersCard beer={beer} />
                  ))}
                </CardColumns>
              </div>
            </Container>
          )) || <h2>{this.props.match.params.username} HAS NO BEERS</h2>}
        </Container>
      )
    );
  }
}
