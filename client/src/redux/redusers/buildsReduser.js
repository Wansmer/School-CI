import { GET_TICKET_LIST, SHOW_LOADER, HIDE_LOADER, GET_BUILD_DETAILS, ADD_TO_QUEUE } from '../../constants';

const defaultState = {
  ticketList: [],
  loading: true
}

export const settingsReduser = (state = defaultState, action) =>{
  switch (action.type) {
    case GET_TICKET_LIST:
      return { ...state, config: action.payload, configSaveRes: action.res };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case CLEAN_SAVE_CODE:
        return { ...state, buildRequestRes: '' };
    default:
      return state;
  }
}
