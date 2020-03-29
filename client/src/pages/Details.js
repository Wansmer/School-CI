import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TicketList from '../blocks/TicketList/TicketList';
import Ticket from '../blocks/Ticket/Ticket';
import Header from '../blocks/Header/Header';
import Title from '../blocks/Title/Title';
import Button from '../blocks/Button/Button';
import { getBuildDetails } from '../actions';
import Content from '../blocks/Content/Content';
import Preformatted from '../blocks/Preformatted/Preformatted';
import { addToQueue } from '../actions';


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

const Details = (props) => {

  useEffect(() => {
    props.getBuildDetails(props.match.params.buildId)
  }, [])

  const reBuild = (event) => {
    event.preventDefault();
    addToQueue(props.ticket.commitHash);
  }

  return (
    <Fragment>
      <Header>
        <Title 
          className="Header-Title"
          classes={TitleClasses}
          path='/history'
        >{props.repoName}</Title>
        <Button 
          className='Icon Icon_rebuild Header-Button' 
          classes={buildButtonClasses} 
          text='Rebuild' 
          onClick={reBuild}
        />
        <Button 
          className='Icon Icon_gear Header-Button' 
          classes={settingsButtonClasses} 
          text='Settings' 
        />
      </Header>
      <Content classes={contentClasses} className='Page-Content'>
        <TicketList>
          <Ticket className='Ticket_show_details' value={props.ticket}/>
          <Preformatted>
            {props.ticketLog}
          </Preformatted>
        </TicketList>
      </Content>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  repoName: state.config.repoName,
  ticket: state.currentTicket.details,
  ticketLog: state.currentTicket.log
})

const mapDistpatchToProps = (dispatch) => ({
  getBuildDetails: (id) => dispatch(getBuildDetails(id))
})

export default connect(mapStateToProps, mapDistpatchToProps)(Details);
