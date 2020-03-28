import React from 'react';
import { connect } from 'react-redux';
import './TicketList.scss';
import Ticket from '../Ticket/Ticket';

function TicketList(props) {
  console.log(props);
  const tickets = props.ticketList;
  const listTickets = tickets.map((ticket) => 
    <Ticket value={ticket} />
  )
  return (
    <div class="TicketList">
      {listTickets}
      {props.children}
    </div>
  )
}

const mapStateToProps = (state) => ({
  ticketList: state.ticketList
})

export default connect(mapStateToProps)(TicketList);
