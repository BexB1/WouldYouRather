import { saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";
export const TOGGLE_VOTES = "TOGGLE_VOTES";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({ optionOneText, optionTwoText, author: authedUser })
      .then((question) => dispatch(addQuestion(question)))
      .then(dispatch(hideLoading()));
  }
}

function toggleVotes({ id, hasVotes }) {
  return {
    type: TOGGLE_VOTES,
    id,
    hasVotes,
  };
}
