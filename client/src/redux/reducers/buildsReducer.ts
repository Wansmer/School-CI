import { GET_TICKET_LIST, CLEAN_SAVE_CODE } from '../../constants';

const defaultState: State = {
  ticketList: [],
  loading: true
};

export const buildsReducer = (state: State = defaultState, action: Dispatch): State => {
  console.log(action.payload);
  switch (action.type) {
  case GET_TICKET_LIST:
    return { ...state, ticketList: action.payload, loading: false };
  case CLEAN_SAVE_CODE:
    return { ...state, buildRequestRes: '' };
  default:
    return state;
  }
};
