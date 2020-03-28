import React, { Fragment, useEffect } from "react";
import { connect } from 'react-redux';
import Header from "../blocks/Header/Header";
import Content from "../blocks/Content/Content";
import Form from '../blocks/Form/Form';
import Title from "../blocks/Title/Title";
// import { getConfig } from '../actions';

const TitleClasses = {
  mods: {
    color: 'faded'
  }
}

const Settings = (props) => {
  return (
    <Fragment>
      <Header>
        <Title
          className="Header-Title"
          text={props.title}
          classes={TitleClasses}
          path='/'
        />
      </Header>
      <Content className="Page-Content">
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
