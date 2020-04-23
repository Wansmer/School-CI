import React from 'react';
import Convert from 'ansi-to-html';
import './Preformatted.scss';

const settingsAnsi = {
  fg: '#000',
  bg: '#FFF'
};

const convert = new Convert(settingsAnsi);

// export interface PreformattedProps {
//   children: React.ReactNode;
// }

// const Preformatted: React.FC<PreformattedProps> = ({ children }) => {
const Preformatted = ({ children }) => {

  const ansiLog = children ? convert.toHtml(children) : '<div>Waiting...</div>';
  const log = { __html: ansiLog };

  return (
    <div className="Preformatted TicketList-Log"
      dangerouslySetInnerHTML={log} >
    </div>
  );
};

export default React.memo(Preformatted);
