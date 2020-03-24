import React from 'react';
import './Footer.scss';
import Nav from '../Nav/Nav';

function Footer(props) {
  return (
    <footer className="Footer  Page-Footer">
      <div className="Footer-Inner Container">
        <Nav className="Footer-Nav"/>
        <div className="Footer-Copyright">© 2020 Your Name</div>
      </div>
    </footer>
  )
}

export default Footer;