import React from 'react';
import './Header.scss';

export interface HeaderProps {
  className: string;
  children: any;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className={'Header ' + props.className}>
      <div className="Header-Inner Container">
        {props.children}
      </div>
    </header>
  );
};

export default React.memo(Header);
