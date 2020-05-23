import React, { Fragment, useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import TicketList from '../blocks/TicketList/TicketList';
import Ticket from '../blocks/Ticket/Ticket';
import Header from '../blocks/Header/Header';
import Title from '../blocks/Title/Title';
import Button from '../blocks/Button/Button';
import { getBuildDetails, addToQueue, cleanSaveCode } from '../redux/actions';
import Content from '../blocks/Content/Content';
import Preformatted from '../blocks/Preformatted/Preformatted';
import { useHistory } from 'react-router-dom';
import Loader from '../blocks/Loader/Loader';

const TitleClasses = {
  mods: {
    color: 'main'
  }
};

const contentClasses = {
  elems: {
    Inner: {
      mods: {
        alignVertical: 'top',
        alignHorizon: 'left'
      }
    }
  }
};

const buildButtonClasses = {
  mods: {
    type: 'control',
    size: 'm',
    iconMix: '',
    icon: 'left'
  }
};

const settingsButtonClasses = {
  mods: {
    type: 'control',
    size: 'm',
    iconMix: '',
    icon: 'left',
    text: 'hidden'
  }
};

export interface DetailsProps {
  [key: string]: any;
}

const Details: React.FC<DetailsProps> = (props) => {

  // @ts-ignore
  const repoName = useSelector((state) => state.settings.config.repoName);
  // @ts-ignore
  const loading = useSelector((state) => state.ticket.loading);
  const [data, setData] = useState(props);
  const history = useHistory();

  useEffect(() => {
    props.getBuildDetails(props.match.params.buildId);
  }, [props.match.params.buildId]);

  useEffect(() => {
    if (props.buildRequestRes && props.buildRequestRes.id) {
      history.push(`/build/${props.buildRequestRes.id}`);
    }
  }, [props.buildRequestRes]);

  const reBuild = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setData((prevState) => ({...prevState, ...{ isDisabled: !data.isDisabled }}));
    props.addToQueue(props.ticket.commitHash);
  };

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    history.push('/settings');
  };

  return (
    <Fragment>
      <Header>
        <Title
          className="Header-Title"
          classes={TitleClasses}
          path='/history'
        >
          {repoName}
        </Title>
        <Button
          className='Icon Icon_rebuild Header-Button'
          classes={buildButtonClasses}
          text='Rebuild'
          isDisabled={ loading }
          onClick={reBuild}
          id='rebuild'
        />
        <Button
          className='Icon Icon_gear Header-Button'
          classes={settingsButtonClasses}
          text='Settings'
          isDisabled={props.isDisabled}
          onClick={clickHandler}
          id='settings_header'
        />
      </Header>
      <Content
        classes={contentClasses}
        className='Page-Content'
      >
        { loading ? <Loader /> : (
          <TicketList>
            <Ticket
              className='Ticket_show_details'
              value={props.ticket}
            />
            <Preformatted>
              {props.ticketLog}
            </Preformatted>
          </TicketList>
        ) }
      </Content>
    </Fragment>
  );
};

Details.defaultProps = {
  isDisabled: false,
  isShowError: false
};

const mapStateToProps = (state: State) => ({
  ticket: state.ticket.currentTicket.details,
  ticketLog: state.ticket.currentTicket.log,
  buildRequestRes: state.ticket.buildRequestRes
});

const mapDistpatchToProps = (dispatch: Function) => ({
  getBuildDetails: (id: string) => dispatch(getBuildDetails(id)),
  addToQueue: (commitHash: string) => dispatch(addToQueue(commitHash)),
  cleanSaveCode: () => dispatch(cleanSaveCode())
});

export default connect(mapStateToProps, mapDistpatchToProps)(Details);
