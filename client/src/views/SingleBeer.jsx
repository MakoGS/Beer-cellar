import React, { Component } from "react";
import { loadSingle } from "../services/beer-api";

import Container from "react-bootstrap/Container";

export default class SingleBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer: null
    };
    this.loadBeer = this.loadBeer.bind(this);
  }
  loadBeer() {
    loadSingle(this.props.match.params.id)
      .then(beer => this.setState({ beer }))
      .catch(error => console.log(error));
  }
  componentDidMount() {
    this.loadBeer();
  }
  render() {
    const beer = this.state.beer;
    return (
      beer && (
        <div className="signin-bg">
          <div className="beer-square">
            <h1>{beer.name}'s beer</h1>
            <h2>
              {beer.style} - {beer.type}
            </h2>
            <p>{beer.description}</p>
            <p>
              {beer.abv} - {beer.country}
            </p>
          </div>
        </div>
      )
    );
  }
}
