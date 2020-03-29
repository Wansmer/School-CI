import React, { Fragment } from "react";
import {Link} from 'react-router-dom';
import Header from "../blocks/Header/Header";
import Content from "../blocks/Content/Content";
import Button from '../blocks/Button/Button';
import Title from '../blocks/Title/Title';
import Land from "../blocks/Land/Land";

const TitleClasses = {
  mods: {
    color: 'faded'
  }
}

const settingsButtonClasses = {
  mods: {
    iconMix: '',
    type: 'control',
    size: 'm',
    icon: 'left'
  }
}

const contentClasses = {
  elems: {
    Inner: {
      mods: {
        alignVertical: 'center',
        alignHorizon: 'center'
      }
    }
  }
}

export const Home = (props) => {
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
        <Link to="/settings">
          <Button
            className="Header-Button Icon Icon_gear"
            text="Settings"
            classes={ settingsButtonClasses }
          />
        </Link>
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
  title: 'School CI server'
}
