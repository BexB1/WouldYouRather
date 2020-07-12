import {
  ADD_QUESTION,
  ADD_ANSWER,
  RECEIVE_QUESTIONS,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ADD_ANSWER:
      const { authedUser, qid, answer } = action;
      const votes = state[qid][answer].votes;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: votes.concat(authedUser),
          },
        },
      };
    default:
      return state;
  }
}
