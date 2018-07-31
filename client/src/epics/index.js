import { combineEpics } from 'redux-observable';

import words from './words';

export default combineEpics(
  words,
);
