import { combineEpics } from 'redux-observable';
import axios from 'axios';
import * as wordsActions from '../actions/words';



const getWords = (action$, store) => action$
  .ofType(wordsActions.GET_WORD.REQUEST)
  .mergeMap(action => (
    axios.get('/api/word/random', {
      params: {
        qty: action.qty,
      }
    })
    .then(response => wordsActions.getWords.success(response.data))
    .catch(err => wordsActions.getWords.failure(err.message || err))
  )
);


export default combineEpics(
  getWords,
);
