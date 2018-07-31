import { combineEpics } from 'redux-observable';
import axios from 'axios';
import * as wordActions from '../actions/word';



const getWord = (action$, store) => action$
  .ofType(wordActions.GET_WORD.REQUEST)
  .switchMap(() => (
    axios.post('/api/word')
    .then(response => wordActions.getWord.success(response.data))
    .catch(() => wordActions.getWord.failure('Request error'))
  )
);


export default combineEpics(
  getWord,
);
