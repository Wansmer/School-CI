import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { History } from './pages/History';

function App() {
  return (
    <BrowserRouter>
      <div className="Page">
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/settings'} component={Settings}/>
          <Route path={'/history'} component={History}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
