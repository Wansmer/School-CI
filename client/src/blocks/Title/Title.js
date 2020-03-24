import React from 'react';
import {Link} from 'react-router-dom';
import './Title.scss';
// Header-Title Header-Title_color_faded
export const Title = (props) => {
  return (
    <h1 className={props.mainClass + ' ' + props.mainClass + '_color_' + props.mods.color + ' ' + props.className}>
      <Link to={props.path} className="Title-Link">School CI server</Link>
    </h1>
  )
}

Title.defaultProps = {
  mainClass: 'Title',
  mods: {
    color: 'main'
  },
  path: '/',
}

export default Title
