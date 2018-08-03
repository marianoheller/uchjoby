import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import axios from 'axios';

import * as wordsActions from '../actions/words';
import * as translationsActions from '../actions/translations';
import { MAX_WORDS_BUFF } from '../config';



const getWordsRequestEpic = (action$, state$) => action$
  .ofType(wordsActions.GET_WORDS.REQUEST)
  .mergeMap(action => (
    Observable.from(
      axios.get('/api/word/random', {
        params: {
          qty: action.qty,
        }
      })
    )
    .mergeMap(response => (
      Observable.concat(
        Observable.of(wordsActions.getWords.success(response.data)),
        Observable.timer(250)
        .switchMap(() => Observable.of(translationsActions.getTranslations.request(response.data)))
      )
    ))
    .catch(err => Observable.of(wordsActions.getWords.failure({
      message: err.message,
      qty: action.qty,
    })))
  ));


const getWordsFailureEpic = (action$, state$) => action$
  .ofType(wordsActions.GET_WORDS.FAILURE)
  .scan(x => (x === 10 ? 10 : x + 1), 1) // counts to 10 and then repeats 10
  .delayWhen(x => Observable.timer(1000 * x))
  .withLatestFrom(action$)
  .mergeMap(([, action]) => Observable.of(wordsActions.getWords.request(action.error.qty)));


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
