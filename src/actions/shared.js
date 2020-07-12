import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { receiveQuestions, addQuestion } from "./questions";
import { receiveUsers, saveUserAnswer } from "./users";
import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading";


const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_ID));
    });
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

export function handleAddAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(saveUserAnswer(authedUser, qid, answer))
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
  }
}