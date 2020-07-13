import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { receiveQuestions, addQuestion, addAnswer } from "./questions";
import { receiveUsers, addQuestionToUser, saveUserAnswer } from "./users";
import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

// const AUTHED_ID = "";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      dispatch(hideLoading());
    });
  };
}

export function handleUserLogin(id) {
  return (dispatch) => {
    dispatch(setAuthedUser(id));
  };
}

export function handleAddQuestion(qid, optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());
    dispatch(addQuestionToUser({ authedUser, qid }));

    return saveQuestion({ optionOneText, optionTwoText, author: authedUser })
      .then((question) => dispatch(addQuestion(question)))
      .then(dispatch(hideLoading()));
  };
}

export function handleAddAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(addAnswer({ authedUser, qid, answer }));
    dispatch(saveUserAnswer({ authedUser, qid, answer }));
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    });
  };
}
