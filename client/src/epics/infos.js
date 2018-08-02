import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import axios from 'axios';

import * as infosActions from '../actions/infos';
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
    .mergeMap(response => Observable.of(infosActions.getInfos.success(response.data)))
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
