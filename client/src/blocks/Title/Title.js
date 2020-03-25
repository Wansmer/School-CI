import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Title.scss';
import {expandClasses} from '../../utils';

function Title (props) {
  console.log(props.classes)
  return (
    <h1 className={'Title' + ' ' + expandClasses(props.classes, 'Title') + ' ' + props.className}>
      <Link to={props.path} className="Title-Link">School CI server</Link>
    </h1>
  )
}

export default Title;
