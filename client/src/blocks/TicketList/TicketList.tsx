import React from 'react';
import './TicketList.scss';

export interface TicketListProps {
  children: React.ReactNode;
}

const TicketList: React.FC<TicketListProps> = (props) => {
  return (
    <div className="TicketList">
      {props.children}
    </div>
  );
};

export default TicketList;
