import React from 'react';
import './Header.scss';

const Header = (props) => {
  return (
    <header className={'Header ' + props.className}>
      <div className="Header-Inner Container">
        {props.children}
      </div>
    </header>
  );
};

export default React.memo(Header);
