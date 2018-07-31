import { createRequestTypes, createAction } from '../utils';


/** *************************************************
 * Init
 */
export const GET_WORD = createRequestTypes('GET_WORD');

export const getWord = {
  request: () => createAction(GET_WORD.REQUEST),
  success: data => createAction(GET_WORD.SUCCESS, data),
  failure: errors => createAction(GET_WORD.FAILURE, { errors }),
};
