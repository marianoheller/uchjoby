import { createRequestTypes, createAction } from '../utils';


/** *************************************************
 * Init
 */
export const GET_WORDS = createRequestTypes('GET_WORDS');

export const getWords = {
  request: qty => createAction(GET_WORDS.REQUEST, { qty }),
  success: arrWords => createAction(GET_WORDS.SUCCESS, { arrWords }),
  failure: errors => createAction(GET_WORDS.FAILURE, { errors }),
};
