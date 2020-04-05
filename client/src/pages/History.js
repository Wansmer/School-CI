import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TicketList from '../blocks/TicketList/TicketList';
import Ticket from '../blocks/Ticket/Ticket';
import Header from '../blocks/Header/Header';
import Title from '../blocks/Title/Title';
import Content from '../blocks/Content/Content';
import Button from '../blocks/Button/Button';
import Modal from '../blocks/Modal/Modal';
import { getTicketList, addToQueue } from '../redux/actions';

const TitleClasses = {
  mods: {
    color: 'main'
  }
}

const contentClasses = {
  elems: {
    Inner: {
      mods: {
        alignVertical: 'top',
        alignHorizon: 'left'
      }
    }
  }
}

const moreButtonClasses = {
  mods: {
    type: 'control',
    size: 'm'
  }
}

const buildButtonClasses = {
  mods: {
    type: 'control',
    size: 'm',
    iconMix: '',
    icon: 'left'
  }
}

const settingsButtonClasses = {
  mods: {
    type: 'control',
    size: 'm',
    iconMix: '',
    icon: 'left',
    text: 'hidden'
  }
}

const History = (props) => {

  const [state, setState] = useState(props);
  const history = useHistory();

  useEffect(() => {
    props.getTicketList();
  }, [])

  useEffect(() => {
    setState((prevState) => ({...prevState, ...{ ticketList: props.TicketList }}))
  }, [props.ticketList])

  const toggleModalShow = (event) => {
    event.persist();
    setState((prevState) => ({...prevState, ...{ isShowModal: !(state.isShowModal) }}));
  }

  const goToDetails = (event) => {
    event.persist();
    history.push(`/build/${event.currentTarget.id}`);
  }

  const clickHandler = (event) => {
    event.preventDefault();
    history.push('/settings');
  }

  const tickets = props.ticketList;
  const listTickets = tickets.map((ticket) => (
      <Ticket 
        value={ticket} 
        id={ticket.id}
        key={ticket.id} 
        goToDetails={goToDetails}
      />
    )
  )

  return (
    <Fragment>
      <Header className="Page-Header" >
        <Title 
          className="Header-Title"
          classes={TitleClasses}
          path='/history'
        >{props.repoName}</Title>
        <Button 
          className='Icon Icon_build Header-Button' 
          classes={buildButtonClasses} 
          text='Run build' 
          onClick={toggleModalShow}
        />
        <Button 
          className='Icon Icon_gear Header-Button' 
          classes={settingsButtonClasses} 
          text='Settings' 
          onClick={clickHandler}
        />
      </Header>
      <Content className='Page-Content'
               classes={contentClasses} >
        <TicketList >
          { listTickets.length ? listTickets : 'No builds here yet. Push a button "Run build" for adding new build...' }
          <Button classes={moreButtonClasses} text='Show more' />
        </TicketList>
      </Content>
      <div>
        {state.isShowModal && ReactDOM.createPortal(
          <Modal onClose={toggleModalShow} />,
          document.getElementById('portal')
        )}
      </div>
    </Fragment>
  )
}

History.defaultProps = {
  isShowModal: false
}

const mapStateToProps = (state) => ({
  repoName: state.config.repoName,
  ticketList: state.ticketList
})

const mapDispatchToProps = (dispatch) => ({
  getTicketList: () => dispatch(getTicketList())
})

export default connect(mapStateToProps, mapDispatchToProps)(History);
