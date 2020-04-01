import React from 'react';
import {Link} from 'react-router-dom';

import './Nav.scss';

function Nav(props) {
  return (
    <nav className={props.className + ' Nav'}>
      <Link to='https://yandex.ru/support/' className="Link Link_color_secondary">Support</Link>
      <Link to='https://account.shri.yandex' className="Link Link_color_secondary">Learning</Link>
    </nav>
  )
}

export default Nav;
