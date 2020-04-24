import React from 'react';
import './Ticket.scss';
import { Link } from 'react-router-dom';
import { getHumanDate, getHumanDuration } from '../../utils';

export interface TicketProps {
  goToDetails(): void;
  id: string;
  value: any;
}

const Ticket: React.FC<TicketProps> = (props) => {
  return (
    <div className={'Ticket Ticket_status_' + props.value.status} onClick={props.goToDetails} id={props.id} >
      <div className="Ticket-Info">
        <div className="Ticket-Summary">
          <span className="Ticket-Number">{'#' + props.value.buildNumber}</span>
          <span className="Ticket-Title">{props.value.commitMessage}</span>
        </div>
        <div className="Ticket-Owner">
          <div className="Ticket-Tech">
            <Link to={'/'} className={'Link Icon Icon_branch Link_icon_left Ticket-Branch'}>{props.value.branchName}</Link>
            <Link to={'/'} className={'Link Link_color_dark Ticket-Hash'}>{props.value.commitHash}</Link>
          </div>
          <Link to={'/'} className={'Link Icon_commiter Link_icon_left Ticket-Commiter'}>{props.value.authorName}</Link>
        </div>
      </div>
      <div className="Ticket-Meta Ticket-Meta_position_right">
        <Link to={'/'} className={'Link Icon_date Link_icon_left Link_color_dark Ticket-Date'} >
          <time dateTime={props.value.start}>
            {getHumanDate(props.value.start)}
          </time>
        </Link>
        <Link to={'/'} className={'Link Icon_duration Link_icon_left Link_color_dark Ticket-Duration'}>
          <time dateTime={props.value.duration}>
            {getHumanDuration(props.value.duration)}
          </time>
        </Link>
      </div>
    </div>
  );
};

export default Ticket;
