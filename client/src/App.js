import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { History } from './pages/History';
import Header from './blocks/Header/Header';

function App() {
  return (
    <Router>
      <div className="Page">
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/settings'} component={Settings}/>
          <Route path={'/history'} component={History}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
