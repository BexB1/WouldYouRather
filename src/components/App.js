import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "../App.css";

import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./questions/new";
import ShowQuestion from "./questions/show";
import { handleInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Home} />
                <Route path="/question/:id" exact component={ShowQuestion} />
                <Route path="/leaderboard" exact component={Leaderboard} />
                <Route path="/add" exact component={NewQuestion} />
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
