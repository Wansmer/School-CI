import React from 'react';
import './TicketList.scss';
import Ticket from '../Ticket/Ticket';

function TicketList(props) {
  const tickets = props.tickets;
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

export default TicketList;
