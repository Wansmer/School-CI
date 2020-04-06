import { SAVE_CONFIG, GET_CONFIG, SHOW_LOADER, HIDE_LOADER } from '../../constants';

const defaultState = {
  config: {},
  loading: true,
  configSaveRes: ''
}

export const settingsReduser = (state = defaultState, action) =>{
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
}
