import React, {Fragment} from 'react';
import TicketList from '../blocks/TicketList/TicketList';
import Header from '../blocks/Header/Header';
import Title from '../blocks/Title/Title';
import Content from '../blocks/Content/Content';
import Button from '../blocks/Button/Button';

const TitleClasses = {
  mods: {
    color: 'main'
  }
}

const contentClasses = {
  elems: {
    Inner: {
      mods: {
        alignVertical: 'top',
        alignHorizon: 'left'
      }
    }
  }
}

const moreButtonClasses = {
  mods: {
    type: 'control',
    size: 'm'
  }
}

export const History = (props) => {
  const tickets = props.tickets;
  return (
    <Fragment>
      <Header>
        <Title 
          className="Header-Title"
          text={props.repoName}
          classes={TitleClasses}
        />
      </Header>
      <Content className='Page-Content'
               classes={contentClasses} >
        <TicketList tickets={tickets} >
          <Button classes={moreButtonClasses} text='More' />
        </TicketList>
      </Content>
    </Fragment>
  )
}
