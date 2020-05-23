import React, { Fragment } from 'react';

import Header from '../blocks/Header/Header';
import Content from '../blocks/Content/Content';
import Form from '../blocks/Form/Form';
import Title from '../blocks/Title/Title';

const TitleClasses = {
  mods: {
    color: 'faded'
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
}

export interface SettingsProps {
  title: string;
}

const Settings: React.FC<SettingsProps> = (props) => {

  return (
    <Fragment>
      <Header className="Page-Header" >
        <Title
          className="Header-Title"
          text={props.title}
          classes={TitleClasses}
          path='/'
        >
          { props.title }
        </Title>
      </Header>
      <Content
        classes={ contentClasses }
        className="Page-Content"
      >
        <Form />
      </Content>
    </Fragment>
  );
};

Settings.defaultProps = {
  title: 'School CI serverFront'
};

export default Settings;
