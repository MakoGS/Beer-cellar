import React, { Component, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import { signIn } from "./../services/auth-api";

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  signIn(event) {
    event.preventDefault();
    const { email, password } = this.state;
    signIn({ email, password })
      .then(user => {
        this.props.uploadUser(user);
        this.props.history.push(`/profile/${user.username}`);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <Fragment>
        <div className="signin-bg">
          <Col sm={3}>
            <div className="signin-square">
              <Row>
                <Form onSubmit={this.signIn}>
                  <Form.Group>
                    <Form.Control
                      id="sign-up-email"
                      name="email"
                      required
                      type="email"
                      placeholder="email"
                      onChange={this.onValueChange}
                      value={this.state.email}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      id="sign-up-password"
                      name="password"
                      required
                      type="password"
                      placeholder="Password"
                      onChange={this.onValueChange}
                      value={this.state.password}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="d-flex justify-content-center"
                  >
                    Sign In
                  </Button>
                </Form>
                <div>
                  {" "}
                  Not a member? <Link to="/signup">Sign up</Link>
                </div>
              </Row>
            </div>
          </Col>
        </div>
      </Fragment>
    );
  }
}
