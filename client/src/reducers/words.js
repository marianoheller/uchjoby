import * as wordsActions from '../actions/words';
import * as infosActions from '../actions/infos';
import * as translationsActions from '../actions/translations';

import { MAX_WORDS_BUFF } from '../config';

const initState = {
  /**
   * [ { word, translation, info } ]
   */
  arrData: [],
  wordsStatus: {
    isFetching: false,
    error: null,
  },
  translationsStatus: {
    isFetching: false,
    error: null,
  },
  infosStatus: {
    isFetching: false,
    error: null,
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    /** *****************************************************************************
     * WORDS
     */
    case wordsActions.GET_WORDS.REQUEST:
      return {
        ...state,
        wordsStatus: {
          isFetching: true,
          errors: null,
        }
      };
    case wordsActions.GET_WORDS.SUCCESS:
      const newData = [...state.arrData, ...action.words.map(word => ({ word }))];
      return {
        ...state,
        arrData: newData,
        wordsStatus: {
          isFetching: false,
          errors: null,
        }
      };
    case wordsActions.GET_WORDS.FAILURE:
      return {
        ...state,
        wordsStatus: {
          isFetching: false,
          errors: action.error.message,
        }
      };
    /** *****************************************************************************
     * TRANSLATIONS
     */
    case translationsActions.GET_TRANSLATIONS.REQUEST:
      return {
        ...state,
        translationsStatus: {
          isFetching: true,
          errors: null,
        }
      };
    case translationsActions.GET_TRANSLATIONS.SUCCESS:
      const trasArrData = [...state.arrData];
      action.words.forEach((w, i) => {
        const tIndex = state.arrData.findIndex(e => e.word === w);
        if (tIndex === -1) return;
        trasArrData[tIndex].translation = action.translations[i];
      });
      return {
        ...state,
        arrData: trasArrData,
        translationsStatus: {
          isFetching: false,
          errors: null,
        }
      };
    case translationsActions.GET_TRANSLATIONS.FAILURE:
      return {
        ...state,
        translationsStatus: {
          isFetching: false,
          errors: action.error.message,
        }
      };
    /** *****************************************************************************
     * INFOS
     */
    case infosActions.GET_INFOS.REQUEST:
      return {
        ...state,
        infosStatus: {
          isFetching: true,
          errors: null,
        }
      };
    case infosActions.GET_INFOS.SUCCESS:
      const infosData = [...state.arrData];
      action.words.forEach((w, i) => {
        const tIndex = state.arrData.findIndex(e => e.word === w);
        if (tIndex === -1) return;
        infosData[tIndex].info = action.infos[i];
      });
      return {
        ...state,
        arrData: infosData,
        infosStatus: {
          isFetching: false,
          errors: null,
        }
      };
    case infosActions.GET_INFOS.FAILURE:
      return {
        ...state,
        infosStatus: {
          isFetching: false,
          errors: action.error.message,
        }
      };
    default:
      return state;
  }
};
