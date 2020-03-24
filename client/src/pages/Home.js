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

export const Home = (props) => {
  return (
    <Fragment>
      <Header>
        <Title
          className="Header-Title"
          text={props.title}
          classes={ TitleClasses }
        />
        <Link to="/settings">
          <Button
            className="Header-Button"
            text="Settings"
            mods={{ type: "control", size: "m" }}
            icon={{ submitted: true, pos: "left", pic: "gear" }}
          />
        </Link>
      </Header>
      <Content className="Page-Content" 
               elems={{Inner: {mods: {alignVertical: 'center', alignHorizon: 'center'}}}}>
        <Land />
      </Content>
    </Fragment>
  );
};

Home.defaultProps = {
  title: 'School CI server'
}
