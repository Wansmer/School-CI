import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TicketList from '../blocks/TicketList/TicketList';
import Ticket from '../blocks/Ticket/Ticket';
import Header from '../blocks/Header/Header';
import Title from '../blocks/Title/Title';
import Content from '../blocks/Content/Content';
import Button from '../blocks/Button/Button';

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

  const tickets = props.ticketList;
  const listTickets = tickets.map((ticket) => 
    <Link to={'/build/' + ticket.id} >
      <Ticket value={ticket} key={ticket.id} />
    </Link>
  )

  return (
    <Fragment>
      <Header>
        <Title 
          className="Header-Title"
          classes={TitleClasses}
          path='/history'
        >{props.repoName}</Title>
        <Button className='Icon Icon_build Header-Button' classes={buildButtonClasses} text='Run build' />
        <Button className='Icon Icon_gear Header-Button' classes={settingsButtonClasses} text='Settings' />
      </Header>
      <Content className='Page-Content'
               classes={contentClasses} >
        <TicketList >
          {listTickets}
          <Button classes={moreButtonClasses} text='Show more' />
        </TicketList>
      </Content>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  repoName: state.config.repoName,
  ticketList: state.ticketList
})

export default connect(mapStateToProps)(History);
