import { combineEpics } from 'redux-observable';

import words from './words';
import infos from './infos';
import translations from './translations';

export default combineEpics(
  words,
  infos,
  translations,
);
