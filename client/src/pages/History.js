import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TicketList from '../blocks/TicketList/TicketList';
import Ticket from '../blocks/Ticket/Ticket';
import Header from '../blocks/Header/Header';
import Title from '../blocks/Title/Title';
import Content from '../blocks/Content/Content';
import Button from '../blocks/Button/Button';
import Modal from '../blocks/Modal/Modal';
import Loader from '../blocks/Loader/Loader';
import { getTicketList, cleanSaveCode } from '../redux/actions';

const TitleClasses = {
  mods: {
    color: 'main'
  }
};

const contentClasses = {
  elems: {
    Inner: {
      mods: {
        alignVertical: 'top',
        alignHorizon: 'left'
      }
    }
  }
};

const moreButtonClasses = {
  mods: {
    type: 'control',
    size: 'm'
  }
};

const buildButtonClasses = {
  mods: {
    type: 'control',
    size: 'm',
    iconMix: '',
    icon: 'left'
  }
};

const settingsButtonClasses = {
  mods: {
    type: 'control',
    size: 'm',
    iconMix: '',
    icon: 'left',
    text: 'hidden'
  }
};

const History = (props) => {

  const [state, setState] = useState(props);
  const repoName = useSelector((state) => state.settings.config.repoName);
  const loading = useSelector((state) => state.builds.loading);
  const history = useHistory();

  useEffect(() => {
    props.getTicketList();
  }, []);

  const toggleModalShow = (event) => {
    event.persist();
    setState((prevState) => ({...prevState, ...{ isShowModal: !(state.isShowModal) }}));
  };

  const goToDetails = (event) => {
    event.persist();
    history.push(`/build/${event.currentTarget.id}`);
  };

  const clickHandler = (event) => {
    event.preventDefault();
    history.push('/settings');
  };

  const listTickets = props.ticketList.map((ticket) => (
    <Ticket
      value={ticket}
      id={ticket.id}
      key={ticket.id}
      goToDetails={goToDetails}
    />
  )
  );

  return (
    <Fragment>
      <Header className="Page-Header" >
        <Title
          className="Header-Title"
          classes={TitleClasses}
          path='/history'
        >{repoName}</Title>
        <Button
          className='Icon Icon_build Header-Button'
          classes={buildButtonClasses}
          text='Run build'
          onClick={toggleModalShow}
          isDisabled={ loading }
          id='run_build'
        />
        <Button
          className='Icon Icon_gear Header-Button'
          classes={settingsButtonClasses}
          text='Settings'
          onClick={clickHandler}
          id='settings_header'
        />
      </Header>
      <Content className='Page-Content'
        classes={contentClasses} >
        { loading ? <Loader /> : (
          <TicketList >
            { listTickets.length ? listTickets : 'No builds here yet. Push a button "Run build" for adding new build...' }
            <Button 
              classes={moreButtonClasses}
              text='Show more'
              isDisabled={ loading }
              id='show_more'
            />
          </TicketList>
        )}
      </Content>
      <div>
        {state.isShowModal && ReactDOM.createPortal(
          <Modal onClose={toggleModalShow} />,
          document.getElementById('portal')
        )}
      </div>
    </Fragment>
  );
};

History.defaultProps = {
  ticketList: [],
  isShowModal: false
};

const mapStateToProps = (state) => ({
  ticketList: state.builds.ticketList
});

const mapDispatchToProps = (dispatch) => ({
  getTicketList: () => dispatch(getTicketList()),
  cleanSaveCode: () => dispatch(cleanSaveCode())
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(History));
