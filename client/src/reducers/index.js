import { combineReducers } from 'redux';
import words from './words';

const appReducer = combineReducers({
  words,
});


export default (state, action) => appReducer(state, action);
