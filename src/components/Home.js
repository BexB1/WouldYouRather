import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Question from "./questions/Question";
import { formatDate } from "../utils/helpers.js";
import { Card, Container, Grid, Image, Tab } from 'semantic-ui-react'

export class Home extends Component {
  render() {
    const { questions, answeredQuestions, unansweredQuestions } = this.props;

    const panes = [
      {
        menuItem: 'Unanswered',
        render: () =>
          <Tab.Pane attached={false}>
            <div>
              {unansweredQuestions.map((q) => (
                <Link to={`/question/${q.id}`} key={q.id}>
                  <Card>
                    <Card.Content>
                      <Image floated="right" size="mini" src={q.author.avatarURL} />
                      <Card.Header>{q.author} asks...</Card.Header>
                      <Card.Meta>{formatDate(q.timestamp)}</Card.Meta>
                      <Card.Description>Would you rather...</Card.Description>
                    </Card.Content>
                  </Card>
                </Link>
              ))}
            </div>
          </Tab.Pane>
      },
      {
        menuItem: 'Answered',
        render: () => 
          <Tab.Pane attached={false}>
            <div>
              {answeredQuestions.map((q) => (
                <Link to={`/question/${q.id}`} key={q.id}>
                  <Question id={q.id} />
                </Link>
              ))}
            </div>
          </Tab.Pane>,
      },
    ]

    return (
      <Container>
      <h1>Would you rather...</h1>
      <Grid columns='one' centered>
        <Grid.Row>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Container>
    );
  }
}

// questions is the array of questions from the store
// questionIds is an array of question.Ids, sorted by question.timestamp,

function mapStateToProps({ questions, users, authedUser }) {
  let questionValues = Object.values(questions);
  const user = users[authedUser];
  const authedUserAnswers = user ? Object.keys(user.answers) : [];

  const answeredQuestions = questionValues
    .filter((q) => authedUserAnswers.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const unansweredQuestions = questionValues
    .filter((q) => !authedUserAnswers.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questions,
    answeredQuestions: answeredQuestions,
    unansweredQuestions: unansweredQuestions,
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Home);
