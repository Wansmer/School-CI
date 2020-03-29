import { SAVE_CONFIG, GET_CONFIG, SERVER_URL, GET_TICKET_LIST, GET_BUILD_DETAILS } from './constants';

export const saveConfig = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      const response = await fetch(`${SERVER_URL}settings`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const answ = await response.json();
      console.log(answ);
      dispatch({
        type: SAVE_CONFIG,
        payload: data
      })
      return answ;
    } catch (err) {
      console.log(err);
    }
  }
};

export const getConfig = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${SERVER_URL}settings`);
      const config = await response.json();
      dispatch({
        type: GET_CONFIG,
        payload: config
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const getTicketList = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${SERVER_URL}builds`);
      const ticketList = await response.json();
      dispatch({
        type: GET_TICKET_LIST,
        payload: ticketList
      })
    } catch (err) {
      console.log(err);
    }
  }
}

export const getBuildDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${SERVER_URL}builds/${id}`);
      const answer = await fetch(`${SERVER_URL}builds/${id}/logs`);
      const details = await response.json();
      const log = await answer.json();
      dispatch({
        type: GET_BUILD_DETAILS,
        payload: { details, log }
      })
    } catch (err) {
      console.log(err);
    }
  }
}

