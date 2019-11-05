import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeView from "./views/Home";
import SignUpView from "./views/SignUp";
import SignInView from "./views/SignIn";
import ErrorView from "./views/Error";
import ProfileView from "./views/Profile";
import CatchAllView from "./views/CatchAll";
import AddBeerView from "./views/AddBeer";
import SingleBeerView from "./views/SingleBeer";
import NavbarView from "./components/Navbar";

import { signOut, verify } from "./services/auth-api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false
    };
    this.uploadUser = this.uploadUser.bind(this);
    this.signOut = this.signOut.bind(this);
    this.verifyAuthenticated = this.verifyAuthenticated.bind(this);
    this.verifyUnauthenticated = this.verifyUnauthenticated.bind(this);
  }
  componentDidMount() {
    verify()
      .then(user => {
        if (user) {
          this.setState({
            ...(user && { user }),
            loaded: true
          });
        } else {
          this.setState({
            loaded: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  uploadUser(user) {
    this.setState({
      user
    });
  }
  signOut() {
    signOut()
      .then(() => {
        this.setState({
          user: null
        });
        this.props.history.push("/auth/signup");
      })
      .catch(error => {
        console.log(error);
      });
  }

  verifyAuthenticated() {
    return !!this.state.user;
  }

  verifyUnauthenticated() {
    return !this.state.user;
  }
  render() {
    return (
      <Fragment>
        <Router>
          <NavbarView user={this.state.user} signOut={this.signOut} />
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <HomeView
                  {...props}
                  uploadUser={this.uploadUser}
                  user={this.state.user}
                />
              )}
            />

            <Route
              path="/signin"
              render={props => (
                <SignInView {...props} exact uploadUser={this.uploadUser} />
              )}
            />
            <Route
              path="/signup"
              render={props => (
                <SignUpView {...props} exact uploadUser={this.uploadUser} />
              )}
            />
            <Route
              path="/beer/:id"
              render={props => <SingleBeerView {...props} exact />}
            />
            <Route
              path="/addbeer"
              render={props => <AddBeerView {...props} exact />}
            />
            <Route
              path="/profile/:username"
              render={props => (
                <ProfileView {...props} exact user={this.state.user} />
              )}
            />
            <Route path="/error/:code" component={ErrorView} />
            <Route path="/" component={CatchAllView} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
