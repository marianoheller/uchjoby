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


/** *************************************************
 * Moving index
 */

export const NEXT_WORD_INDEX = 'NEXT_WORD_INDEX';
export const PREVIOUS_WORD_INDEX = 'PREVIOUS_WORD_INDEX';

export const nextWordIndex = () => ({
  type: NEXT_WORD_INDEX,
})

export const previousWordIndex = () => ({
  type: PREVIOUS_WORD_INDEX,
})
