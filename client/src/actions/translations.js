import { createRequestTypes, createAction } from '../utils';


/** *************************************************
 * Init
 */
export const GET_TRANSLATIONS = createRequestTypes('GET_TRANSLATIONS');

export const getTranslations = {
  request: words => createAction(GET_TRANSLATIONS.REQUEST, { words }),
  success: (words, translations) => createAction(GET_TRANSLATIONS.SUCCESS, { words, translations }),
  failure: error => createAction(GET_TRANSLATIONS.FAILURE, { error }),
};
