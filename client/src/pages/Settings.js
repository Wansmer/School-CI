import React, { Fragment } from "react";
import { connect } from 'react-redux';
import Header from "../blocks/Header/Header";
import Content from "../blocks/Content/Content";
import Form from '../blocks/Form/Form';
import Title from "../blocks/Title/Title";

const TitleClasses = {
  mods: {
    color: 'faded'
  }
}

const Settings = (props) => {

  return (
    <Fragment>
      <Header className="Page-Header" >
        <Title
          className="Header-Title"
          text={props.title}
          classes={TitleClasses}
          path='/'
        >{ props.title }</Title>
      </Header>
      <Content 
        className="Page-Content"
      >
        <Form />
      </Content>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    config: state.config
  }
}

Settings.defaultProps = {
  title: 'School CI server'
}

export default connect(mapStateToProps)(Settings);
