import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import axios from 'axios';

import * as translationsActions from '../actions/translations';
import * as infosActions from '../actions/infos';



const getTranslationsRequestEpic = (action$, state$) => action$
  .ofType(translationsActions.GET_TRANSLATIONS.REQUEST)
  .mergeMap(action => (
    Observable.from(
      axios.get('/api/translate', {
        params: {
          words: action.words,
        }
      })
    )
    .mergeMap(response => (
      Observable.concat(
        Observable.of(translationsActions.getTranslations.success(action.words, response.data)),
        Observable.timer(250)
        .switchMap(() => Observable.of(infosActions.getInfos.request(response.data)))
      )
    ))
    .catch(err => Observable.of(translationsActions.getTranslations.failure({
      message: err.message,
      words: action.words,
    })))
  ))
  


const getTranslationsFailueEpic = (action$, state$) => action$
  .ofType(translationsActions.GET_TRANSLATIONS.FAILURE)
  .delay(3000)
  .mergeMap(action => Observable.of(translationsActions.getTranslations.request(action.error.words)));


export default combineEpics(
  getTranslationsRequestEpic,
  getTranslationsFailueEpic,
);
