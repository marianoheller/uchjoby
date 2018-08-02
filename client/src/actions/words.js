import { createRequestTypes, createAction } from '../utils';


/** *************************************************
 * Init
 */
export const GET_WORDS = createRequestTypes('GET_WORDS');

export const getWords = {
  request: qty => createAction(GET_WORDS.REQUEST, { qty }),
  success: words => createAction(GET_WORDS.SUCCESS, { words }),
  failure: error => createAction(GET_WORDS.FAILURE, { error }),
};
