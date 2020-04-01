import React from 'react';
import Convert from 'ansi-to-html';
import './Preformatted.scss';

const settingsAnsi = {
  fg: '#000',
  bg: '#FFF'
};

function Preformatted(props) {
  const convert = new Convert(settingsAnsi);
  const res = convert.toHtml(props.children);
  const html = { __html: res };
  return (
    <div className="Preformatted TicketList-Log"
         dangerouslySetInnerHTML={html} >
      {/* {res || 'Waiting...'} */}
    </div>
  )
}

export default Preformatted;
