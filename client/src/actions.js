import { SAVE_CONFIG, GET_CONFIG, SERVER_URL, GET_TICKET_LIST } from './constants';

export const saveConfig = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/api/settings`, {
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

