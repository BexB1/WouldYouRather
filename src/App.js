import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="App">
          <Nav />
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/leaderboard" exact component={Leaderboard} />
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
