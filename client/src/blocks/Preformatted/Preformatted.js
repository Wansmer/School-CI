import React from 'react';
import Convert from 'ansi-to-html';
import './Preformatted.scss';

const settingsAnsi = {
  fg: '#000',
  bg: '#FFF'
};

const convert = new Convert(settingsAnsi);

const Preformatted = (props) => {
  
  const ansiLog = props.children ? convert.toHtml(props.children) : `<div>Waiting...</div>`;
  const log = { __html: ansiLog };

  return (
    <div className="Preformatted TicketList-Log"
         dangerouslySetInnerHTML={log} >
    </div>
  )
}

export default Preformatted;
