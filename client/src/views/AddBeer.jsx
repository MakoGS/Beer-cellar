import React, { Component, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { createBeer } from "../services/beer-api";

export default class AddBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer: {
        name: "",
        description: "",
        type: "",
        style: "",
        country: "",
        abv: ""
      }
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.addBeer = this.addBeer.bind(this);
  }
  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      beer: { ...this.state.beer, [name]: value }
    });
  }

  addBeer(event) {
    event.preventDefault();
    createBeer(this.state.beer)
      .then(beer => {
        console.log(beer);
        this.props.history.push(`/`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="signin-bg">
        <Form onSubmit={this.addBeer}>
          <div className="signin-square">
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    id="beer-name"
                    name="name"
                    required
                    type="text"
                    placeholder="Name"
                    onChange={this.onValueChange}
                    value={this.state.beer.name}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    id="beer-country"
                    name="country"
                    required
                    placeholder="Country"
                    onChange={this.onValueChange}
                    value={this.state.beer.country}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="type"
                    onChange={this.onValueChange}
                    value={this.state.beer.type}
                  >
                    <option>Type...</option>
                    <option> Ale</option>
                    <option>Lager</option>
                    <option>Malt</option>
                    <option>Stout</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="style"
                    onChange={this.onValueChange}
                    value={this.state.beer.style}
                  >
                    <option>Style...</option>
                    <option> Amber</option>
                    <option>Blonde</option>
                    <option>Brown</option>
                    <option>Cream</option>
                    <option>Dark</option>
                    <option>Pale</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    id="beer-abv"
                    name="abv"
                    required
                    placeholder="ABV"
                    onChange={this.onValueChange}
                    value={this.state.beer.abv}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Control
                id="beer-description"
                name="description"
                required
                as="textarea"
                placeholder="Add a description"
                rows="3"
                onChange={this.onValueChange}
                value={this.state.beer.description}
              />
            </Form.Group>
            <Button type="submit" className="d-flex justify-content-center">
              Add Beer
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
