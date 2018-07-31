import { combineEpics } from 'redux-observable';

import word from './word';

export default combineEpics(
  word,
);
