import { createRequestTypes, createAction } from '../utils';


/** *************************************************
 * Init
 */
export const GET_INFOS = createRequestTypes('GET_INFOS');

export const getInfos = {
  request: words => createAction(GET_INFOS.REQUEST, { words }),
  success: infos => createAction(GET_INFOS.SUCCESS, { infos }),
  failure: error => createAction(GET_INFOS.FAILURE, { error }),
};
