import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Title.scss';
import {expandClasses} from '../../utils';

function Title (props) {
  return (
    <h1 className={'Title' + ' ' + expandClasses(props.classes, 'Title') + ' ' + props.className}>
      <Link to={props.path} className="Title-Link">School CI server</Link>
    </h1>
  )
}

Title.defaultProps = {
  mainClass: 'Title',
  classes: {
    mods: {
      color: 'main'
    }
  },
  path: '/',
}

export default Title;
