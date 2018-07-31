import { createRequestTypes, createAction } from '../utils';


/** *************************************************
 * Init
 */
export const GET_WORD = createRequestTypes('GET_WORD');

export const getWords = {
  request: qty => createAction(GET_WORD.REQUEST, { qty }),
  success: arrWords => createAction(GET_WORD.SUCCESS, { arrWords }),
  failure: errors => createAction(GET_WORD.FAILURE, { errors }),
};
