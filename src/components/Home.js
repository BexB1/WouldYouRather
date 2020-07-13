import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { formatDate } from "../utils/helpers.js";
import { Button, Card, Container, Grid, Image, Tab } from "semantic-ui-react";

const QuestionWrapper = styled.div`
  margin-bottom: 15px;
`;

class Home extends Component {
  render() {
    const { questionsFiltered } = this.props;

    const panes = [
      {
        menuItem: "Unanswered",
        render: () => (
          <Tab.Pane attached={false}>
            {questionsFiltered.unansweredQuestions.length > 0 ? (
              questionsFiltered.unansweredQuestions.map((q) => (
                <QuestionWrapper key={q.id}>
                  <Link to={`/question/${q.id}`}>
                    <Card fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="mini"
                          src={q.author.avatarURL}
                        />
                        <Card.Header>{q.author} asks...</Card.Header>
                        <Card.Meta>{formatDate(q.timestamp)}</Card.Meta>
                        <Card.Description>Would you rather...</Card.Description>
                      </Card.Content>
                      <Button color="blue">Vote!</Button>
                    </Card>
                  </Link>
                </QuestionWrapper>
              ))
            ) : (
              <p>You've answered all the questions!</p>
            )}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Answered",
        render: () => (
          <Tab.Pane attached={false}>
            {questionsFiltered.answeredQuestions.map((q) => (
              <QuestionWrapper key={q.id}>
                <Link to={`/question/${q.id}`}>
                  <Card fluid>
                    <Card.Content>
                      <Image
                        floated="right"
                        size="mini"
                        src={q.author.avatarURL}
                      />
                      <Card.Header>{q.author} asks...</Card.Header>
                      <Card.Meta>{formatDate(q.timestamp)}</Card.Meta>
                      <Card.Description>Would you rather...</Card.Description>
                    </Card.Content>
                    <Button color="grey">View vote</Button>
                  </Card>
                </Link>
              </QuestionWrapper>
            ))}
          </Tab.Pane>
        ),
      },
    ];

    return (
      <Container>
        <h1>Would you rather...</h1>
        <Grid columns="two" centered>
          <Grid.Row>
            <Grid.Column>
              <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  let questionValues = Object.values(questions);
  const user = users[authedUser];
  const authedUserAnswers = user ? Object.keys(user.answers) : [];
  const authedUserQuestion = (q) => {
    return !user.questions.includes(q.id);
  };

  const answeredQuestions = questionValues
    .filter((q) => authedUserAnswers.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const unansweredQuestions = questionValues
    .filter((q) => !authedUserAnswers.includes(q.id))
    .filter((q) => authedUserQuestion(q))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questions,
    authedUserAnswers,
    questionsFiltered: {
      answeredQuestions,
      unansweredQuestions,
    },
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Home);
