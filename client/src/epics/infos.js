import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import axios from 'axios';

import * as infosActions from '../actions/infos';
import * as wordsActions from '../actions/words';
import { MAX_WORDS_BUFF } from '../config';



const getInfosRequestEpic = (action$, state$) => action$
  .ofType(infosActions.GET_INFOS.REQUEST)
  .mergeMap(action => (
    Observable.from(
      axios.get('/api/word', {
        params: {
          words: action.words,
        }
      })
    )
    .mergeMap(response => Observable.concat(
      Observable.of(infosActions.getInfos.success(action.words, response.data)),
      Observable.timer(250)
      .withLatestFrom(state$)
      .map(([, state]) => Math.ceil((MAX_WORDS_BUFF - state.words.arrData.length) / 2))
      .filter(delta => delta > 0)
      .switchMap(delta => Observable.of(wordsActions.getWords.request(delta)))
    ))
    .catch(err => Observable.of(infosActions.getInfos.failure({
      message: err.message,
      words: action.words,
    })))
  ))
  


const getInfosFailureEpic = (action$, state$) => action$
  .ofType(infosActions.GET_INFOS.FAILURE)
  .delay(100000)
  .mergeMap(action => Observable.of(infosActions.getInfos.request(action.error.words)));


export default combineEpics(
  getInfosRequestEpic,
  getInfosFailureEpic,
);
