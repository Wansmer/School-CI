import React from 'react';
import './Ticket.scss';
import { Link } from 'react-router-dom';
// import { expandClasses } from '../../utils';

const getHumanDate = (data) => {
  data = new Date(data);
  const settings = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const locale = 'ru';
  console.log(data.toLocaleString(locale, settings));
  return data.toLocaleString(locale, settings);
}

function Ticket(props) {
  return (
    <div class={'Ticket ' + 'Ticket_status_' + props.value.status}>
      <div class="Ticket-Info">
        <div class="Ticket-Summary">
          <span class="Ticket-Number">{'#' + props.value.buildNumber}</span>
          <span class="Ticket-Title">{props.value.commitMessage}</span>
        </div>
        <div class="Ticket-Owner">
          <div class="Ticket-Tech">
            <Link to={'/'} className={'Link Icon Icon_branch Ticket-Branch'}>{props.value.branchName}</Link>
            <Link to={'/'} className={'Link Link_color_dark Ticket-Hash'}>{props.value.commitHash}</Link>
          </div>
          <Link to={'/'} className={'Link Icon_commiter Link_icon_left Ticket-Commiter'}>{props.value.authorName}</Link>
        </div>
      </div>
      <div class="Ticket-Meta Ticket-Meta_position_right">
        <Link to={'/'} className={'Link Icon_date Link_icon_left Link_color_dark Ticket-Date'} >
          <time datetime={Date(props.value.start)}>
            {getHumanDate(props.value.start)}
          </time>
        </Link>
        <Link to={'/'} >
          <time datetime={props.value.duration}>
            {props.value.duration}
          </time>
        </Link>
      </div>
    </div>
  )
}

export default Ticket;
