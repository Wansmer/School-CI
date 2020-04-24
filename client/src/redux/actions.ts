import { SAVE_CONFIG, GET_CONFIG, SERVER_URL, GET_TICKET_LIST, GET_BUILD_DETAILS, CLEAN_SAVE_CODE, ADD_TO_QUEUE, SHOW_LOADER, HIDE_LOADER } from '../constants';

export const saveConfig = (data: ConfigurationModel): Function => {
  return async (dispatch: Function) => {
    try {
      const response = await fetch(`${SERVER_URL}settings`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const res = await response.json();
      dispatch({
        type: SAVE_CONFIG,
        payload: data,
        res: res
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const showLoader = (): Dispatch => ({
  type: SHOW_LOADER
});

export const hideLoader = (): Dispatch => ({
  type: HIDE_LOADER
});

export const getConfig = (): Function  => {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader());
      const response = await fetch(`${SERVER_URL}settings`);
      const config = await response.json();
      dispatch({
        type: GET_CONFIG,
        payload: config
      });
      dispatch(hideLoader());
    } catch (err) {
      console.log(err);
      dispatch(hideLoader());
    }
  };
};

export const getTicketList = (): Function => {
  return async (dispatch: Function) => {
    try {
      const response = await fetch(`${SERVER_URL}builds`);
      const ticketList = await response.json();
      dispatch({
        type: GET_TICKET_LIST,
        payload: ticketList
      });
    } catch (err) {
      dispatch({
        type: GET_TICKET_LIST,
        payload: []
      });
    }
  };
};

export const getBuildDetails = (id: string): Function => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: CLEAN_SAVE_CODE
      });
      const response = await fetch(`${SERVER_URL}builds/${id}`);
      const details = await response.json();
      let log = ''
      if (details.status === 'Success' || details.status === 'Fail') {
        const answer = await fetch(`${SERVER_URL}builds/${id}/logs`);
        console.log(answer);
        log = await answer.json();
      }
      dispatch({
        type: GET_BUILD_DETAILS,
        payload: { details, log }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToQueue = (commitHash: string): Function => {
  return async (dispatch: Function) => {
    try {
      dispatch({
        type: CLEAN_SAVE_CODE
      });
      const response = await fetch(`${SERVER_URL}builds/${commitHash}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      dispatch({
        type: ADD_TO_QUEUE,
        payload: result
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const cleanSaveCode = (): Function => {
  return (dispatch: Function) => {
    dispatch({
      type: CLEAN_SAVE_CODE
    });
  };
};
