import * as wordsActions from '../actions/words';
import * as infosActions from '../actions/infos';
import * as translationsActions from '../actions/translations';

import { MAX_WORDS_BUFF } from '../config';

const initState = {
  /**
   * [ { word, translation, info } ]
   */
  arrData: [],
  currentIndex: 0,
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
  const { currentIndex } = state;
  switch (action.type) {
    case wordsActions.NEXT_WORD_INDEX:
      return {
        ...state,
        currentIndex: currentIndex < (MAX_WORDS_BUFF - 1) ? currentIndex + 1 : currentIndex,
      };
    case wordsActions.PREVIOUS_WORD_INDEX:
      return {
        ...state,
        currentIndex: currentIndex > 0 ? currentIndex - 1 : currentIndex,
      };
    /** *****************************************************************************
     * WORDS
     */
    case wordsActions.GET_WORDS.REQUEST:
      return {
        ...state,
        wordsStatus: {
          isFetching: true,
          // error: null,
        }
      };
    case wordsActions.GET_WORDS.SUCCESS:
      const wordsData = [...state.arrData, ...action.words.map(w => ({ word: w }))].slice(-1 * MAX_WORDS_BUFF);
      return {
        ...state,
        arrData: wordsData,
        wordsStatus: {
          isFetching: false,
          error: null,
        }
      };
    case wordsActions.GET_WORDS.FAILURE:
      return {
        ...state,
        wordsStatus: {
          isFetching: false,
          error: action.error.message,
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
          error: null,
        }
      };
    case translationsActions.GET_TRANSLATIONS.SUCCESS:
      const transArrData = [...state.arrData];
      action.words.forEach((w, i) => {
        const tIndex = state.arrData.findIndex(e => e.word === w);
        if (tIndex === -1) return;
        transArrData[tIndex] = {
          ...transArrData[tIndex],
          translation: action.translations[i],
        };
      });
      return {
        ...state,
        arrData: transArrData,
        translationsStatus: {
          isFetching: false,
          error: null,
        }
      };
    case translationsActions.GET_TRANSLATIONS.FAILURE:
      return {
        ...state,
        translationsStatus: {
          isFetching: false,
          error: action.error.message,
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
          error: null,
        }
      };
    case infosActions.GET_INFOS.SUCCESS:
      const infosData = [...state.arrData];
      action.words.forEach((w, i) => {
        const tIndex = infosData.findIndex(e => e.translation === w);
        if (tIndex === -1) return;
        infosData[tIndex] = {
          ...infosData[tIndex],
          info: action.infos[i],
        }
      });
      return {
        ...state,
        arrData: infosData,
        infosStatus: {
          isFetching: false,
          error: null,
        }
      };
    case infosActions.GET_INFOS.FAILURE:
      return {
        ...state,
        infosStatus: {
          isFetching: false,
          error: action.error.message,
        }
      };
    default:
      return state;
  }
};
