import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../blocks/Header/Header';
import Content from '../blocks/Content/Content';
import Button from '../blocks/Button/Button';
import Title from '../blocks/Title/Title';
import Land from '../blocks/Land/Land';

const TitleClasses = {
  mods: {
    color: 'faded'
  }
};

const settingsButtonClasses = {
  mods: {
    iconMix: '',
    type: 'control',
    size: 'm',
    icon: 'left'
  }
};

const contentClasses = {
  elems: {
    Inner: {
      mods: {
        alignVertical: 'center',
        alignHorizon: 'center'
      }
    }
  }
};

export interface HomeProps {
  title: string;
}

export const Home: React.FC<HomeProps> = (props) => {
  const history = useHistory();

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    history.push('/settings');
  };

  return (
    <Fragment>
      <Header className="Page-Header" >
        <Title
          className="Header-Title"
          text={props.title}
          classes={ TitleClasses }
          path='/'
        >
          {props.title}
        </Title>
        <Button
          className="Header-Button Icon Icon_gear"
          text="Settings"
          classes={ settingsButtonClasses }
          onClick={clickHandler}
        />
      </Header>
      <Content
        className="Page-Content"
        classes={ contentClasses }>
        <Land />
      </Content>
    </Fragment>
  );
};

Home.defaultProps = {
  title: 'School CI serverFront'
};
