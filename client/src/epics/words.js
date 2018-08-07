import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import axios from 'axios';

import * as wordsActions from '../actions/words';
import * as translationsActions from '../actions/translations';



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
  .scan((acc, curr) => ({
    delay: (acc.delay === 10 ? 10 : acc.delay + 1),
    action: curr,
  }), { delay: 0 }) // counts from 1 to 10 and then repeats 10
  .delayWhen(obj => Observable.timer(1000 * obj.delay))
  .mergeMap(obj => Observable.of(wordsActions.getWords.request(obj.action.error.qty)));

/* 
const getWordsRetriggerEpic = (action$, state$) => action$
.ofType(wordsActions.NEXT_WORD_INDEX)
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
 */
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
