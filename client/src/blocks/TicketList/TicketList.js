import React from 'react';
import './TicketList.scss';

const TicketList = (props) => {
  return (
    <div className="TicketList">
      {props.children}
    </div>
  )
}

export default TicketList;
