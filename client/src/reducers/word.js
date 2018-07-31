import * as socketActions from '../actions/word';

const initState = {
  data: null,
  isFetching: false,
  errors: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case socketActions.GET_WORD.REQUEST:
      return {
        ...state,
        isFetching: true,
        errors: null,
      };
    case socketActions.GET_WORD.SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        errors: null,
      };
    case socketActions.GET_WORD.FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};
