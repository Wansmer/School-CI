import React from 'react';
import Convert from 'ansi-to-html';
import './Preformatted.scss';

function Preformatted(props) {
  const convert = new Convert();
  const res = convert.toHtml(props.children);
  return (
    <pre className="Preformatted TicketList-Log">
      <code>
        {res || 'Waiting...'}
      </code>
    </pre>
  )
}

export default Preformatted;
