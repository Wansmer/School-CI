import { combineReducers } from 'redux';
import settingsReduser from './settingsReduser';
import buildsReduser from './buildsReduser';
import ticketReducer from './ticketReduser';

export const rootReduser = combineReducers({
  settings: settingsReduser,
  builds: buildsReduser,
  ticket: ticketReducer
});
