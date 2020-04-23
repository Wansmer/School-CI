import React from 'react';
import './Nav.scss';

export interface NavProps {
  className: string;
}

const Nav: React.FC<NavProps> = (props) => {
  return (
    <nav className={ props.className + ' Nav' }>
      <a href='https://yandex.ru/support/' className="Link Link_color_secondary">Support</a>
      <a href='https://account.shri.yandex' className="Link Link_color_secondary">Learning</a>
    </nav>
  )
};

export default React.memo(Nav);
