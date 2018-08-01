import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import axios from 'axios';


import * as wordsActions from '../actions/words';



const getWords = (action$, store) => action$
  .ofType(wordsActions.GET_WORDS.REQUEST)
  .switchMap(action => (
    Observable.from(
      axios.get('/api/word/random', {
        params: {
          qty: action.qty,
        }
      })
    )
    .catch(err => Observable.throw(err))
  )
  .mergeMap(response =>
    // Concat so they fire sequentially
    Observable.concat(
      wordsActions.getWords.success(response.data),
      Observable.of({ type: 'NOTIFY_SUCCESS', payload: response.data })
    )
  )
  .catch(err => (
    Observable.concat(
      Observable.of(wordsActions.getWords.failure(err.message)),
      Observable.timer(5000)
      .switchMap(() => (
        Observable.of(wordsActions.getWords.request(1))
      ))
    )
  ))
  .takeUntil(action$.ofType('ABORT_FETCH_WORDS'))
);


export default combineEpics(
  getWords,
);
