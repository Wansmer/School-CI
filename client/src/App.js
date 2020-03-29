import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from "react-redux";
import './App.scss';
import { Home } from './pages/Home';
import Settings from './pages/Settings';
import { History } from './pages/History';
import { Details } from './pages/Details';
import Footer from './blocks/Footer/Footer';
import { getConfig, getTicketList } from './actions';
import Modal from './blocks/Modal/Modal';

export function App(props) {

  useEffect(() => {
    props.getConfig();
    props.getTicketList();
  }, [])
  
  return (
    <Router>
      <div className="Page">
        <Switch>
          <Route path={'/'} exact component={ Object.keys(props.config).length ? History : Home}/>
          <Route path={'/settings'} component={Settings}/>
          <Route path={'/history'} component={History}/>
          <Route path={'/details/:buildId'} component={Details}/>
        </Switch>
      <Footer />
      {/* <Modal/> */}
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  config: state.config,
  ticketList: state.ticketLists
});

const mapDispatchToProps = (dispatch) => ({
  getConfig: () => dispatch(getConfig()),
  getTicketList: () => dispatch(getTicketList())
});

export const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default App;
