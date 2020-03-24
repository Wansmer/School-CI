import React from 'react';
import {Link} from 'react-router-dom';

import './Nav.scss';

function Nav(props) {
  return (
    <nav className={props.className + ' Nav'}>
      <Link to='#' className="Link Link_color_secondary">Support</Link>
      <Link to='#' className="Link Link_color_secondary">Learning</Link>
    </nav>
  )
}

export default Nav;
