import React from 'react';
import './Preformatted.scss';

function Preformatted(props) {
  return (
    <pre className="Preformatted TicketList-Log">
      {props.children}
    </pre>
  )
}

export default Preformatted;
