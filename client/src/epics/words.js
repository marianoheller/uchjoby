import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import axios from 'axios';

import * as wordsActions from '../actions/words';
import { MAX_WORDS_BUFF } from '../config';



const getWordsRequestEpic = (action$, state$) => action$
  .ofType(wordsActions.GET_WORDS.REQUEST)
  .switchMap(action => (
    Observable.from(
      axios.get('/api/word/random', {
        params: {
          qty: action.qty,
        }
      })
    )
    .switchMap(response => wordsActions.getWords.success(response.data) )
    .catch(err => Observable.of(wordsActions.getWords.failure(err.message)) )
  ));

const getWordsFailureEpic = action$ => action$
  .ofType(wordsActions.GET_WORDS.REQUEST)
  .delay(100000)
  .switchMap((args) => Observable.of(wordsActions.getWords.request(1)))
  


export default combineEpics(
  getWordsRequestEpic,
  getWordsFailureEpic,
);


/**
 * 
 * .catch(err => (
    Observable.concat(
      Observable.of(wordsActions.getWords.failure(err.message)),
      // Wait and retry if buffer not full
      Observable.timer(1000)
      .withLatestFrom(state$)
      .filter(([, state]) => state.words.data.length < MAX_WORDS_BUFF)
      .switchMap((args) => Observable.of(wordsActions.getWords.request(1)))
    )
    // .takeUntil(action$.ofType('ABORT_FETCH_WORDS'))
 */
