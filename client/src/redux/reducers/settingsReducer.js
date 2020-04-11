/* eslint-disable indent */
import { SAVE_CONFIG, GET_CONFIG, SHOW_LOADER, HIDE_LOADER, CLEAN_SAVE_CODE } from '../../constants';

const defaultState = {
  config: {},
  loading: true,
  configSaveRes: ''
};

export const settingsReducer = (state = defaultState, action) =>{
  console.log(action.res);
  switch (action.type) {
    case SAVE_CONFIG:
      return { ...state, config: action.payload, configSaveRes: action.res };
    case GET_CONFIG:
      return Object.keys(action.payload).length ? { ...state, config: action.payload } : state;
    case CLEAN_SAVE_CODE:
      return { ...state, configSaveRes: '' };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};
