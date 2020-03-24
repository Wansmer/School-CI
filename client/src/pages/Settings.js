import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "../blocks/Header/Header";
import Content from "../blocks/Content/Content";
import Button from "../blocks/Button/Button";
import Form from '../blocks/Form/Form';
import Title from "../blocks/Title/Title";

const TitleClasses = {
  mods: {
    color: 'faded'
  }
}

export const Settings = (props) => {
  return (
    <Fragment>
      <Header>
        <Title
          className="Header-Title"
          text={props.title}
          classes={TitleClasses}
        />
      </Header>
      <Content className="Page-Content">
        <Form />
      </Content>
    </Fragment>
  );
};

Settings.defaultProps = {
  title: 'School CI server'
}
