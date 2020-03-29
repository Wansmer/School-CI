import React from 'react';
import { connect } from 'react-redux';
import './TicketList.scss';

function TicketList(props) {
  return (
    <div className="TicketList">
      {props.children}
    </div>
  )
}

export default connect()(TicketList);
