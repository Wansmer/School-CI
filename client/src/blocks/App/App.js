import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from "react-redux";
import './App.scss';
import { Home } from '../../pages/Home';
import Settings from '../../pages/Settings';
import History from '../../pages/History';
import Details from '../../pages/Details';
import Footer from '../Footer/Footer';
import { getConfig } from '../../redux/actions';

const App = (props) => {

  useEffect(() => {
    props.getConfig();
  }, [])
  
  return (
    <Router>
      <div className="Page">
        <Switch>
          <Route path={'/'} exact component={ Object.keys(props.config).length ? History : Home}/>
          <Route path={'/settings'} component={Settings}/>
          <Route path={'/history'} component={ Object.keys(props.config).length ? History : Home }/>
          <Route path={'/build/:buildId'} component={Object.keys(props.config).length ? Details : Home}/>
          <Route path={'/*'} component={Object.keys(props.config).length ? History : Home}/>
        </Switch>
      <Footer />
      </div>
    </Router>

  );
}

const mapStateToProps = (state) => ({
  config: state.config
});

const mapDispatchToProps = (dispatch) => ({
  getConfig: () => dispatch(getConfig())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
