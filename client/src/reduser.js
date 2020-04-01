import { GET_CONFIG, SAVE_CONFIG, GET_TICKET_LIST, GET_BUILD_DETAILS, CLEAN_SAVE_CODE } from "./constants";

const defaultState = {
  config: {},
  ticketList: [],
  currentTicket: {
    details: {},
    log: ''
  },
  configSaveRes: ''
};

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CONFIG:
      return Object.keys(action.payload).length === 0 ? state : { ...state, config: action.payload };
    case SAVE_CONFIG:
      return { ...state, config: action.payload, configSaveRes: action.code  };
    case CLEAN_SAVE_CODE:
      return { ...state, configSaveRes: ''  };
    case GET_TICKET_LIST:
      return Object.keys(action.payload).length === 0 ? state : { ...state, ticketList: action.payload };
    case GET_BUILD_DETAILS:
      return Object.keys(action.payload).length === 0 ? state : { ...state, currentTicket: action.payload };
    default: 
      return state;
  }
}
