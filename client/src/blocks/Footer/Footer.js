import React from 'react';
import './Footer.scss';
import Nav from '../Nav/Nav';

function Footer(props) {
  return (
    <footer class="Footer  Page-Footer">
      <div class="Footer-Inner Container">
        <Nav className="Footer-Nav"/>
        <div class="Footer-Copyright">© 2020 Your Name</div>
      </div>
    </footer>
  )
}

export default Footer;
