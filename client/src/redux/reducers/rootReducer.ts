import { combineReducers } from 'redux';
import { settingsReducer } from './settingsReducer';
import { buildsReducer } from './buildsReducer';
import { ticketReducer } from './ticketReducer';

export const rootReducer = combineReducers({
  settings: settingsReducer,
  builds: buildsReducer,
  ticket: ticketReducer
});

export type rootReducer = ReturnType<typeof rootReducer>;
