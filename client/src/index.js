import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { thunk, storeLogger } from './middleware';
import { Provider } from 'react-redux';
import './index.scss';
import { ConnectedApp } from './App';
import * as serviceWorker from './serviceWorker';
import { rootReducer } from "./reduser";

const store = createStore(rootReducer, applyMiddleware(thunk, storeLogger));

ReactDOM.render(
  <React.StrictMode> 
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
