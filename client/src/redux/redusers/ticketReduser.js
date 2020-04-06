import { SHOW_LOADER, HIDE_LOADER, GET_BUILD_DETAILS, ADD_TO_QUEUE } from '../../constants';

const defaultState = {
  currentTicket: {
    details: {},
    log: ''
  },
  buildRequestRes: '',
  loading: true
}

export const ticketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_BUILD_DETAILS:
      return Object.keys(action.payload).length === 0 ? state : { ...state, currentTicket: action.payload };
    case ADD_TO_QUEUE:
      return Object.keys(action.payload).length === 0 ? state : { ...state, buildRequestRes: action.payload };
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
