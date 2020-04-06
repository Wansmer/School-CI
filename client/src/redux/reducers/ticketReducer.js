import { GET_BUILD_DETAILS, ADD_TO_QUEUE, CLEAN_SAVE_CODE } from '../../constants';

const defaultState = {
  currentTicket: {
    details: {},
    log: ''
  },
  buildRequestRes: '',
  loading: true
}

export const ticketReducer = (state = defaultState, action) => {
  console.log('FROM TICKET REDUCER: ', action.type, action.payload);
  switch (action.type) {
    case GET_BUILD_DETAILS:
      return Object.keys(action.payload).length === 0 ? state : { ...state, currentTicket: action.payload, loading: false };
    case ADD_TO_QUEUE:
      return Object.keys(action.payload).length === 0 ? state : { ...state, buildRequestRes: action.payload };
    case CLEAN_SAVE_CODE:
      return { ...state, buildRequestRes: '', currentTicket: { details: {}, log: '' }, loading: true };
    default:
      return state;
  }
}
