import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "../App.css";

import Nav from "./Nav";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./questions/new";
import { handleInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div className="App">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Home} />
                <Route path="/leaderboard" exact component={Leaderboard} />
                <Route path="/new" exact component={NewQuestion} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
