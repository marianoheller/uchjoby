import { combineReducers } from 'redux';
import word from './word';

const appReducer = combineReducers({
  word,
});


export default (state, action) => appReducer(state, action);
