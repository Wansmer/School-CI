import React from 'react';
import './Header.scss';

function Header(props) {
  return (
    <header className="Header">
      <div className="Header-Inner Container">
        {props.children}
      </div>
    </header>
  )
}

export default Header;
