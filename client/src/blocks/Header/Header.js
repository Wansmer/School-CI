import React from 'react';
import './Header.scss';

import Button from '../Button/Button';

function Header(props) {
  return (
    <header className="Header Page-Header">
      <div className="Header-Inner Container">
        <h1 className="Header-Title Header-Title_color_faded">
          <a href="/#" className="Header-Title-Link">School CI server</a>
        </h1>
        <Button />
      </div>
    </header>
  )
}

export default Header;
