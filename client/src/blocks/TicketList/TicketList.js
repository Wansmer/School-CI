import React from 'react';
import { connect } from 'react-redux';
import './TicketList.scss';
import { Link } from 'react-router-dom';
import Ticket from '../Ticket/Ticket';

function TicketList(props) {
  return (
    <div class="TicketList">
      {props.children}
    </div>
  )
}

const mapStateToProps = (state) => ({
  // 
})

export default connect(mapStateToProps)(TicketList);
