import React from "react";
import "./App.css";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <h1>Would you Rather?</h1>
      <section>
        <h2>Unanswered Questions</h2>
      </section>
      <section>
        <h2>Answered Questions</h2>
      </section>
      <button>New Question</button>
    </div>
  );
}

export default App;
