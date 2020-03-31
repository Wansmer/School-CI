import React from 'react';
import Convert from 'ansi-to-html';
import './Preformatted.scss';

function Preformatted(props) {
  const convert = new Convert();
  const res = convert.toHtml(props.children);
  return (
    <div className="Preformatted TicketList-Log">
      {res || 'Waiting...'}
    </div>
  )
}

export default Preformatted;
