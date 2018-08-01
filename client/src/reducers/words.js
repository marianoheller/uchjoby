import * as wordsActions from '../actions/words';

const MAX_LEN = 20;

const initState = {
  data: [],
  isFetching: false,
  errors: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case wordsActions.GET_WORDS.REQUEST:
      return {
        ...state,
        isFetching: true,
        errors: null,
      };
    case wordsActions.GET_WORDS.SUCCESS:
      const newData = [...state.data, ...action.data];
      const len = newData.length;
      return {
        ...state,
        data: len > MAX_LEN ? newData.slice(len - MAX_LEN, len - 1) : newData,
        isFetching: false,
        errors: null,
      };
    case wordsActions.GET_WORDS.FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};
