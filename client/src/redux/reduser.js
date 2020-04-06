import { GET_CONFIG, SAVE_CONFIG, GET_TICKET_LIST, GET_BUILD_DETAILS, CLEAN_SAVE_CODE, ADD_TO_QUEUE, SHOW_LOADER, HIDE_LOADER } from "../constants";

const defaultState = {
  loading: true,
  config: {},
  ticketList: [],
  currentTicket: {
    details: {},
    log: ''
  },
  configSaveRes: '',
  buildRequestRes: ''
};

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CONFIG:
      return Object.keys(action.payload).length === 0 ? state : { ...state, config: action.payload };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case SAVE_CONFIG:
      return { ...state, config: action.payload, configSaveRes: action.res };
    case CLEAN_SAVE_CODE:
      return { ...state, configSaveRes: '', buildRequestRes: '', currentTicket: {}  };
    case GET_TICKET_LIST:
      return Object.keys(action.payload).length === 0 ? state : { ...state, ticketList: action.payload };
    case GET_BUILD_DETAILS:
      return Object.keys(action.payload).length === 0 ? state : { ...state, currentTicket: action.payload };
    case ADD_TO_QUEUE:
      return Object.keys(action.payload).length === 0 ? state : { ...state, buildRequestRes: action.payload };
    default: 
      return state;
  }
}
