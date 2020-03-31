import React from 'react';
import './Preformatted.scss';

function Preformatted(props) {
  return (
    <pre className="Preformatted TicketList-Log">
      {props.children || 'Waiting...'}
    </pre>
  )
}

export default Preformatted;
