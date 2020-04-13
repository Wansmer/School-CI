import React from 'react';
import {Link} from 'react-router-dom';
import './Title.scss';
import {expandClasses} from '../../utils';

const Title = (props) => {
  return (
    <h1 className={expandClasses(props.classes, 'Title', '', props.className)}>
      <Link to={props.path} className="Title-Link" id="title_link"  >{props.children}</Link>
    </h1>
  );
};

export default React.memo(Title);
