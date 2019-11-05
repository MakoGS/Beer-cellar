import React, { Component, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";

import { loadAllBeers, loadByType } from "./../services/beer-api";

import BeersCard from "../components/BeersCard";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      beers: null,
      beerSearch: "",
      beerName: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.loadByTypes = this.loadByTypes.bind(this);
  }
  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }
  loadBeers() {
    loadAllBeers()
      .then(beers => this.setState({ beers }))
      .catch(error => console.log(error));
  }
  loadByTypes(event) {
    event.preventDefault();
    loadByType(this.state.beerSearch)
      .then(beers => this.setState({ beers }))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.loadBeers();
  }

  render() {
    return (
      <Fragment>
        <div className="header-bg">
          <h1 className="header-text">BOLD's Beer Cellar</h1>
        </div>
        <Container>
          <Row className="py-5">
            <Col sm={1}></Col>
            <Col sm={5}>
              <Form inline onSubmit={this.loadByTypes}>
                <Form.Control
                  as="select"
                  name="beerSearch"
                  required
                  onChange={this.onValueChange}
                  value={this.state.beerSearch}
                >
                  <option>Type...</option>
                  <option>Ale</option>
                  <option>Lager</option>
                  <option>Malt</option>
                  <option>Stout</option>
                </Form.Control>
                <Button type="submit" className="btn ml-2 shadow">
                  Find by type!
                </Button>
              </Form>
            </Col>
            <Col sm={1}></Col>
            <Col sm={5}>
              <Form inline onSubmit={this.loadByTypes}>
                <Form.Control
                  as="select"
                  name="beerSearch"
                  required
                  onChange={this.onValueChange}
                  value={this.state.beerSearch}
                >
                  <option>Style...</option>
                  <option> Amber</option>
                  <option>Blonde</option>
                  <option>Brown</option>
                  <option>Cream</option>
                  <option>Dark</option>
                  <option>Pale</option>
                </Form.Control>
                <Button type="submit" className="btn ml-2 shadow">
                  Find by style!
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
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
      </Fragment>
    );
  }
}
